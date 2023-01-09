from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims)
        token["username"] = user.username
        # ...

        return token

    @staticmethod
    def format_tokens(token):
        return {
            "refresh": str(token),
            "access": str(token.access_token),
        }
