from . models import CustomUser, UserProfile
from rest_framework import serializers

class UserProfileSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
    
    # CustomUser 모델의 create_user 메서드를 사용하여 새로운 사용자 생성
    def create(self, validated_data:dict) -> CustomUser:
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        profile_data = validated_data.pop('profile', None)  # profile 정보 추출
        user = CustomUser.create_user(
            email=email,
            password=password,
            **validated_data
        )
        # UserProfile 생성 및 연결
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
            
        return user
    
    # CustomUser Instance가 존재할때 validated_data 값으로 필드를 수정
    def update(self, validated_data:dict, instance) -> CustomUser:
        pass