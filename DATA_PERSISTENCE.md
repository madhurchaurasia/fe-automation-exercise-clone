# Data Persistence Setup

## Overview
This project uses **file-based data persistence** via `json-server`, allowing all users to share the same data across the repository.

## How It Works

### Backend API (json-server)
- **File**: `db.json` - Contains all persistent data (users, cart, etc.)
- **Port**: http://localhost:5000
- **Endpoints**:
  - `GET/POST http://localhost:5000/users` - User data
  - `GET/POST http://localhost:5000/cart` - Cart data

### Data Storage
All data is stored in `db.json` file in the root directory. This file is:
- ✅ **Committed to Git** - Shared across all repo users
- ✅ **Persistent** - Survives app restarts
- ✅ **Shared** - Everyone who clones the repo uses the same data

### How to Run

```bash
npm install
npm start
```

This will start:
1. **json-server** on port 5000 (backend API)
2. **React app** on port 3000 (frontend)

### User Authentication Flow

1. **Sign Up**: 
   - Creates user in `db.json`
   - User ID: Generated using `Date.now()`
   - Automatically logs in user

2. **Sign In**:
   - Fetches all users from `db.json`
   - Validates credentials
   - Stores session in `sessionStorage` (for current browser session only)

3. **Data Sharing**:
   - All signed-up users are saved in `db.json`
   - Anyone who pulls/clones the repo gets the same user database
   - Perfect for testing with shared test accounts

### Viewing/Editing Data

You can directly edit `db.json` to:
- Add test users
- Clear all data
- Modify existing records

Example `db.json` structure:
```json
{
  "users": [
    {
      "id": 1709567891234,
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123",
      "createdAt": "2026-03-04T10:30:00.000Z"
    }
  ],
  "cart": []
}
```

### API Endpoints

- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Same pattern works for cart and any other resources you add.

## Notes

- ⚠️ **Not for production**: Passwords are stored in plain text
- ✅ **Perfect for testing**: Shared test data across team
- ✅ **Easy to reset**: Just edit/clear `db.json`
