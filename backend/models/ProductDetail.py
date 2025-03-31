from extension import db
from datetime import datetime
class ProductDetail(db.Model):
    __tablename__ = 'product_details'

    product_details_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)  # FK to Product
    detailed_description = db.Column(db.Text, nullable=True)  # More detailed product description
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    quantity=db.Column(db.Integer, default=0)
    


    def __repr__(self):
        return f'<ProductDetails {self.product_id}>'
    
    def to_dict(self):
        return {
            'product_details_id': self.product_details_id,
            'detailed_description': self.detailed_description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'quantity': self.quantity,
        }