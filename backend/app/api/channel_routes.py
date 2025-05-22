from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Server, db, Channel


channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/server/<int:server_id>/channels', methods=['GET'])
@login_required
def get_channels(server_id):
    server = Server.query.get(server_id)
    if not server:
        return jsonify({"error": "Server not found"}), 404

    # if server.user.id != current_user.id:
    #     return jsonify({"error": "You do not have permission to view channels on this server"}), 403

    channels = Channel.query.filter_by(server_id=server_id).all()
    return jsonify([channel.to_dict() for channel in channels]), 200


## temp to get messages to work copied from stephs branch