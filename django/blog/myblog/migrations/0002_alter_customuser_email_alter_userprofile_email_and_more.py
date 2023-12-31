# Generated by Django 4.2.7 on 2023-11-28 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=30, unique=True, verbose_name='로그인 이메일'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(blank=True, max_length=30, null=True, verbose_name='개인 이메일'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='github',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='깃허브 아이디'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='프로필 이미지'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='social_x',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='X 아이디'),
        ),
    ]
