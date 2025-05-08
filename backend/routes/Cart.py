from flask import Blueprint, request, jsonify
from extension import db, bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, get_jwt
from models.Cart import Cart
from models.CartItem import CartItem
from models.Product import Product
cart_bp = Blueprint('cart', __name__)


@cart_bp.route("", methods=["POST"])
@jwt_required()
def add_to_cart():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']

        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()
        
      
        data = request.get_json()
        print(data)
        product_id = data['product_id']
        quantity = data['product_quantity']

        if exist_cart_item := CartItem.query.filter_by(
            cart_id=cart.cart_id, product_id=product_id
        ).first():
            exist_cart_item.quantity += 1
        else:
            cart_item = CartItem(
                cart_id=cart.cart_id,
                product_id=product_id,
                quantity=quantity
            )
            cart.cart_details.append(cart_item)

        db.session.commit()

        return jsonify({"message": "Product has been added to Cart"}), 200


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)}), 500



@cart_bp.route("", methods=["GET"])
@jwt_required()
def view_cart():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']

        # Fetch the cart for the user
        cart = Cart.query.filter_by(user_id=user_id).first()
        
        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()


        # Fetch all cart items for the user's cart
        cart_items = CartItem.query.filter_by(cart_id=cart.cart_id).all()


        if not cart_items:
            return jsonify({
                "message": "No items found in the Cart",
                "cart_items": []   # Always return cart_items key
            }), 200

        cart_list = []
        
        for item in cart_items:
            product = Product.query.filter_by(product_id=item.product_id).first()
            if not product:
                continue  # Skip if the product is deleted or not found (important for consistency)

            # Access product details to get the description
            product_details = product.product_details# Assuming relationship exists for ProductDetails
            product_image=product.product_image
            
            cart_temp = {
                'product_id': product.product_id,
                'cart_item_id':item.cart_item_id,
                'name': product.name,
                'price': product.price,
                'quantity': item.quantity,
                'description': product_details.detailed_description, # Accessing detailed description
                'cart_image':[image.image_url for image in product_image]
            }
            cart_list.append(cart_temp)
        
        return jsonify({"message": "Successfully fetched the Cart", "cart_items": cart_list}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)}), 500


@cart_bp.route("/<int:cart_item_id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(cart_item_id):
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        
        # Find the cart item
        cart_item = CartItem.query.filter_by(cart_item_id=cart_item_id).first()
        
        if not cart_item:
            return jsonify({"message": "Cart item not found"}), 404
        
        # Deleting the cart item
        db.session.delete(cart_item)
        db.session.commit()
        
        return jsonify({"message": "Cart item deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)}), 500
    
@cart_bp.route("/<int:cart_item_id>", methods=["PUT"])
@jwt_required()
def update_cart_item(cart_item_id):
    try:
        user_id = get_jwt()['sub']['id']

        # Step 1: Find the cart that belongs to the user
        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            return jsonify({"message": "Cart not found"}), 404

        # Step 2: Find the cart item in that cart
        cart_item = CartItem.query.filter_by(cart_item_id=cart_item_id, cart_id=cart.cart_id).first()
        if not cart_item:
            return jsonify({"message": "Cart item not found"}), 404

        data = request.get_json()
        new_quantity = data.get("quantity")
        if new_quantity <= 0:
            return jsonify({"message": "Quantity must be greater than 0"}), 400

        cart_item.quantity = new_quantity
        db.session.commit()

        return jsonify({"message": "Cart item updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Error", "message": str(e)}), 500
