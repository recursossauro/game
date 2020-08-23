# -*- coding: utf-8 -*-

from django.urls import path

from gamerplace.views import index

urlpatterns = [
    path('<int:pk>', index.as_view(), name='index')
]
