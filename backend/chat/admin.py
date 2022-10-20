from django.contrib import admin
from chat.models import Room, User, Message


admin.site.register(Room, admin.ModelAdmin)
admin.site.register(User, admin.ModelAdmin)
admin.site.register(Message, admin.ModelAdmin)
