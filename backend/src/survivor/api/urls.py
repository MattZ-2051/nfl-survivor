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
    path("games/<int:game_id>/", game_view.get_users_in_game),
    path("games/create/", game_view.create_games, name="create_game"),
    path("games/", game_view.get_games, name="games"),
    path("teams/", team_view.get_teams, name="teams"),
    path("users/me/", user_view.get_user_profile, name="get_me"),
    path("auth/signup/", auth_view.signup, name="signup"),
    path("crawl/", spider_view.crawl, name="crawl"),
    path(
        "auth/token/",
        auth_view.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
