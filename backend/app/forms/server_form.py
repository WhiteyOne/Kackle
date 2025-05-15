from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def validate_server(form, field):
    #Checking if server already exists and has a name
    server_name = field.data
    server_exists = Server.query.filter(Server.name == server_name).first()

    if server_exists:
        raise ValidationError('This server already exists')
    
    if not server_name.strip():
        raise ValidationError('Server must have a name')
    
    

class CreateServer(FlaskForm):
    server_name = StringField('Server Name', validators=[DataRequired(), validate_server])
    is_private = BooleanField('Private:', validators=[DataRequired()])
    submit = SubmitField("Submit")

