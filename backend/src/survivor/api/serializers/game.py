from rest_framework import serializers
from survivor.models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["name"]


class CreateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["name"]

        def create(self, validated_data):
            new_game = Game.objects.create(
                code=validated_data["code"], name=validated_data["name"]
            )
            return new_game
