from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # ... outros campos ...
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', null=True, blank=True)

