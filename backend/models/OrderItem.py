
from extension import db
from datetime import datetime



class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)  # Links to Order
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)  # Links to Product
    quantity = db.Column(db.Integer, nullable=False, default=1)
    price=db.Column(db.Integer,nullable=False)
    product = db.relationship('Product', backref='order_items')  # Relationship to fetch product details

    def __repr__(self):
        return f"<OrderItem {self.id} | Product {self.product_id} | Quantity {self.quantity}>"
