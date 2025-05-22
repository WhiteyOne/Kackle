from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from ..models import Server


def validate_server(form, field):
    # Checking if server already exists and has a name
    server_name = field.data
    server_exists = Server.query.filter(Server.name == server_name).first()

    if server_exists:
        raise ValidationError("This server already exists")

    if not server_name.strip():
        raise ValidationError("Server must have a name")


class CreateServer(FlaskForm):
    name = StringField("Server Name", validators=[DataRequired(), validate_server])
    submit = SubmitField("Submit")
