from django.urls import path

from .views import (
    PostsAPIView,
    PostAPIView,
    ComentariosAPIView,
    ComentarioAPIView,
    AddFavoritoAPIView,
    DeleteFavoritoAPIView,
    FavoritosAPIView,

)

urlpatterns = [
    path("posts/", PostsAPIView.as_view(), name="posts"),
    path("posts/<int:pk>/", PostAPIView.as_view(), name="post"),
    path("posts/<int:post_pk>/comentarios/",
         ComentariosAPIView.as_view(), name="comentarios"),
    path("posts/<int:post_pk>/comentarios/<int:pk>/",
         ComentarioAPIView.as_view(), name="comentario"),

    path("favoritos/<int:post_id>/", AddFavoritoAPIView.as_view(), name="favorito"),
    path("favoritos/delete/<int:post_id>/",
         DeleteFavoritoAPIView.as_view(), name="delete_favorito"),
    path("favoritos/", FavoritosAPIView.as_view(), name="favoritos"),

    # Inutil por enquanto
    # path("comentarios/", ComentariosAPIView.as_view(), name="comentarios"),
    # path("comentarios/<int:pk>/", ComentarioAPIView.as_view(), name="comentario"),
]
