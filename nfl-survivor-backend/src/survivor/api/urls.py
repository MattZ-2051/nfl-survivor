from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("auth/signup", views.signup),
    path("auth/", include("rest_framework.urls")),
]
