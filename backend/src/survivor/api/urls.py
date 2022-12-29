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
    game_profile as game_profile_view,
)

urlpatterns = [
    path("games/<int:game_id>/users/", game_view.get_users_in_game),
    path("games/<int:game_id>/", game_view.get_single_game, name="game"),
    path("games/create/", game_view.create_games, name="create_game"),
    path(
        "games/profile/update/",
        game_profile_view.update_user_pick,
        name="update_game_profile",
    ),
    path(
        "games/profile/", game_profile_view.get_user_game_profiles, name="game_profiles"
    ),
    path("games/join/", game_view.join_game, name="join_game"),
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
