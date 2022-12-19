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
        profile = GameProfile.objects.filter(user_id=request.user.id).get()
    except Exception as _:
        return Response({"profile": None})
    serializer = GameProfileSerializer(profile, many=False)
    return Response({"profile": serializer.data})
