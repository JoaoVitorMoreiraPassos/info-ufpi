from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserSerializer, UserDetailSerializer

from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model


class CadastrarAPIView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(user.password)
            user.save()
            headers = self.get_success_headers(serializer.data)
            return Response(
                {"message": "Usuário cadastrado com sucesso!", "user": serializer.data},
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        return Response(
            {"message": "Erro ao cadastrar usuário!", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserDetailAPIView(RetrieveAPIView):
    serializer_class = UserDetailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserUpdateAPIView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

