from rest_framework import serializers
from survivor.models import GameProfile
from .game import GameSerializer


class GameProfileSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    class Meta:
        model = GameProfile
        fields = "__all__"
