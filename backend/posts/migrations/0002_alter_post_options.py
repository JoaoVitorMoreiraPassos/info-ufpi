# Generated by Django 4.2.8 on 2024-01-20 02:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-id'], 'verbose_name': 'Post', 'verbose_name_plural': 'Posts'},
        ),
    ]
