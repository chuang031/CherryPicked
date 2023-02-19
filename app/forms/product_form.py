from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL

class ProductForm(FlaskForm):

    title =  StringField('Title',validators=[DataRequired()])
    detail = StringField('Details',validators=[DataRequired()])
    price = IntegerField("Price")
    url = StringField('Url', validators=[DataRequired(), URL( message='This is not a valid link, make sure you enter the entire URL')])
    imageUrl = StringField('Image Url',validators=[DataRequired(), URL( message='This is not a valid image link, make sure you enter the entire image URL')])

