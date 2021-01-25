# -*- coding: utf-8 -*-

from django.urls import path


from gamerplace.views import index, MyDictionary

urlpatterns = [
    path('<int:pk>', index.as_view(), name='index'),
    path('<int:pk>/mydictionary', MyDictionary.as_view(), name='mydictionary'),
]
