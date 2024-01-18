from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status

from .models import Post, Comentario, Favorito
from .serializers import PostSerializer, ComentarioSerializer


class PostsAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class ComentariosPagination(PageNumberPagination):
    page_size = 8


class ComentariosAPIView(generics.ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    pagination_class = ComentariosPagination

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
