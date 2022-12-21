from rest_framework import serializers
from survivor.models import GameProfile
from .game import GameSerializer
from .user import UserProfileSerializer


class GameProfileSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)
    user = UserProfileSerializer(many=False)

    class Meta:
        model = GameProfile
        fields = "__all__"
