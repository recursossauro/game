from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.views import (
    LoginView,
    LogoutView,
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from django.urls import reverse_lazy

from .views import UserCreateView, UserUpdateView, UserPaswordUpdateView, PersonCreateView, PersonUpadateView

urlpatterns = [

    path('', TemplateView.as_view(template_name='access/index.html'), name='index'),
    path('login/', LoginView.as_view(template_name = 'access/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='index'), name='logout'),
    path('newuser/', UserCreateView.as_view(), name='newuser'),
    path('updateuser/', UserUpdateView.as_view(), name='updateuser' ),
    path('updatepassword/', UserPaswordUpdateView.as_view(), name='updatepassword'),

    path('password-reset/', PasswordResetView.as_view(email_template_name='access/password_reset_email.html' , success_url=reverse_lazy("access:password_reset_done")), name='passwordreset'),
    path("password-reset/done/", PasswordResetDoneView.as_view(), name="password_reset_done"),
    path("password-reset-confirm/<uidb64>/<token>", PasswordResetConfirmView.as_view(success_url=reverse_lazy("access:password_reset_complete")), name="password_reset_confirm"),
    path("password-reset-complete/", PasswordResetCompleteView.as_view(), name="password_reset_complete"),

    path('newpersonaldata/', PersonCreateView.as_view(), name='newpersonaldata'),
    path('updatepersonaldata/', PersonUpadateView.as_view(), name='updatepersonaldata'),


]
