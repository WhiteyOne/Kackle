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
    username = data["user"]["username"]
    owner_id = data["user"]["id"]
    channel_id = data["room"]

    message = Channel_Message(
        body=msg,
        owner_id=owner_id,
        channel_id=channel_id
    )
    db.session.add(message)
    db.session.commit()

    new_data = {
        "id": message.id,
        "user": username,
        "msg": msg,
    }
    emit("chat", new_data, broadcast=True, to=channel_id)

    
@socket.on("message")
def handle_chat(data):
    print(data)
    emit("chat", broadcast=True)

@socket.on("delete_message")
def handle_delete_message(data):
    message_id = data["message_id"]
    room = data["room"]

    message = db.session.get(Channel_Message, message_id)
    if message:
        db.session.delete(message)
        db.session.commit()
        emit("message_deleted", {
            "message_id": message_id
        }, to=room, broadcast=True)


@socket.on("update_message")
def handle_update_message(data):
    message_id = data["message_id"]
    new_body = data["new_body"]
    room = data["room"]

    message = db.session.get(Channel_Message, message_id)
    if message:
        message.body = new_body
        db.session.commit()
        emit("message_updated", {
            "message_id": message_id,
            "new_body": new_body
        }, to=room, broadcast=True)
 
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
