from rest_framework import generics

from .models import Post
from .serializers import PostSerializer


class PostsAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
