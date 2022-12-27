from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import GameProfile
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
