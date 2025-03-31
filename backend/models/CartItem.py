from extension import db
class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    cart_item_id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.cart_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            'cart_item_id': self.cart_item_id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }

