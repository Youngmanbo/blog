from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg       import openapi
from rest_framework.routers import DefaultRouter

schema_view = get_schema_view(
    openapi.Info(
        title="YMLOG 개인 블로그 프로젝트",
        default_version='v1.0',
        description="YMLOG 블로그 api 문서",
        terms_of_service="https://ymlog.site/",
        contact=openapi.Contact(email="yo900326@gmail.com"),
        license=openapi.License(name="mit"),    
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register(r'comments', CommentTestView, basename='test_comments')

urlpatterns = [
    # swagger 설정 urls 
    path(r'swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path(r'swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
    # blog api urls 
    path("user/signup/", SignUpView.as_view()), #post - 회원가입
    path("auth/", AuthAPIView.as_view()), #post - 로그인, get 유저정보 확인, delete 로그아웃
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("post/", PostView.as_view(), name='post_view'),
    path("post/<int:pk>/", PostView.as_view(), name="post_detail"),
]

urlpatterns += router.urls