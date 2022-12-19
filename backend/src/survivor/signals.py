from django.contrib.auth.models import User
from django.core.signals import request_finished
from django.dispatch import receiver
from .models import UserProfile


@receiver(request_finished, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    method to create UserProfile project when Django User is created
    """
    if created and isinstance(instance, User):
        UserProfile.objects.create(user=instance)
    request_finished.disconnect(create_user_profile)
