from django.shortcuts import render, get_object_or_404

from gameplace.models import Gamer

from django.contrib.auth.models import User
from django.views.generic import DetailView
from django.contrib.auth.mixins import LoginRequiredMixin

class index(LoginRequiredMixin, DetailView):

    template_name = 'gamerplace/index.html'
    model = Gamer

    def get_object(self):
        return get_object_or_404(Gamer, user=self.request.user, pk=self.kwargs['pk'])
