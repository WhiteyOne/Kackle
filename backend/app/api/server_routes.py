from flask import Blueprint, jsonify, render_template
from flask_login import login_required, current_user
from ..models import db, User
from ..forms import CreateServer

server_routes = Blueprint('servers', __name__)


""" Create Server """
@server_routes.route('/create-server', methods=['POST'])
@login_required
def create_server():
    form = CreateServer()
    if form.validate_on_submit():
        new_server = Server(name=form.server_name.data, is_private=form.is_private.data, owner_id=current_user.id)
        db.session.add(new_server)
        db.session.commit()

        new_server.users_append(current_user)
        db.session.commit()
        
        return jsonify(new_server.to_dict())
    
    return jsonify({'errors': form.errors})


@server_routes.route('/<SERVERID>', methods=['PUT'])
def server_edit(server_id):
    server = Server.query.get(server_id)
    data = request.json

    server.name = data['name']
    db.session.commit()
    return server.to_dict()  