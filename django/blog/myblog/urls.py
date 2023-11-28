from django.urls import path
from .views import *

urlpatterns = [
    path("user/signup/", SignUpView.as_view()), #post - 회원가입
    path("auth/", AuthAPIView.as_view()), #post - 로그인, get 유저정보 확인, delete 로그아웃
]
