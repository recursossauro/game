# -*- coding: utf-8 -*-

from django.urls import path

from .views import (
    PersonDataileView,
    MasterCreateView,
    MasterDetailView,
    MasterUpdateView,
    MasterDeleteView,
    GamerCreateView,
    GamerUpdateView,
    GamerPasswordUpdateView,
    MasterGamerDetailView,
    MasterGamerDeleteView,
    GamesDetailView,
    DragLetterFormView,
    DragLetterTemplateView,
)


urlpatterns = [

    path('', PersonDataileView.as_view(), name='index'),
    path('newavatar', MasterCreateView.as_view(), name='newmaster'),
    path('<slug:slug>/masterplace', MasterDetailView.as_view(), name='master'),
    path('<slug:slug>/updateavatar', MasterUpdateView.as_view(), name='updatemaster'),
    path('<slug:slug>/deleteavatar', MasterDeleteView.as_view(), name='deletemaster'),
    path('<slug:slugmaster>/newgamer', GamerCreateView.as_view(), name='newgamer'),
    path('<slug:slugmaster>/<int:pk>/updategamer', GamerUpdateView.as_view(), name='updategamer'),
    path('<slug:slugmaster>/<int:pk>/updategamerpassword', GamerPasswordUpdateView.as_view(), name='updategamerpassword'),
    path('<slug:slugmaster>/<int:pk>/mastergamerplace', MasterGamerDetailView.as_view(), name='mastergamer'),
    path('<slug:slugmaster>/<int:pk>/deletemastergamer', MasterGamerDeleteView.as_view(), name='deletemastergamer'),

    path('<int:pk>/games', GamesDetailView.as_view(), name='games'),
    path('<int:pk>/dragletter', DragLetterFormView.as_view(), name='dragletter'),

]
