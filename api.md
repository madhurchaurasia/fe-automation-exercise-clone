# API Documentation

Base URL:

`http://localhost:5000`

This project uses `json-server` with resources from [db/db.json](db/db.json):
- `authUsers`
- `cartItems`

---

## Run backend

```bash
npm run server
```

Or run frontend + backend together:

```bash
npm start
```

---

## Auth Users Endpoints

### 1) Get all users
```bash
curl -X GET http://localhost:5000/authUsers
```

### 2) Get user by id
```bash
curl -X GET http://localhost:5000/authUsers/1772604293182
```

### 3) Create user
```bash
curl -X POST http://localhost:5000/authUsers \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1772605000000,
    "name": "Test User",
    "email": "test.user@example.com",
    "password": "123456",
    "createdAt": "2026-03-04T10:30:00.000Z"
  }'
```

### 4) Update full user (PUT)
```bash
curl -X PUT http://localhost:5000/authUsers/1772605000000 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1772605000000,
    "name": "Updated User",
    "email": "updated@example.com",
    "password": "654321",
    "createdAt": "2026-03-04T10:30:00.000Z"
  }'
```

### 5) Update partial user (PATCH)
```bash
curl -X PATCH http://localhost:5000/authUsers/1772605000000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Patched Name"
  }'
```

### 6) Delete user
```bash
curl -X DELETE http://localhost:5000/authUsers/1772605000000
```

---

## Cart Items Endpoints

### 1) Get all cart items
```bash
curl -X GET http://localhost:5000/cartItems
```

### 2) Get cart item by id
```bash
curl -X GET http://localhost:5000/cartItems/1
```

### 3) Create cart item
```bash
curl -X POST http://localhost:5000/cartItems \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "productId": 3,
    "name": "Sleeveless Dress",
    "price": 1000,
    "quantity": 2
  }'
```

### 4) Update full cart item (PUT)
```bash
curl -X PUT http://localhost:5000/cartItems/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "productId": 3,
    "name": "Sleeveless Dress",
    "price": 1000,
    "quantity": 3
  }'
```

### 5) Update partial cart item (PATCH)
```bash
curl -X PATCH http://localhost:5000/cartItems/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 5
  }'
```

### 6) Delete cart item
```bash
curl -X DELETE http://localhost:5000/cartItems/1
```

---

## Useful json-server query examples

### Find user by email
```bash
curl -X GET "http://localhost:5000/authUsers?email=hola.se@test.com"
```

### Paginate users (page 1, limit 5)
```bash
curl -X GET "http://localhost:5000/authUsers?_page=1&_limit=5"
```

### Sort users by createdAt desc
```bash
curl -X GET "http://localhost:5000/authUsers?_sort=createdAt&_order=desc"
```
