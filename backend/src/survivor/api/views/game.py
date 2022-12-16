from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import Game
from ..serializers.game import GameSerializer, CreateGameSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getGames(request):
    queryset = Game.objects.all()
    serializer = GameSerializer(queryset, many=True)
    return Response({"games": serializer.data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createGame(request):
    new_game = CreateGameSerializer(data=request.data)
    if new_game.is_valid():
        new_game.save()
        return Response("Game Created")
    else:
        return Response(
            new_game.errors, status=status.HTTP_400_BAD_REQUEST, exception=True
        )
