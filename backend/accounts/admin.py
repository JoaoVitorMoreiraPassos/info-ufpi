from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name',
                    'email', 'is_staff', 'foto_perfil', 'post_permissoes')
