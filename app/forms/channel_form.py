from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    server_id = IntegerField('Server Id', validators=[DataRequired()])
    created_by = IntegerField('Created By', validators=[DataRequired()])
    description = StringField('Description')
