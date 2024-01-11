from rest_framework import serializers

from .models import Alimento, AlimentoAdicional, Cardapio


class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = (
            'id',
            'tipo_refeicao',
            'nome_refeicao',
            'ativo',
        )

    # def create(self, validated_data):
    #     return Refeicao.objects.create(**validated_data)


class CardapioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cardapio
        fields = (
            'id',
            'tipo',
            'data',
            'alimentos',
            'alimentos_adicionais',
            'ativo',
        )
