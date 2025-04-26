from flask import Blueprint, request, jsonify
from models.User import User
from models.UserRole import UserRole
from models.UserDetails import UserDetails
from extension import db, bcrypt
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
import secrets
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    
    """Registers a new user.

    This endpoint handles user registration, validating input, creating user records in the database,
    and returning a success or error message. It assumes the existence of `User` and `UserDetails`
    database models.
     
    """
    
    
    data = request.get_json()
   

    try:
        # Extract user-related data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'Customer')  # Default role is 'Customer'
        
        # Extract user details-related data
        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        address = data.get('address')
        country = data.get('country')
        city = data.get('city')
        zip_code = data.get('zip_code')

        
        
        # Validate the role
        try:
            role = UserRole(role)  # Convert role string to Enum
        except ValueError:
            return jsonify({"error": "Invalid role. Valid roles are: Customer, Seller, Admin."}), 400
        
        # Check if username, email, or phone number already exists
        
        existing_user = User.query.outerjoin(UserDetails).filter(or_(
            User.username == username,
            User.email == email,
            UserDetails.phone_number == phone_number
        )).first()
        
        
        
        if existing_user:
            if existing_user.username == username:
                return jsonify({"message": "Username already exists."}), 409
            if existing_user.email == email:
                return jsonify({"message": "Email already exists."}), 409
            if existing_user.user_details and existing_user.user_details.phone_number == phone_number:
                return jsonify({"message": "Phone number already exists."}), 409

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new User
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            role=role  # Already converted to Enum instance
        )
        
        # Create new UserDetails
        new_user_details = UserDetails(
            first_name=first_name,
            middle_name=middle_name,
            last_name=last_name,
            phone_number=phone_number,
            address=address,
            country=country,
            city=city,
            zip_code=zip_code
        )
        
        new_user.user_details=new_user_details

        # Add and commit the user and user details to the database
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User registered successfully!"}), 201

    except IntegrityError:
        db.session.rollback()  # Rollback the transaction if there is an IntegrityError
        return jsonify({"error": "Database integrity error. Please check your input values."}), 500
    except Exception as e:
        db.session.rollback()  # Rollback for any other exceptions
        return jsonify({"error": str(e)}), 500
    
    
    
    
    
# Route to generate and send OTP to user's email




@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    try:
        otp_entered = data.get('otp')
        if 'otp' not in session or 'otp_expiry' not in session:
            return jsonify({"error": "OTP has expired or is missing."}), 400
        
        otp_stored = session['otp']
        otp_expiry = session['otp_expiry']
        if otp_entered != otp_stored:
            return jsonify({"error": "Invalid OTP."}), 400
        
        if datetime.utcnow() > otp_expiry:
            return jsonify({"error": "OTP has expired."}), 400
        
        # OTP is valid, now generate JWT or session token and log the user in
        access_token = create_access_token(identity=str(user.id),additional_claims={"role": user.role.value})
        return jsonify({
            "message": "Login successful!",

            "access_token": access_token
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data=request.get_json()
    print(data)
    try:
        # Extract login credentials
        username_or_email = data.get('username_or_email')
        
        password = data.get('password')
        # Check if username exists
        user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
        print(user)
        
        
        if not user:
            return jsonify({"error": "Invalid username or password."}), 401

        # Check if the password is correct
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Invalid password."}), 401
        
        
         # OTP is valid, now generate JWT or session token and log the user in
        
        access_token = create_access_token(identity={"id": user.id, "role": user.role.value},expires_delta=timedelta(hours=1))
        return jsonify({
            "message": "Login successful!",
            "user_id":user.id,
            "role":user.role.value,
            "access_token": access_token
        }), 200
        
        
        # otp = secrets.token_hex(4)  # Generate 8-character OTP
        # session['otp'] = otp
        # session['otp_expiry'] = datetime.utcnow() + timedelta(minutes=5)

        # # Send OTP to the user's email
        # msg = Message('Your OTP Code', recipients=[user.email])
        # msg.body = f'Your OTP code is: {otp}'
        
        # try:
        #     mail.send(msg)
        #     return jsonify({"message": "OTP sent to email. Please check your inbox."}), 200
        # except Exception as e:
        #     return jsonify({"error": f"Failed to send OTP: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
