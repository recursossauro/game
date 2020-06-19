from django.db import models
from django.conf import settings

class Person(models.Model):
    user  = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE, primary_key=True)
    name  = models.CharField('Nome', max_length=200)
    photo = models.ImageField('Foto', upload_to='images/', max_length=500, null=True, blank=True)
    birth = models.DateTimeField('Data de Nascimento')

    # Fields to backup control
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name        = 'Pessoa'
        verbose_name_plural = 'Pessoas'

    def __str__(self):
        return self.name
