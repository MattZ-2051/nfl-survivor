import json

from celery import shared_task
from .models import Game, GameProfile

@shared_task
def update_game_status():
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
