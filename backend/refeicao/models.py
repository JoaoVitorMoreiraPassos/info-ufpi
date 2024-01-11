from django.db import models


class Base(models.Model):
    # criacao = models.DateTimeField(auto_now_add=True)
    # atualizacao = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True, verbose_name='Ativo')

    class Meta:
        abstract = True


class Alimento(Base):
    REFEICAO_TYPE = (
        ('N', 'Normal'),
        ('V', 'Vegetariana'),
        ('A', 'Acompanhamento'),
    )
    tipo_refeicao = models.CharField(
        max_length=1, choices=REFEICAO_TYPE, default='N')
    nome_refeicao = models.CharField(max_length=255, verbose_name='Nome')
    # data = models.DateField(verbose_name='Data')

    class Meta:
        verbose_name = 'Refeicao'
        verbose_name_plural = 'Refeicoes'
        ordering = ['id']

    def __str__(self):
        return self.nome_refeicao


class AlimentoAdicional(Base):
    nome = models.CharField(max_length=255, verbose_name='Nome')

    class Meta:
        verbose_name = 'Alimento Adicional'
        verbose_name_plural = 'Alimentos Adicionais'
        ordering = ['nome']

    def __str__(self):
        return self.nome


class Cardapio(Base):
    CARDAPIO_TYPE = (
        ('A', 'Almoço'),
        ('J', 'Jantar'),
    )
    tipo = models.CharField(max_length=1, choices=CARDAPIO_TYPE, default='A')
    data = models.DateField(verbose_name='Data')
    alimentos = models.ManyToManyField(Alimento, related_name='cardapios')
    alimentos_adicionais = models.ManyToManyField(
        AlimentoAdicional, related_name='cardapios', blank=True, null=True)

    class Meta:
        verbose_name = 'Cardapio'
        verbose_name_plural = 'Cardapios'
        ordering = ['data']

    def __str__(self):
        return str(self.data)
