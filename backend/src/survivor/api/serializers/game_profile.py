from rest_framework import serializers
from survivor.models import GameProfile
from .game import GameSerializer
from .user import UserProfileSerializer
from .team import TeamSerializer


class GameProfileSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)
    user = UserProfileSerializer(many=False)
    current_pick = TeamSerializer(many=False)
    prev_picks = TeamSerializer(many=True)

    class Meta:
        model = GameProfile
        fields = "__all__"
