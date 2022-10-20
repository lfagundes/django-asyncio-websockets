from django.db import models
from django.utils import timezone


class Room(models.Model):
    name = models.CharField(max_length=32,
                            unique=True)

    def __str__(self):
        return self.name

    @property
    def online_users(self):
        return self.user_set.filter(online=True)

    def user_join(self, nick):
        user, _ = self.user_set.get_or_create(nick=nick)

        message = f'{nick} entrou da sala'

        self.message_set.create(user=user,
                                action=True,
                                message=message)

    def user_leave(self, nick):
        try:
            user = self.user_set.get(nick=nick)
        except User.DoesNotExist:
            return False

        user.online = False
        user.last_seen = timezone.now()
        user.save()

        message = f'{nick} saiu da sala'

        self.message_set.create(user=user,
                                action=True,
                                message=message)
        return True

    def send_message(self, nick, message):
        user, _ = self.user_set.get_or_create(nick=nick)
        self.message_set.create(user=user,
                                message=message)

    def user_tick(self, nick):
        user, _ = self.user_set.get_or_create(nick=nick)
        user.online = True
        user.last_seen = timezone.now()
        user.save()


class User(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    nick = models.CharField(max_length=16)
    last_seen = models.DateTimeField(auto_now_add=True)
    online = models.BooleanField(default=True)

    def disconnect_idle(self):
        self.room.message_set.create(user=self,
                                     message=f'{self.nick} caiu (timeout)',
                                     action=True)
        self.online = False
        self.save()


    class Meta:
        unique_together = [['room', 'nick']]

    def __str__(self):
        return f'{self.nick}@{self.room}'


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    tstamp = models.DateTimeField(auto_now_add=True)
    action = models.BooleanField(default=False)
    message = models.TextField()

    class Meta:
        ordering = ('-tstamp',)

    def __str__(self):
        return f'{self.user} - {self.message[:30]}'
