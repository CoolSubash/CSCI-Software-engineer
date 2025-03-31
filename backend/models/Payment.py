
from extension import db
from datetime import datetime

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    payment_id = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String(50), default="pending")  # For tracking payment status (e.g., pending, completed)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref='payments')
    order = db.relationship('CustomerOrder', backref='payments') 