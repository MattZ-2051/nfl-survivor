from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("auth/signup/", views.signup_view),
    path("auth/login/", views.login_view),
    path("test/auth/", views.authenticated_view),
    path("test/", views.test_view)
]
