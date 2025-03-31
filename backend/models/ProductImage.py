from extension import db
from datetime import datetime
class ProductImage(db.Model):
    __tablename__ = 'product_images'

    image_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)  # FK to Product
    image_url = db.Column(db.String(255), nullable=False)  # URL or path to the image
    image_alt_text = db.Column(db.String(255), nullable=True)  # Optional alt text for the image

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    

    def __repr__(self):
        return f'<ProductImage {self.image_id}>'
    
    def to_dict(self):
        return {
            'image_id': self.image_id,
            'product_id': self.product_id,
            'image_url': self.image_url,
            'image_alt_text': self.image_alt_text,
            'created_at': self.created_at
        }
        
