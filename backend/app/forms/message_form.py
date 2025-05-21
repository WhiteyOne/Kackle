from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    body = StringField('Message', validators=[DataRequired(), Length(max=300)])
    channel_id = IntegerField('Channel', validators=[DataRequired()])
