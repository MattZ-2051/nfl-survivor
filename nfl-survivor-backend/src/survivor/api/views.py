from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib.auth import login
from survivor.models import User
from .serializers import LoginSerializer

@csrf_protect
@api_view(["POST"])
def signup_view(request, format=None):
    data = request.data
    print("request", request.data)
    username = data["username"]
    password = data["password"]
    re_password = data["re_password"]
    if password == re_password:
        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists", code=400)
        else:
            if len(password) < 6:
                raise ValidationError(
                    "Password must be at least 6 characters", code=400
                )
            else:
                user = User(username=username, password=password)
                user.save()
                return Response({"User successfuly created"})
    else:
        raise ValidationError("Passwords do not match", code=400)

# @api_view(["POST"])
# # @csrf_protect
# @permission_classes(())
# def logout_view(request):

@api_view(["POST"])
# @csrf_protect
@permission_classes(())
def login_view(request, format=None):
    serializer = LoginSerializer(data=request.data,
        context={ 'request': request })
    print('serailizer', serializer)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return Response("User logged in successfully", status=200)

@ensure_csrf_cookie
def set_csrf_token(request):
    """
    This will be `/api/set-csrf-cookie/` on `urls.py`
    """
    return Response({"details": "CSRF cookie set"})

@api_view(["GET"])
# @permission_classes((IsAuthenticated, ))
@authentication_classes(SessionAuthentication)
def authenticated_view(request):
  return Response({'authenticated'})

@api_view(["GET"])
@permission_classes(())
def test_view(request):
  return Response({'authenticated'})
