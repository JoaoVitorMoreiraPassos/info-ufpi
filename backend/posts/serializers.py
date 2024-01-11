from rest_framework import serializers
from .models import Post, Comentario, Favorito


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = (
            'id',
            'post_comentario',
            'autor_comentario',
            'conteudo_comentario',
            'criacao',
            'ativo',
        )


class PostSerializer(serializers.ModelSerializer):

    comentarios = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'titulo_post',
            'autor_post',
            'conteudo_post',
            'setor_post',
            'imagem_post',
            'criacao',
            'ativo',
            'comentarios',
        )


class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = (
            'id',
            'post_favorito',
            'autor_favorito',
        )
