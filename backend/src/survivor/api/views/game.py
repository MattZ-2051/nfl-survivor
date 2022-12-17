from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import Game, UserProfile
from ..serializers.game import GameSerializer, CreateGameSerializer
from ..serializers.user import UserProfileSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_games(request):
    queryset = Game.objects.all()
    serializer = GameSerializer(queryset, many=True)
    return Response({"games": serializer.data})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users_in_game(request, game_id):
    game = Game.objects.get(id=game_id)
    queryset = UserProfile.objects.all().filter(games=game)
    results = []
    for user in queryset:
        results.append(user.user.username)

    return Response({"users": results})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_games(request):
    new_game = CreateGameSerializer(data=request.data)
    if new_game.is_valid():
        new_game.save()
        profile = UserProfile.objects.get(user=request.user)
        profile.games = Game.objects.get(id=new_game.data["id"])
        profile.save(update_fields=["games"])
        return Response("Game Created")
    else:
        return Response(
            new_game.errors, status=status.HTTP_400_BAD_REQUEST, exception=True
        )
