from flask import Blueprint, jsonify
from app.models import db, Server
from flask_login import current_user, login_required



delete_server = Blueprint('delete', __name__)



# Delete Server Route

@delete_server.route('/servers/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    deleted_server = Server.query.filter_by(id=server_id).first()

    if deleted_server is None:
        return jsonify({'error': 'Server not found'})
    if deleted_server.owner_id != current_user.id:
        return jsonify({'error': 'Server can only be deleted by server owner'})
    
    db.session.delete(deleted_server)
    db.session.commit()

    return jsonify({'message': 'Server deleted'})
