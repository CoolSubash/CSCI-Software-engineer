from flask import Blueprint, request, jsonify
from extension import db, bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, get_jwt
from models.CustomerOrder import CustomerOrder
from models.OrderItem import OrderItem
from models.Product import Product
from models.CustomerOrder import OrderStatus
import stripe
import os
from sqlalchemy.orm import joinedload
order_bp = Blueprint('order', __name__)

from models.Payment import Payment
stripe.api_key=os.environ.get("stripe_api_key")



# place order
@order_bp.route("/place",methods=["POST"])
@jwt_required()
def place_order():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        user_role = claims['sub']['role']
        
        data=request.get_json()
        order_items_data=data.get("items",[])
        total_price=data["total_price"]
        #  Storing Model of Order
        order_items_list=[]
        print(order_items_data)
        
        for order in order_items_data:
            product=Product.query.filter_by(product_id=order['product_id']).first()
            if not product:
                return jsonify({"message": f"Product {item['product_id']} not found"}), 404
            price=order['quantity'] * order['price']
            order_items_list.append(OrderItem(product_id=order['product_id'],quantity=order['quantity'],price=price))
        
        try:
                payment_intent = stripe.PaymentIntent.create(
                    amount=int(total_price * 100),  # Convert to cents
                    currency="usd",
                    payment_method=data.get("payment_method_id"),
                    confirm=True,  # Confirm the payment immediately
                    automatic_payment_methods={
                        "enabled": True,
                        "allow_redirects": "never"  # Prevents redirect-based authentication
                    }
                )
        except stripe.error.StripeError as e:
                return jsonify({"message": "Payment failed", "error": str(e)}), 400
        # Validate PaymentIntent
        if not payment_intent or payment_intent.status != "succeeded":
            return jsonify({"message": "Payment failed"}), 400
        
        new_order=CustomerOrder(user_id=user_id,total_price = total_price, order_status=OrderStatus.PENDING)
        db.session.add(new_order)
        db.session.commit()
        
        for order_item in order_items_list:
            order_item.order_id = new_order.id
            db.session.add(order_item)
            
        payment = Payment(user_id=user_id, order_id=new_order.id, payment_id=payment_intent.id, amount=total_price,payment_status=OrderStatus.PENDING)
        db.session.add(payment)
        db.session.commit()
        return jsonify({"message": "Order placed successfully", "order_id": new_order.id})    

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal Error","message":str(e)}), 500


# get_user_order
@order_bp.route("/my-orders", methods=["POST"])
@jwt_required()
def get_user_all_order():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']

        orders = CustomerOrder.query.filter_by(user_id=user_id).all()

        if not orders:
            return jsonify({"message": "No orders found"}), 404

        order_list = []
        for order in orders:
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            items = []

            for item in order_items:
                product = Product.query.get(item.product_id)
                image_url = None

                if product and product.product_image:
                    image_url = product.product_image[0].image_url  # Using correct relationship

                items.append({
                    "product_id": product.product_id,
                    "product_name": product.name,
                    "image_url": image_url,
                    "quantity": item.quantity,
                    "price": item.price
                })

            order_list.append({
                "order_id": order.id,
                "total_price": order.total_price,
                "order_status": order.order_status.value,
                "items": items,
                "created_at": order.created_at
            })

        return jsonify(order_list), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# get_order_by_id
@order_bp.route("/<int:order_id>",methods=["GET"])
@jwt_required()
def get_order_by_id():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        order=CustomerOrder.query.filter_by(user_id=user_id,order_id=order_id).first()
        if not Order:
            return jsonify({"message":"No order Found"}),404
        
        
        
        order_items = OrderItem.query.filter_by(order_id=order_id).options(
            joinedload(OrderItem.product)  # Eagerly load the related Product data
        ).all()
        product_id=[order.product_id for order in order_items]
        print(product_id)
        
        # Serialize order items with related product info
        items = [{
            "order_item_id": item.order_item_id,
            "quantity": item.quantity,
            "price": item.price,
            "product_id": item.product.product_id,  # Access related Product's id
            "product_name": item.product.name,      # Access related Product's name
            "product_price": item.product.price,   # Access related Product's price
            "product_image":item.product.product_image
            
        } for item in order_items]

        return jsonify({
            "message": "Order items fetched successfully",
            "order_items": items
        }), 200

        

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal server Error","message":str(e)}),500



# Cancel Order
@order_bp.route("/<int:order_id>/cancel",methods=["POST"])
@jwt_required()
def cancel_order_by_id():
    try:
        claims = get_jwt()
        user_id = claims['sub']['id']
        order=Order.query.filter_by(order_id=order_id).first()
        if not Order:
            return jsonify({"message":"No order Found"}),404
        
        
        if order.order_status in [OrderStatus.SHIPPED, OrderStatus.DELIVERED]:
            return jsonify({"message": "Cannot cancel order that has been shipped or delivered"}), 400
            
        order.order_status = OrderStatus.CANCELED
        db.session.commit()
        return jsonify({"message": "Order canceled successfully"})

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":"Internal server Error","message":str(e)}),500
