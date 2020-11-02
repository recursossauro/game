from django.db import models
from django.conf import settings
from django.db.models import Q

class Master(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE)
    slug      = models.SlugField('Slug', max_length=200, default='slug')
    nickname  = models.CharField('Nick', max_length=200)
    avatar    = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Created', auto_now_add=True)
    modified = models.DateTimeField('Modified', auto_now=True)

    class Meta:
        verbose_name        = 'Master'
        verbose_name_plural = 'Masters'
        unique_together     = ['user','slug']

    def getGamers(self, authorized=True):
        return Gamer.objects.filter(
            Q(master = self) |
            Q(gamermaster__master = self, gamermaster__authorized = authorized)
        )

    def __str__(self):
        return self.nickname

class Gamer(models.Model):
    user          = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='User', on_delete=models.CASCADE)
    master        = models.ForeignKey(Master, verbose_name='Master', on_delete=models.CASCADE)
    nickname      = models.CharField('Nick', max_length=200)
    avatar        = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)
    othersMasters = models.ManyToManyField(Master, through='GamerMaster', related_name='otherMasters')


    # Fields to backup control
    created = models.DateTimeField('Created', auto_now_add=True)
    modified = models.DateTimeField('Modified', auto_now=True)

    class Meta:
        verbose_name        = 'Gamer'
        verbose_name_plural = 'Gamers'

    def getRights(self):
        return self.right_set.filter(user=self.user)

    def __str__(self):
        return self.nickname

class Fan(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE)
    gamer     = models.ForeignKey(Gamer, verbose_name='Masters', on_delete=models.CASCADE)
    nickname  = models.CharField('Nick', max_length=200)
    avatar    = models.ImageField('Avatar', upload_to='images/', max_length=500, null=True, blank=True)

    # Fields to backup control
    created = models.DateTimeField('Created', auto_now_add=True)
    modified = models.DateTimeField('Modified', auto_now=True)

    class Meta:
        verbose_name        = 'Fan'
        verbose_name_plural = 'Fans'

    def __str__(self):
        return self.nickname

class GamerMaster(models.Model):
    gamer      = models.ForeignKey('Gamer', verbose_name='gamer', on_delete=models.CASCADE)
    master     = models.ForeignKey('Master', verbose_name='master', on_delete=models.CASCADE)
    authorized = models.BooleanField('authorized', default=False)

    # Fields to backup control
    created = models.DateTimeField('Created', auto_now_add=True)
    modified = models.DateTimeField('Modified', auto_now=True)

    def __str__(self):
        return str(self.gamer) + ' + ' + str(self.master)
