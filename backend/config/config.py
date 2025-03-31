class Config:
    # Directly pass the database URI
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/ecommerce'  # Set the actual database URL directly
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'America2022@'  # Directly set your secret key
    # Email Configuration for Flask-Mail
   