from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from survivor.models import Game, UserProfile, GameProfile
from ..serializers.game import GameSerializer, CreateGameSerializer
from ..serializers.game_profile import (
    GameProfileSerializer,
)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_games(request):
    try:
        queryset = Game.objects.all()
    except Exception as _:
        return Response({"games": None})
    serializer = GameSerializer(queryset, many=True)
    return Response({"games": serializer.data})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users_in_game(request, game_id):
    game = Game.objects.get(id=game_id)
    try:
        queryset = GameProfile.objects.all().filter(game=game)
    except Exception as _:
        return Response({"users": None})
    results = []
    for profile in queryset:
        results.append(GameProfileSerializer(profile).data)
    return Response({"users": ""})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_single_game(request, game_id):
    game = Game.objects.get(id=game_id)
    serializer = GameSerializer(game, many=False)
    return Response({"game": serializer.data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_games(request):
    new_game = CreateGameSerializer(data=request.data)
    if new_game.is_valid():
        new_game.save()
        profile = UserProfile.objects.get(user=request.user)
        new_game_instance = Game.objects.get(id=new_game.data["id"])
        try:
            GameProfile.objects.create(
                user=profile, game=new_game_instance, is_owner=True
            )
        except Exception as _:
            Response(
                {"error": "error creating game"},
                status=status.HTTP_400_BAD_REQUEST,
                exception=True,
            )
        return Response("Game Created")
    else:
        return Response(
            new_game.errors, status=status.HTTP_400_BAD_REQUEST, exception=True
        )
