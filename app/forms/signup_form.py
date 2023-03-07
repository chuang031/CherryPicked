from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName')
    lastName = StringField('lastName')
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(),Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message="Password must be between 6 to 20 characters long." )])
    brandName = StringField('brandName')
    is_brand = BooleanField('is_brand')