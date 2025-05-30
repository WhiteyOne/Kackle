from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Server, db, Channel


channel_routes = Blueprint("channel", __name__)

# Create Channel


@channel_routes.route("/<int:server_id>/channel", methods=["POST"])
@login_required
def create_channel(server_id):

    server = Server.query.get(server_id)
    if not server:
        return jsonify({"error: Server not found"}), 404

    if server.owner_id != current_user.id:
        return (
            jsonify(
                {
                    "error: You must be the head giggler to create a channel on this server"
                }
            ),
            403,
        )

    data = request.get_json()

    if data is None:
        return jsonify({"error: Request body must be valid JSON"}), 400

    channel_name = data["name"]

    if len(channel_name) > 30:
        return jsonify({"error: Channel name must be less than 30 characters."}), 400

    channel_exists = Channel.query.filter_by(
        name=channel_name, server_id=server_id
    ).first()

    if channel_exists:
        return (
            jsonify(
                {
                    "error: A channel with this name already exists. Try a different joke."
                }
            ),
            400,
        )

    new_channel = Channel(
        name=data["name"], server_id=server_id, owner_id=current_user.id
    )
    db.session.add(new_channel)
    db.session.commit()
    return jsonify(new_channel.to_dict()), 201


# Read/Get All Channels
@channel_routes.route("/<int:server_id>/channel", methods=["GET"])
@login_required
def get_channels(server_id):

    server = Server.query.get(server_id)

    if not server:
        return jsonify({"error: Server not found"}), 404

    channels = Channel.query.filter_by(server_id=server_id).all()

    return jsonify([channel.to_dict() for channel in channels]), 200


# Read/Get A Single Channel
@channel_routes.route("/<int:server_id>/channel/<int:channel_id>", methods=["GET"])
@login_required
def get_one_channel(server_id, channel_id):

    server = Server.query.get(server_id)
    if not server:
        return jsonify({"error: Server not found"}), 404

    channel = Channel.query.get(channel_id)
    if not channel:
        return jsonify({"error: Channel not found"}), 404

    return jsonify(channel.to_dict()), 200


# Update Channel
@channel_routes.route("/<int:server_id>/channel/<int:channel_id>", methods=["PUT"])
@login_required
def update_channel(server_id, channel_id):
    server = Server.query.get(server_id)
    if not server:
        return jsonify({"error: Server not found"}), 404

    if server.owner_id != current_user.id:
        return (
            jsonify({"error: You must be the head giggler to update this channel."}),
            403,
        )

    data = request.get_json()

    channel = Channel.query.get(channel_id)
    if not channel:
        return jsonify({"error: Channel not found"}), 404

    channel.name = data["name"]
    db.session.commit()
    return jsonify(channel.to_dict()), 200


# Delete Channel
@channel_routes.route("<int:server_id>/channel/<int:channel_id>", methods=["DELETE"])
@login_required
def delete_channel(server_id, channel_id):
    print("here")
    server = Server.query.get(server_id)
    if not server:
        return jsonify({"error: Server not found"}), 404

    if server.owner_id != current_user.id:
        return (
            jsonify({"error: You must be the head giggler to delete this channel."}),
            403,
        )

    channel = Channel.query.get(channel_id)
    if not channel:
        return jsonify({"error: Channel not found"}), 404

    db.session.delete(channel)
    db.session.commit()
    return jsonify({"message": "Channel deleted successfully"}), 200
