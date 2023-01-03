from rest_framework import serializers
from survivor.models import GameProfile
from .game import GameSerializer
from .user import UserProfileSerializer
from .team import GamePickSerializer


class GameProfileSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)
    user = UserProfileSerializer(many=False)
    current_pick = GamePickSerializer(many=False)
    prev_picks = GamePickSerializer(many=True)

    class Meta:
        model = GameProfile
        fields = "__all__"
