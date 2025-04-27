from flask import Flask
from config.config import Config, TestConfig
from extension import db, bcrypt, jwt
from flask_cors import CORS  # <-- import CORS

def createApp(config_class=Config):
    app = Flask(__name__)  # Create the Flask app using the factory function
    app.config.from_object(config_class)  # Load config based on argument passed
    # Initialize the extensions with the app
    db.init_app(app)   # Initialize the database with the app
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)  # <-- Add CORS initialization here (Allow all origins)
    
    # Register blueprints
    from routes.Auth import auth_bp
    from routes.Product import product_bp
    from routes.User import user_bp
    from routes.Cart import cart_bp
    from routes.Order import order_bp
    
    app.register_blueprint(auth_bp, url_prefix="/api/v1/auths")
    app.register_blueprint(user_bp, url_prefix="/api/v1/users")
    app.register_blueprint(product_bp, url_prefix='/api/v1/products')
    app.register_blueprint(cart_bp, url_prefix='/api/v1/carts')
    app.register_blueprint(order_bp, url_prefix='/api/v1/orders')
    
    # Create all tables within the app context
    with app.app_context():
        db.create_all()
        
    return app

if __name__ == '__main__':
    app = createApp() 
    app.run(debug=True)
