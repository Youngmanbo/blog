from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from . utils import validate_password

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        """
        사용자 생성 메서드

        Args:
            email (str): 사용자의 이메일주소 (필수) 
            password (str): 
                로그인 비밀번호 숫자/영어/특수기호가 포함되어 있고 최소길이 6자 이상
            kwargs: 추가적인 사용자 정보

        Raises:
            ValueError: 이메일 값이 없으면 : "Users must have an email address"
                        비밀번호 유효성검사 실패 시: 해당 오류 메시지
        """
        if not email:
            raise ValueError("Users must have an email address")
        error_message = validate_password(password)
        if error_message:
            raise ValueError(error_message)
        
        user = self.model(
            email=email,
            **kwargs
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        """
        주어진 이메일, 비밀번호 등 개인정보로 User 인스턴스 생성
        단, 최상위 사용자이므로 권한을 부여
        """
        superuser = self.create_user(
            email=email,
            password=password,
            **extra_fields  # 여기에서 추가 필드를 전달
        )

        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True

        superuser.save(using=self._db)
        return superuser

# AbstractBaseUser를 상속해서 유저 커스텀
class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(max_length=30, unique=True, null=False, blank=False, verbose_name="로그인 이메일")
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

	# 사용자의 username field는 email으로 설정 (이메일로 로그인)
    USERNAME_FIELD = 'email'

class UserProfile(models.Model):
    # 사용자 프로필 모델
    # CustomUserModel 과 1:1 관계로 연결
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profile_image = models.ImageField(verbose_name="프로필 이미지", null=True, blank=True)
    email = models.EmailField(max_length=30, blank=True, null=True, verbose_name="개인 이메일")
    github = models.CharField(max_length=30, blank=True, null=True, verbose_name="깃허브 아이디")
    
    # 현 x 구 트위터 아이디 필드
    social_x = models.CharField(max_length=30, blank=True, null=True, verbose_name="X 아이디")
    
class Post(models.Model):
    # 게시글 모델
    
    title = models.CharField(max_length=255)
    writer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_publick = models.BooleanField(default=False)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    