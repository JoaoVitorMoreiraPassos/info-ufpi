from django.contrib import admin
from .models import Setor


@admin.register(Setor)
class SetorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_setor')
    list_display_links = ('id', 'nome_setor')
    search_fields = ('nome_setor',)
