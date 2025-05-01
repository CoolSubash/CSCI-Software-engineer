
# Testing of Sign up 


def test_signup_success(client):
    payload = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "1234567890",
        "address": "123 Main St",
        "country": "Testland",
        "city": "Testville",
        "zip_code": "12345"
    }

    response = client.post('/api/v1/auths/signup', json=payload)
    assert response.status_code == 201
    assert response.json['message'] == 'User registered successfully!'


def test_signup_duplicate_username(client):
    # First signup
    client.post('/api/v1/auths/signup', json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "1234567890",
        "address": "123 Main St",
        "country": "Testland",
        "city": "Testville",
        "zip_code": "12345"
    })

    # Attempt duplicate username
    response = client.post('/api/v1/auths/signup', json={
        "username": "testuser",  # Same username
        "email": "different@example.com",
        "password": "password123",
        "first_name": "Jane",
        "last_name": "Smith",
        "phone_number": "0987654321",
        "address": "456 New St",
        "country": "Newland",
        "city": "Newcity",
        "zip_code": "67890"
    })

    assert response.status_code == 409
    assert response.json['message'] == 'Username already exists.'
    
def test_signup_duplicate_phone_number(client):
    # First signup
    client.post('/api/v1/auths/signup', json={
        "username": "uniqueuser1",
        "email": "unique1@example.com",
        "password": "password123",
        "first_name": "Sam",
        "last_name": "Taylor",
        "phone_number": "1112223333",
        "address": "111 First St",
        "country": "Oldland",
        "city": "Oldcity",
        "zip_code": "11111"
    })

    # Attempt signup with same phone number
    response = client.post('/api/v1/auths/signup', json={
        "username": "uniqueuser2",
        "email": "unique2@example.com",
        "password": "password123",
        "first_name": "Ella",
        "last_name": "Brown",
        "phone_number": "1112223333",  # Same phone number
        "address": "222 Second St",
        "country": "Newland",
        "city": "Newcity",
        "zip_code": "22222"
    })

    assert response.status_code == 409
    assert response.json['message'] == 'Phone number already exists.'


def test_signup_duplicate_phone_number(client):
    # First signup
    client.post('/api/v1/auths/signup', json={
        "username": "uniqueuser1",
        "email": "unique1@example.com",
        "password": "password123",
        "first_name": "Sam",
        "last_name": "Taylor",
        "phone_number": "1112223333",
        "address": "111 First St",
        "country": "Oldland",
        "city": "Oldcity",
        "zip_code": "11111"
    })

    # Attempt signup with same phone number
    response = client.post('/api/v1/auths/signup', json={
        "username": "uniqueuser2",
        "email": "unique2@example.com",
        "password": "password123",
        "first_name": "Ella",
        "last_name": "Brown",
        "phone_number": "1112223333",  # Same phone number
        "address": "222 Second St",
        "country": "Newland",
        "city": "Newcity",
        "zip_code": "22222"
    })

    assert response.status_code == 409
    assert response.json['message'] == 'Phone number already exists.'



