from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import json

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
    if len(serializer.data) == 0:
        return Response({"games": None})
    else:
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
    if len(results) == 0:
        return Response({"users": None})
    else:
        return Response({"users": results})


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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def join_game(request):
    code = request.data.get("code")

    try:
        game = Game.objects.filter(code=code).get()
        user = UserProfile.objects.get(user=request.user)
    except Exception as _:
        return Response(
            {"error": "Invalid Game Code"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    try:
        GameProfile.objects.create(user=user, game=game)
    except Exception as _:
        Response(
            {"error": "error creating game"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    return Response({"game_id": game.id})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def leave_game(request, game_id):
    game = Game.objects.get(id=game_id)
    user_profile = UserProfile.objects.get(user=request.user)
    game_profile = GameProfile.objects.get(game=game, user=user_profile)
    if game.active:
        return Response(
            {"error": "cannot leave active game"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    try:
        game_profile.delete()
    except Exception as _:
        Response(
            {"error": "error leaving game"},
            status=status.HTTP_400_BAD_REQUEST,
            exception=True,
        )
    return Response("game profile deleted")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_game_status(request):
    games = Game.objects.all()
    for current_game in games:
        current_game.current_week += 1
        game_profile = GameProfile.objects.filter(game=current_game.id).all()
        game_winners = []
        game_losers = []
        for profile in game_profile:
            if profile.current_pick is None:
                profile.is_loser = True
                profile.is_winner = False
                game_losers.append(profile)
            else:
                current_pick = profile.current_pick
                profile.prev_picks.add(current_pick)
                current_week = current_game.current_week
                schedule = json.loads(current_pick.team.schedule)
                for team in schedule:
                    week = int(team.get("week"))
                    if week == current_week:
                        result = team.get("result")
                        if result == "L":
                            profile.is_loser = True
                            profile.is_winner = False
                            game_losers.append(profile)
                        elif result == "W":
                            profile.is_loser = False
                            game_winners.append(profile)
            profile.current_pick = None
            profile.save()
            current_pick.save()
            current_game.save()
        if len(game_winners) == 1:
            winner = game_winners[0]
            winner.is_winner = True
            winner.save()
    return Response("game updated")
