from extension import db


class Cart(db.Model):
    __tablename__ = 'carts'
    
    cart_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationship to CartItem (One Cart -> Many CartItems)
    cart_details = db.relationship('CartItem', backref='carts', lazy=True, cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'cart_id': self.cart_id,
            'user_id': self.user_id,
            'cart_details': [item.to_dict() for item in self.cart_details]
        }
    