from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, db
from ..models import Channel_Message_Reaction
reaction_routes = Blueprint("reactions", __name__)


# # ------------------GET-------------------
@reaction_routes.route("/<int:id>/reaction", methods=["GET"])
@login_required
def channel_reactions(id):

    reactions = Channel_Message_Reaction.query.filter_by(channel_message_id=id).all()
    react = [react.to_dict() for react in reactions]
    return react


@reaction_routes.route("/<int:id>/reaction", methods=["POST"])
@login_required
def channel_reactions_reactor(id):
    if not current_user.id:
        return jsonify(
            {
                "error: Have you tried the password GIGGLES? hmmm I wonder if it's case sensitive..."
            }
        )
    channel_filter = Channel_Message_Reaction.query.filter_by(
        channel_message_id=id, user_id=current_user.id
    )
    # print(channel_filter.to_dict(), "😃😃😃😃😃😃")
    # if channel_filter:
    #     return jsonify({"Error": "You have already giggled along with this message 😭"})

    data = request.get_json()

    if data is None:
        return jsonify({"error: you're body must contain valid JSON Values"})
    emoji = data["emoji"]

    if len(emoji) > 1:
        return jsonify({"Error": "you can only submit one emoji at a time"})

    new_reaction = Channel_Message_Reaction(
        channel_message_id=id, emoji=emoji, user_id=current_user.id
    )
    db.session.add(new_reaction)
    db.session.commit()
    return jsonify(new_reaction.to_dict()), 201


# @reaction_routes.route("/reaction/<int:id>", methods=["DELETE"])
# @login_required
# def remove_emoji(message_id, reaction_id):
#     data = request.get_json()
#     channel_filter = Channel_Message_Reaction.query.filter_by(
#         channel_message_id=message_id, user_id=current_user.id
#     )
    # if not channel_filter:
    #     return jsonify(
    #         {"Error": "You have not already giggled along with this message 😭"}
    #     )

    # reaction_to_delete = Channel_Message_Reaction.query.get(reaction_id)

    # if not reaction_to_delete:
    #     return jsonify({"Error": "This reaction doesn't exsist"})
    # db.session.delete(reaction_to_delete)
    # db.session.commit()
    # return jsonify({"Message": "Your emoji has been incinerated"}), 200

@reaction_routes.route("/<int:id>/reaction", methods=["DELETE"])
@login_required
def delete_reaction(id):
    reaction = Channel_Message_Reaction.query.get(id)
    if not reaction:
        return jsonify({"error": "Reaction not found."}), 404

    if reaction.user_id != current_user.id:
        return jsonify({"error": "Who Are You!?"}), 403

    db.session.delete(reaction)
    db.session.commit()
    return jsonify({"message": "Reaction deleted successfully."}), 200