from extension import db
from models.User import  User
from flask import Blueprint , jsonify
from flask_jwt_extended import jwt_required, get_jwt
user_bp= Blueprint('User',__name__)


@user_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
   
    try:
        claims=get_jwt()
        user_id_from_token = claims['sub']['id']
        user_role = claims['sub']['role']
        
        if user_role == 'Admin' or user_id_from_token == user_id:
            user_to_delete=User.query.filter_by(id=user_id).first()
            if not user_to_delete:
                return jsonify({"error":"User nor Found"}) , 404
            db.session.delete(user_to_delete)
            db.session.commit()
            

            return jsonify({"message": "User deleted successfully."}), 200
        
        return jsonify({"error":"Unauthorized access"}) , 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@user_bp.route('/<int:user_id>', methods=['UPDATE'])
@jwt_required()
def update_user(user_id):
    try:
        claims=get_jwt()
        user_id_from_token = claims['sub']['id']
        user_role = claims['sub']['role']
        if user_role == 'Admin' or user_id_from_token == user_id:
            user_to_update=User.query.filter_by(id=user_id).first()
            if not user_to_update:
                return jsonify({"error":"Not Found","message":"User Not Found"}) , 404
            
            user_details=user_to_update.user_details
            
            if not user_details:
                user_details = UserDetails(user_id=user_id)
                db.session.add(user_details)

            data = request.get_json()
            user_details.first_name = data.get('first_name', user_details.first_name)
            user_details.middle_name = data.get('middle_name', user_details.middle_name)
            user_details.last_name = data.get('last_name', user_details.last_name)
            user_details.phone_number = data.get('phone_number', user_details.phone_number)
            user_details.address = data.get('address', user_details.address)
            user_details.country = data.get('country', user_details.country)
            user_details.city = data.get('city', user_details.city)
            user_details.zip_code = data.get('zip_code', user_details.zip_code)

            db.session.commit()
            return jsonify({"message": "User details updated successfully!"}), 200
            
        return jsonify({"error":"Unauthorized access","message":"You can update your user only"}) , 403
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
        
    
            
        
    

@user_bp.route('', methods=['GET'])
@jwt_required()   
def get_all_users():
    
    try:
        claims=get_jwt()
        user_id_from_token = claims['sub']['id']
        user_role = claims['sub']['role']
        
        if user_role != "Admin":
            return jsonify({"error":"Unauthorized","message":"Only Admin is able to see all Users"}),403
        
        
        users=User.query.all()
        users_list=[user.to_dict() for user in users]
        
        return jsonify({"message":"Users fetch Successfully","users_list":users_list})
            
        
        
        
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)}),500
    
     
    
    