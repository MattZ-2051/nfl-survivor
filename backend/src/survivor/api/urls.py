from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    auth as auth_view,
    user as user_view,
    spider as spider_view,
    team as team_view,
    game as game_view,
)

urlpatterns = [
    path("games/create/", game_view.createGame, name="create_game"),
    path("games/", game_view.getGames, name="games"),
    path("teams/", team_view.getTeams, name="teams"),
    path("users/me/", user_view.getUserProfiles, name="get_me"),
    path("auth/signup/", auth_view.signup, name="signup"),
    path("crawl/", spider_view.crawl, name="crawl"),
    path(
        "auth/token/",
        auth_view.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
