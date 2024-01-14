from rest_framework import serializers
# from django.contrib.auth import get_user_model
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'foto_perfil'
        ]
        # extra_kwargs = {'password': {'write_only': True}}


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'foto_perfil'
        ]
        # extra_kwargs = {'password': {'write_only': True}}


class UserPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['foto_perfil']
