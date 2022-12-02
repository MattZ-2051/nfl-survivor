from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import auth as authView, user as userView

urlpatterns = [
    path("users/me", userView.getUserProfiles),
    path("auth/signup", authView.signup),
    path(
        "auth/token", authView.MyTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
