# Generated by Django 4.2.8 on 2024-01-11 19:11

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("refeicao", "0002_refeicao_ativo"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="refeicao",
            options={
                "ordering": ["id"],
                "verbose_name": "Refeicao",
                "verbose_name_plural": "Refeicoes",
            },
        ),
        migrations.RemoveField(
            model_name="refeicao",
            name="data",
        ),
    ]
