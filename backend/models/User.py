from extension import db
from models.UserRole import UserRole  # Importing the Enum for roles
from models.UserDetails import UserDetails  # Correcting the typo here (UserDetails instead of UseerDetails)
from models.Product import Product  # Importing the Product model
from models.ProductComment import ProductComment  # Importing the ProductComment model

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.CUSTOMER)
    user_details = db.relationship('UserDetails', backref='users', uselist=False, cascade="all, delete-orphan")
    product = db.relationship("Product", backref="users", cascade="all, delete-orphan")
    product_comments = db.relationship("ProductComment", backref="users", cascade="all, delete-orphan")
    cart=db.relationship("Cart", backref="users", cascade="all, delete-orphan")
    def __repr__(self):
        return f'<User {self.username}, Role: {self.role.value} , id:{self.id}>'

    def is_seller(self):
        return self.role == UserRole.SELLER
    
    def is_admin(self):
        return self.role == UserRole.ADMIN
    
    def is_customer(self):
        return self.role == UserRole.CUSTOMER
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role.value,
            "user_details": self.user_details.to_dict() if self.user_details else None
        }
