from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from survivor.models import User


@api_view(["POST"])
def signup(request, format=None):
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
