from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

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


class ComentarioAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
