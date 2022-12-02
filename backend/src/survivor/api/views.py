from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def set_csrf_token(request):
    """
    This will be `/api/set-csrf-cookie/` on `urls.py`
    """
    return Response({"details": "CSRF cookie set"})


@api_view(["GET"])
def getRoutes(request):
    routes = ["/token/", "/token/refresh/"]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    username = request.user
    serializer = user.UserProfileSerializer(username, many=False)
    return Response(serializer.data)
