from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class ServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    serverPic = StringField('Server pic', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    isPublic = BooleanField('Public', validators=[DataRequired()])
