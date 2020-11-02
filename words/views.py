from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import (
    ListView,
    CreateView,
    UpdateView,
    DeleteView,
)

from .models import Word
from gameplace.models import Master, Gamer

def getGamer(user, slugmaster, pkgamer):
    master = get_object_or_404(Master, user=user, slug=slugmaster)

    return get_object_or_404(master.getGamers(), pk=pkgamer)

class WordListView(ListView, LoginRequiredMixin):
    model = Word
    template_name = 'words/words.html'

    def get_queryset(self):
        return Word.objects.filter(user = self.request.user)

    def get_context_data(self, **kwargs):
        ctx = super(WordListView, self).get_context_data(**kwargs)
        ctx['title'] = 'Words'
        return ctx

class WordCreateView(CreateView, LoginRequiredMixin):
    model = Word
    template_name = 'words/createupdate.html'
    fields = ['word', 'image']
    success_url = reverse_lazy('words:words')

    def get_context_data(self, **kwargs):

        ctx = super(WordCreateView, self).get_context_data(**kwargs)

        """
            This avoid some one use a random Gamer PK.
        """

        gamer  = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])

        ctx['gamer'] = gamer

        ctx['title'] = 'New Word'


        return ctx

    def form_valid(self, form):

        """
            This avoid some one use a random Gamer PK.
        """
        gamer  = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])
        form.instance.master = gamer.master
        form.instance.gamer  = gamer

        return super(WordCreateView, self).form_valid(form)

    def get_success_url(self):

        return reverse_lazy('gameplace:mastergamer', kwargs={'slugmaster':self.kwargs['slugmaster'],'pk':self.kwargs['pkgamer']})



class WordUpadateView (UpdateView, LoginRequiredMixin):

    template_name = 'words/createupdate.html'
    fields = ['word', 'image']
    success_url = reverse_lazy('words:words')

    def get_object(self):

        gamer = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])
        return Word.objects.get(gamer=gamer, pk=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        ctx = super(WordUpadateView, self).get_context_data(**kwargs)
        ctx['title'] = 'Alterar Palavra'

        gamer  = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])
        ctx['gamer'] = gamer

        return ctx

    def get_success_url(self):

        return reverse_lazy('gameplace:mastergamer', kwargs={'slugmaster':self.kwargs['slugmaster'],'pk':self.kwargs['pkgamer']})

class WordDeleteView(DeleteView, LoginRequiredMixin):

    template_name = 'words/delete_word.html'
    success_url = reverse_lazy('words:words')

    def get_object(self):

        gamer = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])
        return Word.objects.get(gamer=gamer, pk=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        ctx = super(WordDeleteView, self).get_context_data(**kwargs)
        ctx['title'] = 'Excluir Palavra'

        gamer  = getGamer(self.request.user, self.kwargs['slugmaster'], self.kwargs['pkgamer'])
        ctx['gamer'] = gamer

        return ctx

    def get_success_url(self):

        return reverse_lazy('gameplace:mastergamer', kwargs={'slugmaster':self.kwargs['slugmaster'],'pk':self.kwargs['pkgamer']})
