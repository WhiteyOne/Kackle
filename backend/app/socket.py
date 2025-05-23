from flask_socketio import SocketIO, emit, join_room, leave_room
from .models.channel_message import Channel_Message
from .models import db
from flask import request

#middleman, establishing websocket on the backend
socket = SocketIO(cors_allowed_origins="*")

@socket.on("chat")
def handle_my_chat(data):
    print(data)
    msg = data["message"]
    user = data["user"]["username"]
    new_data = {"user": user, "msg": msg}
    emit(
        "chat",
        new_data,
        broadcast=True,
        to=data["room"],
    )
    
@socket.on("message")
def handle_chat(data):
    print(data)
    emit("chat", broadcast=True)

@socket.on("join")
def on_join(data):
    user = data["user"]["username"]
    msg = f"{user} has joined the channel."
    new_data = {"user": "Global Notification", "msg": msg}
    join_room(data["room"])
    emit("join", new_data, broadcast=True)

@socket.on("leave")
def exit_room(data):
    user = data["user"]["username"]
    room = data["room"]
    leave_room(room, sid=request.sid)
    msg = f"{user} has left the channel."
    new_data = {"user": "Global Notification", "msg": msg}
    emit("leave", new_data, to=room, broadcast=True)
