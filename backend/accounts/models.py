from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # ... outros campos ...
    email = models.EmailField('Email Address', unique=True, blank=False, null=False)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', null=True, blank=True)
    post_permissoes = models.BooleanField(default=False, verbose_name='Permissao de Postagem')
    refeicao_permissoes = models.BooleanField(default=False, verbose_name='Permissao de Refeicao')

