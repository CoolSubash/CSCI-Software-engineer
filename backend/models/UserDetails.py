from extension import db

class UserDetails(db.Model):
    __tablename__ = 'user_details'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(50), nullable=True)
    zip_code = db.Column(db.String(20), nullable=True)
   

    def __repr__(self):
        return f'<UserDetails {self.first_name} {self.last_name}>'
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "address": self.address,
            "country": self.country,
            "city": self.city,
            "zip_code": self.zip_code
        }

