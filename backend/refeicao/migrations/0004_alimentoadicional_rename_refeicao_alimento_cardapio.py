# Generated by Django 4.2.8 on 2024-01-11 19:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("refeicao", "0003_alter_refeicao_options_remove_refeicao_data"),
    ]

    operations = [
        migrations.CreateModel(
            name="AlimentoAdicional",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ativo", models.BooleanField(default=True, verbose_name="Ativo")),
                ("nome", models.CharField(max_length=255, verbose_name="Nome")),
            ],
            options={
                "verbose_name": "Alimento Adicional",
                "verbose_name_plural": "Alimentos Adicionais",
                "ordering": ["nome"],
            },
        ),
        migrations.RenameModel(
            old_name="Refeicao",
            new_name="Alimento",
        ),
        migrations.CreateModel(
            name="Cardapio",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ativo", models.BooleanField(default=True, verbose_name="Ativo")),
                (
                    "tipo",
                    models.CharField(
                        choices=[("A", "Almoço"), ("J", "Jantar")],
                        default="A",
                        max_length=1,
                    ),
                ),
                ("data", models.DateField(verbose_name="Data")),
                (
                    "alimentos",
                    models.ManyToManyField(
                        related_name="cardapios", to="refeicao.alimento"
                    ),
                ),
                (
                    "alimentos_adicionais",
                    models.ManyToManyField(
                        blank=True,
                        null=True,
                        related_name="cardapios",
                        to="refeicao.alimentoadicional",
                    ),
                ),
            ],
            options={
                "verbose_name": "Cardapio",
                "verbose_name_plural": "Cardapios",
                "ordering": ["data"],
            },
        ),
    ]
