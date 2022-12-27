from rest_framework import serializers
from survivor.models import Game
from rest_framework.validators import UniqueValidator


class KeyValueField(serializers.Field):
    """A field that takes a field's value as the key and returns
    the associated value for serialization"""

    labels = {}
    inverted_labels = {}

    def __init__(self, labels, *args, **kwargs):
        self.labels = labels
        # Check to make sure the labels dict is reversible, otherwise
        # deserialization may produce unpredictable results
        inverted = {}
        for k, v in labels.items():
            if v in inverted:
                raise ValueError(
                    "The field is not deserializable with the given labels."
                    " Please ensure that labels map 1:1 with values"
                )
            inverted[v] = k
        self.inverted_labels = inverted
        return super(KeyValueField, self).__init__(*args, **kwargs)

    def to_representation(self, obj):
        if type(obj) is list:
            return [self.labels.get(o, None) for o in obj]
        else:
            return self.labels.get(obj, None)

    def to_internal_value(self, data):
        if type(data) is list:
            return [self.inverted_labels.get(o, None) for o in data]
        else:
            return self.inverted_labels.get(data, None)


class GameSerializer(serializers.ModelSerializer):
    status = KeyValueField(labels={"UP": "upcoming", "AC": "active", "FI": "finished"})

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
