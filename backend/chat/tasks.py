from datetime import timedelta

from django.conf import settings
from django.utils import timezone

from backend.celery import app
from chat.models import User


SEC = timedelta(0, 1)


@app.task
def disconnect_idle_users():
    print("xis")
    now = timezone.now()
    tstamp = now - 5 * SEC

    qs = User.objects.filter(online=True,
                             last_seen__lt=tstamp)
    for user in qs:
        user.disconnect_idle()


@app.on_after_finalize.connect
def schedule_disconnect_users(sender, **kwargs):
    interval = 5
    print("xis 2")
    sender.add_periodic_task(interval,
                             disconnect_idle_users.s(),
                             expires=interval,
                             name='schedule_disconnect_users')
