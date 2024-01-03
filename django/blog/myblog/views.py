import jwt
from django.shortcuts import render, get_object_or_404
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.conf import settings
from .models import Post, CustomUser
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class SignUpView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()

                # JWT 토큰 생성
                token = TokenObtainPairSerializer.get_token(user)
                refresh_token = str(token)
                access_token = str(token.access_token)
                res = Response(
                    {
                        "user": serializer.data,
                        "message": "회원가입 성공",
                        "token": {
                            "access": access_token,
                            "refresh": refresh_token,
                        },
                    },
                    status=status.HTTP_201_CREATED
                )
                
                res.set_cookie("access", access_token, httponly=True)
                res.set_cookie("refresh", refresh_token, httponly=True)

                return res
            except ValueError as e:
                return Response({"message":str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except IntegrityError as e:
                return Response({"message": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AuthAPIView(APIView):
    
    # 토큰으로부터 사용자 정보 가져오기
    def _get_user_from_token(self, access_token):
        payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
        print(payload)
        user_id = payload.get('user_id')
        return get_object_or_404(CustomUser, pk=user_id)

    # 토큰 갱신 로직
    def _refresh_token(self, request):
        data = {'refresh': request.COOKIES.get('refresh', None)}
        serializer = TokenObtainPairSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        access_token = serializer.data.get("access", None)
        refresh_token = serializer.data.get("refresh", None)
        user = self._get_user_from_token(access_token)
        serializer = CustomUserSerializer(instance=user)
        response = Response(serializer.data, status=status.HTTP_200_OK)
        response.set_cookie('access', access_token)
        response.set_cookie('refresh', refresh_token)
        return response

    # 유저 정보 확인
    def get(self, request):
        try:
            print(request)
            access_token = request.COOKIES.get('access')
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            print(payload)
            user = self._get_user_from_token(access_token)
            serializer = CustomUserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except jwt.exceptions.ExpiredSignatureError:
            return self._refresh_token(request)

        except jwt.exceptions.InvalidTokenError:
            # 사용 불가능한 토큰일 때
            return Response({"message":"invalid token"},status=status.HTTP_400_BAD_REQUEST)
    
    # 로그인
    def post(self, request):
        # 유저 인증
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = CustomUserSerializer(user)
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "로그인 성공",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    #  로그아웃    
    def delete(self, request):
        
        res = Response({
            "message": "로그아웃 성공"
        },
            status=status.HTTP_200_OK    
        )
        res.delete_cookie("access")
        res.delete_cookie("refresh")
        return res

class PostView(APIView):
    
    # get 요청시 누구나 허용 post 요청시 로그인된 사용자만 가능
    permission_classes = [IsAuthenticatedOrReadOnly]
    # 포스트 전체 리스트
    def get(self, request):
        posts = Post.objects.all()
        serializers = PostSerializer(posts, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    
    # 글쓰기 요청
    def post(self, request):

        try:
            print(request.headers)
            serializer = PostSerializer(data=request.data)
            if serializer.is_valid():
                post = serializer.save(writer=request.user)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"unexpected error":str(e)}, status=status.HTTP_400_BAD_REQUEST)