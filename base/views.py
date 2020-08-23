# -*- coding: utf-8 -*-


from django.shortcuts import render
from django.views.generic.base import RedirectView
from django.urls import reverse

from access.models import Person
from gameplace.models import Master, Gamer

class IndexRedirectView(RedirectView):

    pattern_name = 'index'
    query_string = False

    def get_redirect_url(self, *args, **kwargs):
        if (self.request.user.is_authenticated):
            try:
                person = Person.objects.get(user=self.request.user)
            except:
                return reverse('access:newpersonaldata')

            # Try a Master
            masters = Master.objects.filter(user=self.request.user)
            # If the user has a Master he or she goes to the Master Place.
            if (masters):
                return reverse('gameplace:index')

            # Try a Gamer
            gamers = Gamer.objects.filter(user=self.request.user)
            # if the user has a Gamer he/she goes to the Game Place.
            if (gamers):
                return reverse('gamerplace:index', kwargs={'pk':gamers[0].pk})

            # If user do not have neither a master neither a gamer he will invited to create an avatar (Master).
            return reverse('gameplace:newmaster')

        return super().get_redirect_url(*args, **kwargs)
