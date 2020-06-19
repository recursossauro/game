from django.shortcuts import render
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import (
    ListView,
    CreateView,
    UpdateView,
    DeleteView,
)

from .models import Word

class WordListView(ListView, LoginRequiredMixin):
    model = Word
    template_name = 'words/words.html'

    def get_queryset(self):
        return Word.objects.filter(user = self.request.user)

    def get_context_data(self, **kwargs):
        ctx = super(WordListView, self).get_context_data(**kwargs)
        ctx['title'] = 'Palavras'
        return ctx

class WordCreateView(CreateView, LoginRequiredMixin):
    model = Word
    template_name = 'words/createupdate.html'
    fields = ['user', 'word', 'image']
    success_url = reverse_lazy('words:words')

    def get_context_data(self, **kwargs):
        ctx = super(WordCreateView, self).get_context_data(**kwargs)
        ctx['title'] = 'Nova Palavra'
        return ctx

class WordUpadateView (UpdateView, LoginRequiredMixin):
    model = Word
    template_name = 'words/createupdate.html'
    fields = ['user', 'word', 'image']
    success_url = reverse_lazy('words:words')

    def get_context_data(self, **kwargs):
        ctx = super(WordUpadateView, self).get_context_data(**kwargs)
        ctx['title'] = 'Alterar Palavra'
        return ctx

class WordDeleteView(DeleteView, LoginRequiredMixin):
    model = Word
    template_name = 'words/delete_word.html'
    success_url = reverse_lazy('words:words')
