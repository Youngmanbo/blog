from . models import CustomUser, UserProfile, Post, Comment
from rest_framework import serializers
from django.db.models import Count, Prefetch

class UserProfileSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 
    class Meta:
        model = CustomUser
        fields = [
            'email',
            'id', 
            'password'
        ]
    
    # CustomUser 모델의 create_user 메서드를 사용하여 새로운 사용자 생성
    def create(self, validated_data:dict) -> CustomUser:
        email = validated_data.pop('email', None)
        password = validated_data.pop('password', None)
        profile_data = validated_data.pop('profile', None)  # profile 정보 추출
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )
        # UserProfile 생성 및 연결
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)
            
        return user
    
    # CustomUser Instance가 존재할때 validated_data 값으로 필드를 수정
    def update(self, validated_data:dict, instance:CustomUser) -> CustomUser:
        pass

class PostSerializer(serializers.ModelSerializer):
    writer_email = serializers.EmailField(source='writer.email', read_only=True)
    class Meta:
        model = Post
        fields = [
            'title', 
            'writer_email', 
            'is_publick', 
            'content', 
            'created_at', 
            'updated_at', 
            'id'
        ]
        
class CommentSerializer(serializers.ModelSerializer):
    writer_email = serializers.EmailField(source='writer.email', read_only=True)
    child_comment = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = [
            'id',
            'content',
            'post',
            'parrent_comment',
            'created_at',
            'updated_at',
            'writer_email',
            'child_comment'
        ]
    
    def get_child_comment(self, obj):
        children = Comment.objects.filter(parent_comment=obj).annotate(num_children=Count('id')).prefetch_related('child_comments')
        serialized_children = []
        for child in children:
            serialized_child = CommentSerializer(child).data
            serialized_children.append(serialized_child)
        return serialized_children