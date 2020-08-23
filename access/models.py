from django.db import models
from django.conf import settings

class Person(models.Model):
    user  = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name='User', on_delete=models.CASCADE, primary_key=True)
    name  = models.CharField('Name', max_length=200)
    photo = models.ImageField('Photo', upload_to='images/', max_length=500, null=True, blank=True)
    birth = models.DateTimeField('Birth')

    # Fields to backup control
    created = models.DateTimeField('Created', auto_now_add=True)
    modified = models.DateTimeField('Modified', auto_now=True)

    class Meta:
        verbose_name        = 'Person'
        verbose_name_plural = 'Persons'

    def __str__(self):
        return self.name
