from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(20), nullable=True, unique=True)
    lastName = db.Column(db.String(20), nullable=True, unique=True)
    about= db.Column(db.String(500),nullable = True, default='')
    imageUrl = db.Column(db.String(1500), nullable = True)
    brandName = db.Column(db.String(20), nullable=True, unique=True)
    is_brand = db.Column(db.Boolean, nullable=False, unique=False, default= False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.is_brand == True:
            return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'brandName': self.brandName,
            'imageUrl': self.imageUrl
            } 
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'about': self.about,
            'imageUrl':self.imageUrl,
            'username': self.username,
            'email': self.email,
        }
