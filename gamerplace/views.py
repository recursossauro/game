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

class MyDictionary(LoginRequiredMixin, DetailView):

    template_name = 'gamerplace/mydictionary.html'
    model = Gamer

    def get_object(self):
        return get_object_or_404(Gamer, user=self.request.user, pk=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        context = super(MyDictionary, self).get_context_data(**kwargs)
        context['words'] = kwargs['object'].word_set.all()
        return context
