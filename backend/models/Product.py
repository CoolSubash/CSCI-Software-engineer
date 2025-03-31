
from extension import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_details = db.relationship('ProductDetail', backref="products", uselist=False, cascade='all, delete-orphan', lazy=True)
    product_image = db.relationship('ProductImage', backref='products', cascade='all, delete-orphan', lazy=True)
    product_comment = db.relationship('ProductComment', backref='products', cascade='all, delete-orphan', lazy=True)
    cart_items = db.relationship('CartItem', backref='products', lazy=True, cascade="all, delete-orphan")
    # Define a method to convert the model into a dictionary
    def to_dict(self):
        return {
            'product_id': self.product_id,
            'name': self.name,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'seller_id': self.seller_id,
            'product_details': self.product_details.to_dict()  if self.product_details else None,
            'product_image': [image.to_dict() for image in self.product_image] if self.product_image else None,
            'product_comment': [comment.to_dict() for comment in self.product_comment] if self.product_comment else None,
        }
    
    def __repr__(self):
        return f'<Product {self.name} {self.product_details} {self.product_image} >'