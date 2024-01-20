from rest_framework import generics, status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions

from .permissions import HasPostPermissions # Permission customizada

from django.contrib.auth import get_user_model

from .models import (
    Post, 
    Comentario, 
    Favorito
)
from .serializers import (
    PostSerializer, 
    ComentarioSerializer, 
    FavoritoSerializer
)


class PostsAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [HasPostPermissions, ]

    def create(self, request, *args, **kwargs):
        # Adicionar o autor do post automaticamente
        request.data["autor_post"] = request.user.id
        serializer: PostSerializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            headers = self.get_success_headers(serializer.data)

            return Response(
                {
                    "message": "Post cadastrado com sucesso!",
                    "post": serializer.data,
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )


class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [HasPostPermissions, ]


class ComentariosPagination(PageNumberPagination):
    page_size = 8


class ComentariosAPIView(generics.ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    pagination_class = ComentariosPagination
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        if self.kwargs.get("post_pk"):
            return self.queryset.filter(post_comentario_id=self.kwargs.get("post_pk"))

        return self.queryset.all()

    def create(self, request, *args, **kwargs):
        serializer: ComentarioSerializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            headers = self.get_success_headers(serializer.data)

            return Response(
                {
                    "message": "Comentário cadastrado com sucesso!",
                    "comentario": serializer.data,
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        return Response(
            {"message": "Erro ao cadastrar comentário!", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ComentarioAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer


class AddFavoritoAPIView(generics.CreateAPIView):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get("post_id")
        post = get_object_or_404(Post, id=post_id)
        user = get_user_model().objects.get(username=request.user)
        favorito, created = Favorito.objects.get_or_create(post_favorito=post, autor_favorito=user)
        if created:
            return Response(
                {
                    "message": "Post adicionado aos favoritos com sucesso!",
                    "favorito": request.data,
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response({"message": "Post já estava nos favoritos."}, status=status.HTTP_200_OK)


class DeleteFavoritoAPIView(generics.DestroyAPIView):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        post_id = self.kwargs.get("post_id")
        post = get_object_or_404(Post, id=post_id)
        user = get_user_model().objects.get(username=request.user)
        favorito = Favorito.objects.get(post_favorito=post, autor_favorito=user)
        favorito.delete()
        return Response({"message": "Post removido dos favoritos."}, status=status.HTTP_200_OK)

class FavoritosAPIView(generics.ListAPIView):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(autor_favorito=self.request.user)

