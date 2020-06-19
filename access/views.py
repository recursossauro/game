from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, FormView
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordChangeForm

from .forms import UserAdminCreationForm

class UserCreateView(CreateView):
    model         = get_user_model()
    form_class    = UserAdminCreationForm
    template_name = 'access/new_user.html'
    success_url   = reverse_lazy('index')

class UserUpdateView(UpdateView):
    template_name = 'access/update_user.html'
    model = get_user_model()
    success_url = reverse_lazy('index')
    fields = ['username','email']

    def get_object(self):
        return self.request.user

class UserPaswordUpdateView(FormView):
    form_class = PasswordChangeForm
    template_name = 'access/update_user_password.html'
    success_url = 'index'

    def form_valid(self, form):
        form_valid = super(AndernPasswortView, self).form_valid(form)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(self.request, user)
        return form_valid
