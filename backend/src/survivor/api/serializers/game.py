from rest_framework import serializers
from survivor.models import Game
from rest_framework.validators import UniqueValidator


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        exclude = ["code"]


class CreateGameSerializer(serializers.ModelSerializer):
    code = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Game.objects.all(), message="Game Name or Code already exist"
            )
        ]
    )

    class Meta:
        model = Game
        fields = "__all__"

    def create(self, validated_data):
        new_game = Game.objects.create(
            code=validated_data["code"], name=validated_data["name"]
        )
        return new_game

    def validate(self, data):
        if not data.get("code") or not data.get("name"):
            raise serializers.ValidationError(
                {"error": "code and name fields are required"}, code=400
            )
        if len(data.get("code")) != 4:
            raise serializers.ValidationError(
                {"error": "code must be 4 digits"}, code=400
            )
        return super(CreateGameSerializer, self).validate(data)
