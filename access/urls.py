from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView, LogoutView

from .views import UserCreateView, UserUpdateView, UserPaswordUpdateView, PersonCreateView, PersonUpadateView

urlpatterns = [

    path('', TemplateView.as_view(template_name='access/index.html'), name='index'),
    path('login/', LoginView.as_view(template_name = 'access/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='index'), name='logout'),
    path('newuser/', UserCreateView.as_view(), name='newuser'),
    path('updateuser/', UserUpdateView.as_view(), name='updateuser' ),
    path('updatepassword', UserPaswordUpdateView.as_view(), name='updatepassword'),
    path('newpersonaldata/', PersonCreateView.as_view(), name='newpersonaldata'),
    path('updatepersonaldata/', PersonUpadateView.as_view(), name='updatepersonaldata'),

]
