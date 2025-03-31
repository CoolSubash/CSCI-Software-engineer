from flask import Flask

from config.config import Config
from extension import db, bcrypt, jwt


def createApp():
    app = Flask(__name__)
    app.config.from_object(Config)
    # Initialize the extensions with the app
    db.init_app(app)   # Initialize the database with the app
    bcrypt.init_app(app)
    jwt.init_app(app)
    # Initialize bcrypt with the app
    from routes.Auth import auth_bp
    from routes.Product import product_bp
    from routes.User import user_bp
    from routes.Cart import cart_bp
    from routes.Order import order_bp

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/v1/auths")
    app.register_blueprint(user_bp, url_prefix="/api/v1/users")
    app.register_blueprint(product_bp, url_prefix='/api/v1/products')
    app.register_blueprint(cart_bp, url_prefix='/api/v1/carts')
    app.register_blueprint(order_bp, url_prefix='/api/v1/orders')
    with app.app_context():
        db.create_all()  # Create tables within the app context
    return app  # Return the app object so it can be used outside this function

# Only run the app if this file is executed directly
if __name__ == '__main__':
    app = createApp() 
    
    app.run(debug=True)  # Run the app with debug mode enabled
