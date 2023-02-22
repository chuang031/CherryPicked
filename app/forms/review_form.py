from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    stars = IntegerField("Stars", validators= NumberRange(min=1, max=5))
    imageUrl = StringField('Image Url',validators=[DataRequired(), URL( message='This is not a valid image link, make sure you enter the entire image URL')])