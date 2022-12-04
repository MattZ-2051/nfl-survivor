from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import auth as authView, user as userView, spider as spiderView

urlpatterns = [
    path("users/me", userView.getUserProfiles, name="get_me"),
    path("auth/signup", authView.signup, name="signup"),
    path('crawl/', spiderView.crawl, name="crawl"),
    path(
        "auth/token", authView.MyTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("auth/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
