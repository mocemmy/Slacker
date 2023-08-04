from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditUserForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    bio = StringField('bio')
    profile_pic = StringField('profile_pic')
