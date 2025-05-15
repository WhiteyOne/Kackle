from flask import Blueprint, jsonify, render_template
from flask_login import login_required, current_user
from ..models import db, User

@server_routes.route('/<SERVERID>', methods=['PUT'])
def server_edit(server_id):
    server = Server.query.get(server_id)
    data = request.json

    server.name = data['name']
    db.session.commit()
    return server.to_dict()  