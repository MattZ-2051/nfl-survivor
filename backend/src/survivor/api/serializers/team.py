from rest_framework import serializers
from survivor.models import Team, GamePick


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        exclude = ["id"]


class GamePickSerializer(serializers.ModelSerializer):
    team = TeamSerializer(many=False)

    class Meta:
        model = GamePick
        fields = "__all__"
