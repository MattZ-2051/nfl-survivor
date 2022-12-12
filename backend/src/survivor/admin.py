from django.contrib import admin

from .models import UserProfile, Game, Team

admin.site.register(UserProfile)
admin.site.register(Game)
admin.site.register(Team)
