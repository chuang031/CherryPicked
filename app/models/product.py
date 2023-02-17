from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    detail= db.Column(db.String(255))
    price= db.Column(db.Integer)
    url= db.Column(db.String(1500))
    imageUrl= db.Column(db.String(1500))
    brandId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
 
    
    def __repr__(self):
        return f'<Product Id: {self.id}, brandId: {self.brandId}, detail: {self.detail}, price: {self.price}, url: {self.url}, imageUrl: {self.imageUrl}>'
  
    def to_dict(self):
            return {
                'id': self.id,
                'brandId': self.brandId,
                'detail': self.detail,
                'price': self.price,
                'url': self.url,
                'imageUrl': self.imageUrl,
            }