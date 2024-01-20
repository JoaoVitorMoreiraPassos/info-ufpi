from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import (
    Alimento,
    AlimentoAdicional,
    Cardapio
)
from .serializers import (
    AlimentoSerializer,
    CardapioSerializer
)

from .permissions import HasRefeicaoPermissions


class AlimentosPagination(PageNumberPagination):
    page_size = 4


class AlimentosAPIView(generics.ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    pagination_class = AlimentosPagination
    permission_classes = [HasRefeicaoPermissions,]


class AlimentoAPIView(generics.RetrieveDestroyAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [HasRefeicaoPermissions, ]


class CardapiosAPIView(generics.ListCreateAPIView):
    queryset = Cardapio.objects.all()
    serializer_class = CardapioSerializer
    permission_classes = [HasRefeicaoPermissions, ]


class CardapioAPIView(generics.RetrieveDestroyAPIView):
    queryset = Cardapio.objects.all()
    serializer_class = CardapioSerializer
    permission_classes = [HasRefeicaoPermissions, ]
