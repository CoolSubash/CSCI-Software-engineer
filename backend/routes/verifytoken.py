import jwt

access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MjQxNDY0MiwianRpIjoiNTI2NGJlZTgtNjUxZi00ZDExLWI5NmYtM2NiY2ZlZDdkNTY2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6Mywicm9sZSI6IkN1c3RvbWVyIn0sIm5iZiI6MTc0MjQxNDY0MiwiY3NyZiI6IjUwMzMzMWEyLTVkODQtNGY4Ni1iYWJmLTkwZDE5ZTJjNWE3NyIsImV4cCI6MTc0MjQxODI0Mn0.eyW6LvpU7u5wsQQAyLXcD8bnac9xKBDM_BElmPlkWZ0"  # Paste the JWT token here
secret_key = "America2022@"  # Use the same key as in your Flask app

try:
    
    decoded = jwt.decode(access_token, secret_key, algorithms=["HS256"])
    print("Token is valid:", decoded)
except jwt.ExpiredSignatureError:
    print("Token has expired")
except jwt.InvalidTokenError:
    print("Token is invalid")
