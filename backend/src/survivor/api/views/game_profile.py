from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import GameProfile, Team
from ..serializers.game_profile import GameProfileSerializer
from ..serializers.team import TeamSerializer


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
    new_pick = request.data.get("pick")
    try:
        profile = GameProfile.objects.filter(user_id=request.user.id).get()
        team = Team.objects.filter(scrapy_id=new_pick).get()
    except Exception as _:
        return Response(
            {"error": "Error Updating Team"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    # for pick in profile.prev_picks:
    if len(profile.prev_picks.filter(scrapy_id=new_pick).all()) != 0:
        return Response(
            {"error": "Team has been picked before"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    else:
        profile.current_pick = team
        profile.save()
        return Response("Pick updated successfully")
