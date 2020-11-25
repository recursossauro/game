from django.shortcuts import render
from dropbox.exceptions import ApiError
import traceback
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, FormView
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import UserAdminCreationForm
from .models import Person

class UserCreateView(CreateView):
    model         = get_user_model()
    form_class    = UserAdminCreationForm
    template_name = 'access/new_user.html'
    success_url   = reverse_lazy('indexredirect')

class UserUpdateView(LoginRequiredMixin, UpdateView):
    template_name = 'access/update_user.html'
    model = get_user_model()
    success_url = reverse_lazy('index')
    fields = ['username','email']

    def get_object(self):
        return self.request.user

class UserPaswordUpdateView(LoginRequiredMixin, FormView):
    form_class = PasswordChangeForm
    template_name = 'access/update_user_password.html'
    success_url = reverse_lazy('indexredirect')

    def form_valid(self, form):
        form_valid = super(UserPaswordUpdateView, self).form_valid(form)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(self.request, user)
        return form_valid

    def get_form_kwargs(self):
        kwargs = super(UserPaswordUpdateView, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

class PersonCreateView (LoginRequiredMixin, CreateView):
    model = Person
    template_name = 'access/createupdate.html'
    fields = ['name', 'birth', 'photo']
    success_url = reverse_lazy('indexredirect')

    def get_context_data(self, **kwargs):
        ctx = super(PersonCreateView, self).get_context_data(**kwargs)
        ctx['title'] = 'Please complete the Registration'
        return ctx

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(PersonCreateView, self).form_valid(form)

class PersonUpadateView (LoginRequiredMixin, UpdateView):
    model = Person
    template_name = 'access/createupdate.html'
    fields = ['name', 'birth', 'photo']
    success_url = reverse_lazy('indexredirect')

    def get_object(self):
        person = Person.objects.get(user = self.request.user)
        if (person.photo != None):
            try:
                person.photo.url
            except ApiError as e:
                traceback.print_exc()
                person.photo = None
            except ValueError as e:
                # Prevent person.image == None
                pass
        return person

    def get_context_data(self, **kwargs):
        ctx = super(PersonUpadateView, self).get_context_data(**kwargs)
        ctx['title'] = 'Cadastro'
        return ctx
