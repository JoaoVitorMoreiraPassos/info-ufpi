from django.contrib import admin

from .models import Alimento, AlimentoAdicional, Cardapio


@admin.register(Alimento)
class RefeicaoAdmin(admin.ModelAdmin):
    list_display = ('nome_refeicao', 'tipo_refeicao', 'ativo')
    list_filter = ('tipo_refeicao', 'ativo')
    search_fields = ('nome_refeicao', 'tipo_refeicao', 'ativo')


@admin.register(AlimentoAdicional)
class AlimentoAdicionalAdmin(admin.ModelAdmin):
    list_display = ('nome', 'ativo')
    list_filter = ('ativo',)
    search_fields = ('nome', 'ativo')


@admin.register(Cardapio)
class CardapioAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'data', 'ativo')
    list_filter = ('tipo', 'ativo')
    search_fields = ('tipo', 'data', 'ativo')
