from django.contrib import admin

from .models import Master, Gamer, GamerMaster

admin.site.register(Master)
admin.site.register(Gamer)
admin.site.register(GamerMaster)
