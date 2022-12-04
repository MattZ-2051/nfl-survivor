from django.contrib import admin

from .models import UserProfile, Game, ScrapyItem

admin.site.register(UserProfile)
admin.site.register(Game)
admin.site.register(ScrapyItem)
