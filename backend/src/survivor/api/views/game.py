from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from survivor.models import Game
from ..serializers.game import GameSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getGames(request):
    queryset = Game.objects.all()
    serializer = GameSerializer(queryset, many=True)
    return Response({"games": serializer.data})
