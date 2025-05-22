from flask import Blueprint, jsonify
from ..models import db, Server
from flask_login import current_user, login_required


delete_server = Blueprint("delete", __name__)


@delete_server.route(f"/<int:id>", methods=["DELETE"])
@login_required
def delete_a_server(id):

    server_to_delete = Server.query.get(id)

    if server_to_delete is None:
        return jsonify({"error": "Server not found"})
    # if server_to_delete.owner_id != current_user.id:
    #     return jsonify({"error": "Server can only be deleted by server owner"})

    db.session.delete(server_to_delete)
    db.session.commit()

    return jsonify({"message": "Server deleted"})
