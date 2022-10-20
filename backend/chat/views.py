from django.http import (HttpResponse,
                         HttpResponseForbidden,
                         HttpResponseNotFound)
from rest_framework.views import APIView
from rest_framework.response import Response
from chat.models import User, Room, Message
from chat.serializers import (UserSerializer,
                              RoomSerializer,
                              MessageSerializer)


class JoinView(APIView):

    def post(self, request, room_name, nick):
        room, _ = Room.objects.get_or_create(name=room_name)

        room.user_join(nick)

        return HttpResponse(status=201)


class LeaveView(APIView):

    def post(self, request, room_name, nick):
        room, _ = Room.objects.get_or_create(name=room_name)

        room.user_leave(nick)

        return HttpResponse(status=201)


class SendView(APIView):

    def post(self, request, room_name, nick):
        room, _ = Room.objects.get_or_create(name=room_name)

        if message := request.data.get('message'):
            room.send_message(nick, message)

        return HttpResponse(status=201)


class MessageListView(APIView):

    def get(self, request, room_name, nick):
        room, _ = Room.objects.get_or_create(name=room_name)

        room.user_tick(nick)

        messages = room.message_set.all()[:20]

        serializer = MessageSerializer(messages, many=True)

        return Response(reversed(serializer.data))
