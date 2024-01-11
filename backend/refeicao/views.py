from django.shortcuts import render

from .models import Alimento, AlimentoAdicional, Cardapio
from .serializers import AlimentoSerializer, CardapioSerializer

from rest_framework import generics


class AlimentosAPIView(generics.ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer


class AlimentoAPIView(generics.RetrieveDestroyAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer


class CardapiosAPIView(generics.ListCreateAPIView):
    queryset = Cardapio.objects.all()
    serializer_class = CardapioSerializer


class CardapioAPIView(generics.RetrieveDestroyAPIView):
    queryset = Cardapio.objects.all()
    serializer_class = CardapioSerializer
