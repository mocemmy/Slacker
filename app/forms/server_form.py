from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class ServerForm(FlaskForm):
    name = StringField('Name', DataRequired())
    serverPic = StringField('Server pic', DataRequired())
    description = StringField('Description', DataRequired())
    isPublic = BooleanField('Public', DataRequired())
