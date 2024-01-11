from django.db import models

class Setor(models.Model):
    nome_setor = models.CharField(max_length=50, verbose_name='Nome')
    
    def __str__(self):
        return self.nome_setor
