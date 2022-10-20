from rest_framework import serializers
from chat.models import User, Room, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nick',)


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Message
        fields = (
            'user',
            'room',
            'tstamp',
            'message',
        )


class RoomSerializer(serializers.ModelSerializer):
    online_users = UserSerializer(many=True)
    message_set = MessageSerializer(many=True)

    class Meta:
        model = Room
        fields = (
            'name',
            'online_users',
            'message_set',
        )
