from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status

from ..serializers.user import CreateUserProfileSerializer
from ..serializers.auth import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    serializer = CreateUserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        new_user = serializer.get_user()
        tokens = MyTokenObtainPairSerializer().get_token(new_user)
        return Response(
            MyTokenObtainPairSerializer.format_tokens(tokens),
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST, exception=True
        )
