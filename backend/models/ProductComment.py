
from extension import db
from datetime import datetime

class ProductComment(db.Model):
    __tablename__ = 'product_comments'

    comment_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)  # FK to Product
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # FK to User (comment author)
    comment_text = db.Column(db.Text, nullable=False)  # The comment text from the user
    rating = db.Column(db.Integer, nullable=True)  # Optional rating (1-5 stars or a custom rating scale)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    

    def __repr__(self):
        return f'<ProductComment {self.comment_id}>'
    
    def to_dict(self):
        return {
            'comment_id': self.comment_id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'comment_text': self.comment_text,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
