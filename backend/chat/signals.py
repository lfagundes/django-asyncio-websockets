import channels.layers
from asgiref.sync import async_to_sync

from django.db.models.signals import post_save
from chat.models import Message


def send_new_messages(sender, instance, **kwargs):
    # Por enquanto só queremos mandar novas mensagens
    if not kwargs['created']:
        return

    message = instance

    payload = {
        'user': message.user.nick,
        'message': message.message,
    }

    async_to_sync(dispatch)(instance.room.name, payload)


async def dispatch(room, payload):
    channel_layer = channels.layers.get_channel_layer()

    await channel_layer.group_send(
        room,
        {
            'type': 'broadcast',
            'payload': payload,
        },
    )

post_save.connect(send_new_messages,
                  sender=Message,
                  dispatch_uid='send_new_messages')
