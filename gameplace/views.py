from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView, CreateView, DetailView, ListView, UpdateView, DeleteView, FormView
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy, reverse
from django.contrib.auth import get_user_model, update_session_auth_hash

from access.forms import UserAdminCreationForm

from .models import Master, Gamer
from .forms import WordIdForm
from access.models import Person
from words.models import Word, Right
from django.contrib.auth.models import User

import random

class PersonDataileView(LoginRequiredMixin, DetailView):

    model = Person
    template_name = 'gameplace/index.html'

    def get_object(self):
        return get_object_or_404(Person, user = self.request.user)

    def get_context_data(self, **kwargs):
        context = super(PersonDataileView, self).get_context_data(**kwargs)
        context['masters'] = Master.objects.filter(user = self.request.user)
        return context



"""class IndexListView(LoginRequiredMixin, ListView):

    model = Master
    template_name = 'gameplace/index.html'

    def get_queryset(self):
        return Master.objects.filter(user = self.request.user)"""

class MasterCreateView(LoginRequiredMixin, CreateView):

    template_name = 'gameplace/new_master.html'
    fields = ['nickname', 'slug', 'avatar']
    success_url = reverse_lazy('gameplace:index')

    def get_queryset(self):
        return Master.objects.filter(user = self.request.user)

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(MasterCreateView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(MasterCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Create a fun new avatar'

        return context

class MasterDetailView(LoginRequiredMixin, DetailView):

    template_name = 'gameplace/master_place.html'
    model         = Master

    def get_context_data(self, **kwargs):
        context = super(MasterDetailView, self).get_context_data(**kwargs)
        gamers = Gamer.objects.filter(master = self.object)
        context['gamers'] = gamers
        return context

class MasterUpdateView(LoginRequiredMixin, UpdateView):

    template_name = 'gameplace/new_master.html'
    fields = ['nickname', 'slug', 'avatar']
    success_url = reverse_lazy('gameplace:index')

    def get_object(self):
        return get_object_or_404(Master, user=self.request.user, slug = self.kwargs['slug'])

    def get_context_data(self, **kwargs):
        context = super(MasterUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Update Avatar'

        return context

class MasterDeleteView(LoginRequiredMixin, DeleteView):

    template_name = 'gameplace/delete_master.html'
    success_url = reverse_lazy('gameplace:index')

    def get_object(self):
        return get_object_or_404(Master, user=self.request.user, slug = self.kwargs['slug'])

class GamerCreateView(LoginRequiredMixin, CreateView):

    model         = get_user_model()
    template_name = 'gameplace/new_user.html'
    form_class    = UserAdminCreationForm
    success_url    = reverse_lazy('gameplace:index') # that will be changed to gamer update


    def form_valid(self, form):
        if form.is_valid():
            gamersmaster = get_object_or_404(Master, slug = self.kwargs['slugmaster'], user = self.request.user)
            formvalid = super(GamerCreateView, self).form_valid(form)
            gamer = Gamer(
                user     = form.instance,
                master   = gamersmaster,
                nickname = form.instance.username,
                avatar   = 'images/generic-avatar.png'
            )
            gamer.save()
        return formvalid

    def get_success_url(self):

        url = reverse_lazy('gameplace:master', kwargs = {'slug':self.kwargs['slugmaster']})
        return url

class GamerUpdateView(LoginRequiredMixin, UpdateView):

    model = Gamer
    template_name = 'gameplace/createupdate.html'
    fields = ['nickname', 'avatar']

    def get_success_url(self):
        url = reverse_lazy('gameplace:master', kwargs = {'slug':self.kwargs['slugmaster']})
        return url

class GamerPasswordUpdateView(LoginRequiredMixin, FormView):

    form_class = PasswordChangeForm
    template_name = 'access/update_user_password.html'
    success_url = reverse_lazy('indexredirect')

    def form_valid(self, form):

        # Get gamer user
        master = get_object_or_404(Master, slug = self.kwargs['slugmaster'])
        gamer  = get_object_or_404(Gamer, master = master, pk = self.kwargs['pk'])

        # Reset password
        #password = self.request.POST.get('id_old_password')
        #gamer.user.set_password(password)
        #gamer.user.save()
        form = PasswordChangeForm(gamer.user, data = self.request.POST)

        form_valid = super(GamerPasswordUpdateView, self).form_valid(form)
        if form.is_valid():
            user = form.save()
            # update_session_auth_hash(self.request, user)
        else:
            print('\n\n\nform invalid\n\n\n')
        return form_valid

    def get_form_kwargs(self):
        kwargs = super(GamerPasswordUpdateView, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs


class MasterGamerDetailView(LoginRequiredMixin, DetailView):

    template_name = 'gameplace/master_gamer_place.html'

    def get_object(self):
        master = get_object_or_404(Master, user=self.request.user, slug=self.kwargs['slugmaster'])
        return get_object_or_404(Gamer, master=master, pk=self.kwargs['pk'])


class MasterGamerDeleteView(LoginRequiredMixin, DeleteView):

    template_name = 'gameplace/delete_master_gamer.html'
    # success_url   = reverse_lazy('gameplace:index')

    def get_success_url(self):
        return reverse_lazy('gameplace:master', kwargs={'slug':self.kwargs['slugmaster']})

    def get_object(self):
        master = get_object_or_404(Master, slug=self.kwargs['slugmaster'])
        return get_object_or_404(Gamer, master=master, pk=self.kwargs['pk'])

class GamesDetailView(LoginRequiredMixin, DetailView):

        template_name = 'gameplace/games.html'

        def get_object(self):
            try:
                return Gamer.objects.get(user=self.request.user, pk=self.kwargs['pk'])
            except:
                # the master can play the games like he is one of his gamers,
                # but will be registered on his user
                return get_object_or_404(Gamer, master__user=self.request.user, pk=self.kwargs['pk'])

def getGamer(user, pk):
    # get the gamer only if the user is the user gamer or the user master of the gamer.
    try:
        gamer = Gamer.objects.get(user=user, pk=pk)
    except:
        # the master can play the games like he is one of his gamers,
        # but will be registered on his user
        gamer =  get_object_or_404(Gamer, master__user=user, pk=pk)

    return gamer

class DragLetterFormView(LoginRequiredMixin, FormView):

    template_name = 'gameplace/drag_letter.html'

    form_class = WordIdForm

    def setup(self, request, *args, **kwargs):
        super(DragLetterFormView,self).setup(request, *args, **kwargs)
        self.gamer = getGamer(self.request.user, self.kwargs['pk'])

    def get_context_data(self, **kwargs):

        user = self.request.user

        """
        Select some random word
        """

        # Get all Gamer's word
        words = Word.objects.filter(gamer=self.gamer)
        word = ''
        if (words.count()>1):
            word_number = random.randrange(words.count())
            word = words[word_number]
        elif (words.count()==1):
            word = words[0]

        # get Rights number to word
        try:
            rights = word.right_set.get(user=self.request.user).number
        except Exception as e:
            rights = 0

        context = super(DragLetterFormView, self).get_context_data(**kwargs)
        context['title'] = 'Drag Letter'

        context['gamer'] = self.gamer


        if (word==''):
            context['randomWord'] = ''
            return context

        context['word']  = word

        target = word.word

        """
        Rules for the Target
        -----
            1. Dragletter show each letters of the word to be a target;
            2. If a gamer has right number equal 5 for a word dragletters show the word with an simbol insted first letter.
            3. After that, for each plus 3 plus right number for a word, the dragletter add an simbol on a random position on the word.
        """

        if (rights>=5):
            target = '☺' + target[1:]
            if (rights >= 8):
                facesNumber = int((rights-5)/3)
                characterNumber = len(target[1:])
                if (facesNumber>characterNumber): facesNumber = characterNumber
                characterNumber = characterNumber-facesNumber
                mask = (''.join(('1') for i in range(facesNumber)))+(''.join(('0') for i in range(characterNumber)))
                mask = list(mask)
                random.shuffle(mask)
                mask = ''.join(mask)
                mask = '1' + mask
                aux = ''
                for i in range(len(target)):
                    if (mask[i:i+1]=='0'):
                        aux = aux+target[i:i+1]
                    else:
                        aux = aux+'☺'

                target = aux




        context['target'] = target




        randomList = list(word.word)
        random.shuffle(randomList)
        context['randomWord'] = ''.join(randomList)

        return context

    def form_valid(self, form):
        if (form.is_valid()):
            # Get an Right if exist or create one.
            word = get_object_or_404(Word, id=form.cleaned_data['word_id'], gamer = self.gamer)
            try:
                right = Right.objects.get(user=self.request.user, gamer=self.gamer, word=word)
            except:
                right = Right(user=self.request.user, gamer=self.gamer, word=word, number=0)

            right.number += 1
            right.save()

        return super(DragLetterFormView, self).form_valid(form)

    def get_success_url(self):
        return reverse_lazy('gameplace:dragletter', kwargs={'pk':self.kwargs['pk']})
