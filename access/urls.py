from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView, LogoutView

from .views import UserCreateView, UserUpdateView

urlpatterns = [

    path('', TemplateView.as_view(template_name='access/index.html'), name='index'),
    path('entrada/', LoginView.as_view(template_name = 'access/login.html'), name='login'),
    path('sair/', LogoutView.as_view(next_page='index'), name='logout'),
    path('novousuario/', UserCreateView.as_view(), name='newuser'),
    path('alterarusuario/', UserUpdateView.as_view(), name='updateuser' )

]
