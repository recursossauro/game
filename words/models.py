from django.db import models
from django.conf import settings

class Master(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE)
    nickname  = models.CharField('Codinome', max_length=200)
    avatar    = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name        = 'Mestre'
        verbose_name_plural = 'Mestres'

    def __str__(self):
        return self.nickname

class Gamer(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE)
    master    = models.ForeignKey(Master, verbose_name='Mestre', on_delete=models.CASCADE)
    nickname  = models.CharField('Nome', max_length=200)
    avatar    = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name        = 'Jogador'
        verbose_name_plural = 'Jogadores'

    def __str__(self):
        return self.nickname

class Fan(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE)
    gamer     = models.ForeignKey(Gamer, verbose_name='Mestre', on_delete=models.CASCADE)
    nickname  = models.CharField('Nome', max_length=200)
    avatar    = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name        = 'Torcedor'
        verbose_name_plural = 'Torcedores'

    def __str__(self):
        return self.nickname

class Word(models.Model):
    master = models.ForeignKey(Master, verbose_name='Mestre', on_delete=models.CASCADE, null=True, blank=True)
    gamer  = models.ForeignKey(Gamer, verbose_name='Mestre', on_delete=models.CASCADE, null=True, blank=True)
    word   = models.CharField('Palavra', max_length=200)
    image  = models.ImageField('Imagem', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Criado em', auto_now_add=True)
    modified = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name        = 'Palavra'
        verbose_name_plural = 'Palavras'

    def __str__(self):
        return self.word
