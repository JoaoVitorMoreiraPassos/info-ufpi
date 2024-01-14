from rest_framework import serializers
from .models import Post, Comentario, Favorito
from django.templatetags.static import static
from django.conf import settings


class ComentarioSerializer(serializers.ModelSerializer):
    
    autor_comentario = serializers.ReadOnlyField(source='autor_comentario.username')
    imagem_autor_comentario = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = (
            'id',
            'post_comentario',
            'autor_comentario',
            'imagem_autor_comentario',
            'conteudo_comentario',
            'criacao',
            'ativo',
        )

    def get_imagem_autor_comentario(self, obj):
        if obj.autor_comentario.foto_perfil:
            return self.context['request'].build_absolute_uri(obj.autor_comentario.foto_perfil.url)
        else:
            # return self.context['request'].build_absolute_uri(static('path/to/default/image.jpg'))
            return None


class PostSerializer(serializers.ModelSerializer):


    class Meta:
        model = Post
        fields = (
            'id',
            'titulo_post',
            'autor_post',
            'conteudo_post',
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
