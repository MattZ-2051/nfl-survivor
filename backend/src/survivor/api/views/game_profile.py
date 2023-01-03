from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import GameProfile, Team, GamePick, Game
from ..serializers.game_profile import GameProfileSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_game_profiles(request):
    try:
        profiles = GameProfile.objects.filter(user_id=request.user.id)
    except Exception as _:
        return Response(
            {"error": "Error getting games"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    serializer = GameProfileSerializer(profiles, many=True)
    if len(serializer.data) == 0:
        return Response({"profile": None})
    else:
        return Response({"profile": serializer.data})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_pick(request):
    scrapy_id = request.data.get("pick")
    game_id = request.data.get("gameId")
    try:
        new_pick = Team.objects.get(scrapy_id=scrapy_id)
        game = Game.objects.get(id=game_id)
        profile = GameProfile.objects.filter(user_id=request.user.id, game=game).get()
    except Exception as _:
        return Response(
            {"error": "Error Updating Team"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    try:
        game_pick = GamePick.objects.get(week=profile.game.current_week, user=profile)
        game_pick.team = new_pick
        game_pick.save()
    except Exception as _:
        game_pick = GamePick.objects.create(
            team=new_pick, week=profile.game.current_week, user=profile
        )

    if len(profile.prev_picks.filter(team=new_pick).all()) != 0:
        return Response(
            {"error": "Team has been picked before"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    else:
        profile.current_pick = game_pick
        profile.save()
        return Response("Pick updated successfully")
