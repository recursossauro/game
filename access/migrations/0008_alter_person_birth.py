# Generated by Django 3.2.3 on 2021-05-21 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('access', '0007_alter_person_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='birth',
            field=models.DateTimeField(verbose_name='Birth'),
        ),
    ]
