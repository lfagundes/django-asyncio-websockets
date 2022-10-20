import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import Room, Message
from chat.serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        kwargs = self.scope['url_route']['kwargs']

        room = kwargs['room_name']
        nick = kwargs['nick']

        await self.init(room, nick)
        await self.channel_layer.group_add(room, self.channel_name)
        await self.accept()

        await self.send_messages()

    @database_sync_to_async
    def init(self, room, nick):
        self.room, _ = Room.objects.get_or_create(name=room)
        self.user = self.room.user_join(nick)

    @database_sync_to_async
    def send_messages(self):
        messages = self.room.message_set.all()[:20]

        serializer = MessageSerializer(messages, many=True)
        text_data = json.dumps(serializer.data)
        self.send(text_data=text_data)

    def receive(self, *, text_data):
        self.room.send_message(self.nick, text_data)

    async def disconnect(self, message):
        pass

    async def broadcast(self, payload):
        data = json.dumps(payload['payload'])
        await self.send(text_data=data)
