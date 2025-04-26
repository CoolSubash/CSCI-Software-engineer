from extension import db
from datetime import datetime
from enum import Enum


class OrderStatus(Enum):
    PENDING = "Pending"
    SHIPPED = "Shipped"
    DELIVERED = "Delivered"
    CANCELED = "Canceled"
    COMPLETED="Completed"

class CustomerOrder(db.Model):
    
    __tablename__ = "orders"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    order_status = db.Column(db.Enum(OrderStatus), default=OrderStatus.PENDING, nullable=False)
    
    order_items = db.relationship('OrderItem', backref='orders', cascade="all, delete-orphan")
    
    def calculate_total_price(self):
        self.total_price = sum(item.product.price * item.quantity for item in self.order_items)

    def __repr__(self):
        return f"<Order {self.id} | User {self.user_id} | Total Price {self.total_price} | Created At {self.created_at}>"


    