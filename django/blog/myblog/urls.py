from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("user/signup/", SignUpView.as_view()), #post - 회원가입
    path("auth/", AuthAPIView.as_view()), #post - 로그인, get 유저정보 확인, delete 로그아웃
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("post/", PostView.as_view(), name='post_view'),
]
