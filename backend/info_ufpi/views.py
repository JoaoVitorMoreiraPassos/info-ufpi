from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from rest_framework.generics import get_object_or_404


@api_view(["POST"])
def login(request):
    # Verificando se o usuário existe
    user: User = get_object_or_404(User, username=request.data["username"])

    # Verificando se a senha do usuário está correta
    if not user.check_password(request.data["password"]):
        return Response(
            {"status": "error", "message": "Usuário ou Senha incorretos!"},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Retorna o token do usuário ou cria um novo token para o usuário caso ele não tenha um.
    token, _ = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)  # Serializando o usuário
    return Response({"status": "success", "token": token.key, "user": serializer.data})


@api_view(["POST"])
def cadastrar(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user: User = serializer.save()  # Salvando o usuário no banco de dados
        user.set_password(user.password)  # Criptografando a senha do usuário
        user.save()  # Salvando o usuário no banco de dados
        # Criando um token para o usuário
        token = Token.objects.create(user=user)
        return Response(
            {"token": token.key, "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def teste_token(request):
    return Response(
        "Usuário {} Passou no teste de autenticação!".format(request.user.username)
    )
