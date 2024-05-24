"""
URL configuration for lab5 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from TravelAgent import views


urlpatterns = [
    re_path(r'^tours/[-\w]+/',views.tours,name='tours_search'),
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('register/',views.register, name='register'),

    path('main/',views.main, name='main'),
    path('about/',views.about,name='about'),
    path('news/', views.news, name='news'),
    path('dick/', views.dick, name='dick'),
    path('contacts/', views.contacts, name='contacts'),
    path('policy/', views.policy, name='policy'),
    path('job/',views.job,name='job'),
    path('reviews/',views.reviews,name='reviews'),
    path('promo/',views.promo,name='promo'),
    path('tours/',views.tours,name='tours'),
    path('tours/<slug:slug>/', views.tours, name='tours_search'),

    path('orders/',views.orders,name='orders'),

    path('sells/',views.sells,name='sells'),
    path('clients/',views.clients,name='clients'),

    path('stats/',views.stats,name='stats'),
    path('edit/',views.edit,name='edit'),
    path('delete/',views.delete,name='delete'),
]
