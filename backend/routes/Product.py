from flask import Blueprint, request, jsonify
from models.Product import Product
from models.ProductDetail import ProductDetail
from models.ProductImage import ProductImage

from models.ProductComment import ProductComment
from models.User import User
from extension import db
from flask_jwt_extended import jwt_required, get_jwt


product_bp = Blueprint('product', __name__)

@product_bp.route('', methods=['POST'])
@jwt_required()
def add_products():
    try:
        # Parse the product data from the request
        product_data = request.get_json()
        
        # Extract claims from JWT
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']

        # Check if the user is a seller
        if user_role != 'Seller':
            return jsonify({
                "error": "Unauthorized",
                "message": "Only sellers can add products."
            }), 403
        
        # Query the User model to find the user
        user_check = User.query.filter_by(id=user_id).first()
        

        # If user doesn't exist, return 404 error
        if not user_check:
            return jsonify({
                "error": "Not Found",
                "message": "User not found."
            }), 404

        # Create a new product instance
        new_product = Product(
            name=product_data['name'],
            price=product_data['price'],
            seller_id=user_check.id  # Ensure you're using seller_id, not 'user'
        )
       
    

        # Add product details (if provided)
       
        
        new_product_details=ProductDetail(
            detailed_description=product_data.get('product_details'),
            quantity=product_data.get('quantity')
        )
        new_product.product_details=new_product_details

        # Add product images (if provided)
        product_images = product_data.get('product_images')
        if product_images:
            for image in product_images:
                new_image = ProductImage(
                    image_url=image['url'], 
                    image_alt_text=image.get('alt_text', '')
                )
                new_product.product_image.append(new_image)

        # Save the new product to the database
       
        db.session.add(new_product)
        db.session.commit()
        #  print(new_product.seller_id)
        # print(new_product)
        print(new_product)
        return jsonify({'message': 'Product added successfully!', 'product_id': new_product.product_id}), 201

    except Exception as e:
        # General error handler for unexpected issues
        db.session.rollback()  # Rollback any DB changes to maintain integrity
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e)
        }), 500



from flask import request
@product_bp.route('', methods=['GET'])
def get_all_products():
    try:
        search = request.args.get('search', '')

        if search:
            products = Product.query.filter(
                Product.name.ilike(f"%{search}%")
            ).order_by(Product.created_at.desc()).all()
        else:
            products = Product.query.order_by(Product.created_at.desc()).all()

        products_list = [product.to_dict() for product in products]

        return jsonify({
            "message": "Products fetched successfully",
            "products": products_list
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e)
        }), 500


@product_bp.route('/bestselling', methods=['GET'])
def get_bestselling_products():
    try:
        # Fetch products with price greater than 150 and order them by a "bestseller" criterion (e.g., rating or sales volume).
        bestselling_products = Product.query.filter(Product.price > 50).limit(7).all()
        
        bestselling_list = []
        for product in bestselling_products:
            bestselling_list.append(product.to_dict())
        
        return jsonify({"message": "Bestselling Products fetched successfully", "products": bestselling_list})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e)
        }), 500

@product_bp.route('/recent', methods=['GET'])
def get_recent_products():
    try:
        # Fetch the most recent 10 products based on the created date (assuming there's a 'created_at' field in Product).
        recent_products = Product.query.order_by(Product.created_at.desc()).limit(7).all()
        
        recent_list = []
        for product in recent_products:
            recent_list.append(product.to_dict())
        
        return jsonify({"message": "Recent Products fetched successfully", "products": recent_list})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e)
        }), 500


@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        product = Product.query.filter_by(product_id=product_id).first()
        if not product:
            return jsonify({"message": "Product Not Found"}), 404
        
        return jsonify({"product": product.to_dict()}), 200

    except Exception as e:
        return jsonify({"error": "Internal Error", "message": str(e)}), 500
    
    
    
@product_bp.route('/seller', methods=['GET'])
@jwt_required()
def get_seller_all_product():
    
    # Check if the user exists
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']
        user = User.query.filter_by(id=user_id).first()
        if user_role != "Seller":
            return jsonify({"error": "Unauthorized access", "message": "Only sellers can view their own products"}), 403
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Fetch products by filtering with seller_id
        products = Product.query.filter_by(seller_id=user_id).all()

        # If no products found for the given seller_id
        if not products:
            return jsonify({"message": "There is No product for you"}), 404

        # Serialize the product data if found
        product_list = [product.to_dict() for product in products]
        
        

        return jsonify({"products": product_list}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)})


@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product_by_id(product_id):
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']
        product=Product.query.filter_by(product_id=product_id).first()
        if not product:
            return jsonify({"message":"Product Not found"}),404

        if user_role == "Seller" and  product.seller_id == user_id:
            db.session.delete(product)
            db.session.commit()
            return jsonify({"message":"Product Deleted Successfully"}),200
            
            
        return jsonify({'error':"Unauthorized access","message":"You are only allowed to delete your product"}),403
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)})
        
        
    

@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()  
def update_product(product_id):
    
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']
        
        product=Product.query.filter_by(product_id=product_id).first()
        if not product:
            return jsonify({"message":"Product Not found"}),404

        if user_role == "Seller" and  product.seller_id == user_id:
            data = request.get_json()
            product.name = data["name"]
            product.price = data["price"]
            product.product_details.detailed_description = data["detailed_description"]
            product.product_details.quantity = data["quantity"]
            for image in product.product_image:
                db.session.delete(image)
                
            for image_data in data["product_images"]:
                new_image = ProductImage(
                    product_id=product.product_id,
                    image_url=image_data["image_url"],
                    image_alt_text=image_data.get("image_alt_text")
                )
                db.session.add(new_image)
            db.session.commit()
            return jsonify({"message":"Product Updated  Successfully"}),200
        
        return jsonify({"message": "You are not authorized to update this product"}), 403
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)})
    
@product_bp.route('/<int:product_id>/comments', methods=['POST'])
@jwt_required()  
def add_comment(product_id):
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']
        
        product=Product.query.filter_by(product_id=product_id).first()
        if not product:
            return jsonify({"message":"Product Not found"}),404
        
        if product.seller_id == user_id:
            return jsonify({"message":"You are not authorized to comment in your product"}),403

        data = request.get_json()
        
        product_comment = ProductComment(
            product_id=product_id,
            user_id=user_id,
            comment_text=data['comment_text'],
            rating=data['rating']
        )
        
        # Add to the session and commit
        db.session.add(product_comment)
        db.session.commit()
            
        return jsonify({"message":"Comment Added   Successfully"}),200
        
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)})


@product_bp.route('/comments/<int:comment_id>', methods=['PUT'])
@jwt_required()  
def update_comment(comment_id):
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        
        comment = ProductComment.query.filter_by(comment_id=comment_id, user_id=user_id).first()
        if not comment:
            return jsonify({"message": "Comment not found or not authorized"}), 404
        
        data = request.get_json()
        comment.comment_text = data['comment_text']
        comment.rating = data['rating']
        
        db.session.commit()
        
        return jsonify({"message": "Comment updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)})

@product_bp.route('/comments/<int:comment_id>', methods=['DELETE'])
@jwt_required()  
def delete_comment(comment_id):
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        
        comment = ProductComment.query.filter_by(comment_id=comment_id, user_id=user_id).first()
        if not comment:
            return jsonify({"message": "Comment not found or not authorized"}), 404
        
        db.session.delete(comment)
        db.session.commit()
        
        return jsonify({"message": "Comment deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)})


@product_bp.route('/comments/<int:product_id>', methods=['GET'])
def get_comments_for_product(product_id):
    try:
        comments = ProductComment.query.filter_by(product_id=product_id).order_by(ProductComment.created_at.desc()).all()
        comment_list = []

        for comment in comments:
            comment_data = {
                "comment_id": comment.comment_id,
                "content": comment.content,
                "created_at": comment.created_at,
                "user": {
                    "user_id": comment.user.user_id,
                    "username": comment.user.username
                }
            }
            comment_list.append(comment_data)

        return jsonify({"comments": comment_list}), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
