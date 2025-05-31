# from flask import Blueprint, jsonify, render_template, request
# from flask_login import login_required, current_user
# from ..models import db, Channel_Message
# from app.forms.message_form import MessageForm 


# messages_routes = Blueprint("messages", __name__)


# <<<<<<< HEAD
# @messages_routes.route("/<int:server_id>/channel/<int:channel_id>/messages", methods=["GET"])
# @login_required
# def get_channel_messages(channel_id):
#     messages = Channel_Message.query.filter_by(channel_id=channel_id).all()
#     return jsonify([message.to_dict() for message in messages])
# =======
# # @messages_routes.route("/<int:server_id>/channel/<int:channel_id>/messages", methods=["GET"])
# # @login_required
# # def get_channel_messages(server_id, channel_id):
# #     messages = Channel_Message.query.filter_by(channel_id=channel_id).all()
# #     return jsonify([message.to_dict() for message in messages])
# >>>>>>> 2bba975c880c979e4c31ae5a1652fd3dd72c5332


# # ---- Create Message ---- 
# @messages_routes.route("/<int:server_id>/channel/<int:channel_id>/messages", methods=["POST"])
# @login_required
# def create_channel_message(server_id, channel_id):

#     form = MessageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         new_message = Channel_Message(
#             body=form.body.data,
#             user_id=current_user.id,
#             channel_id=channel_id

#         )
#         db.session.add(new_message)
#         db.session.commit()
#         return new_message.to_dict()

#     return {"errors": form.errors}, 400

# # ---- Update Message ----
# @messages_routes.route("/<int:id>", methods=["PUT"])
# @login_required
# def update_channel_message(id):
#     message = Channel_Message.query.get(id)
#     if not message:
#         return jsonify({"error": "Message not found."}), 404

#     if message.user_id != current_user.id:
#         return jsonify({"error": "Who Are You!?"}), 403

#     form = MessageForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         message.body = form.body.data
#         db.session.commit()
#         return message.to_dict()

#     return {"errors": form.errors}, 400

# # ---- Delete Message ----

# @messages_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
# def delete_channel_message(id):
#     message = Channel_Message.query.get(id)
#     if not message:
#         return jsonify({"error": "Message not found."}), 404

#     if message.user_id != current_user.id:
#         return jsonify({"error": "Who Are You!?"}), 403

#     db.session.delete(message)
#     db.session.commit()
#     return jsonify({"message": "Message deleted successfully."}), 200
