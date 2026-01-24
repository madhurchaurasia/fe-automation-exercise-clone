# Automation Exercise - E-commerce Website Clone

A full-featured e-commerce website clone built with React, inspired by the Automation Exercise practice website (https://automationexercise.com). This project includes multiple pages, product listings, shopping cart functionality, and user authentication features.

## Features

### Pages
- **Home Page**: Hero section with featured products, categories sidebar, and brands list
- **Products Page**: Complete product catalog with search functionality and category/brand filters
- **Login/Signup Page**: Dual-panel authentication with separate login and signup forms
- **Cart Page**: Full shopping cart with quantity management, item removal, and checkout

### Components
- **Header**: Responsive navigation menu with cart badge and user authentication status
- **Footer**: Subscription form and copyright information
- **Product Card**: Reusable product display component with hover effects and add to cart
- **Cart Notification**: Success toast notification when items are added to cart

### Key Features
- 🎨 Orange and white color scheme matching the original design
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🔍 Product search functionality
- 🏷️ Category and brand filtering
- 🛒 **Full shopping cart functionality** with localStorage persistence
- 🔔 Real-time cart badge counter in header
- 💾 Cart data persists across browser sessions
- 🔐 **User authentication system** with signup and login
- 👤 User session management with localStorage
- 🚪 Logout functionality
- 💳 Password validation (minimum 6 characters)
- 🎯 34+ mock products with details
- ✅ Success/error notifications

## Technologies Used

- **React**: Frontend library (v18)
- **React Router DOM**: Client-side routing
- **React Context API**: State management for cart and authentication
- **LocalStorage**: Persistent data storage for cart and user data
- **CSS3**: Custom styling with responsive design and animations
- **Font Awesome**: Icons

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Navigate to the project directory:
```bash
cd automation-exercise-clone
```

**Or use the full path:**
```bash
cd /Users/deepika/Documents/Princess/projects/self-heal/fe/automation-exercise-clone
```

Install dependencies (if not already installed):
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

**Or use the full path in one command:**
```bash
cd /fe/automation-exercise-clone && npm start
```

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in your browser.

**Note:** The app is configured to run on port 3002 (see `.env` file). If you want to change the port, modify the `PORT` value in `.env`.

The page will reload when you make changes.\
You may also see any lint errors in the console.

**Note:** Hot module replacement is enabled, so you don't need to restart the server after making code changes. The browser will automatically refresh.

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

```
automation-exercise-clone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   ├── CartNotification.js
│   │   └── CartNotification.css
│   ├── context/
│   │   ├── CartContext.js (Shopping cart state management)
│   │   └── AuthContext.js (User authentication state management)
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Products.js
│   │   ├── Products.css
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── Cart.js
│   │   └── Cart.css
│   ├── data/
│   │   └── productsData.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
``` └── index.js
### 1. Navigation
- Sticky header with logo
- Multiple page links (Home, Products, Cart, Login, Test Cases, API Testing, Video Tutorials, Contact)
- **Cart badge** showing item count (real-time updates)
- **User authentication status** display
- Shows logged-in user's name
- **Logout button** when authenticated
- Active page highlighting
- Responsive mobile menu
### 1. Navigation
- Sticky header with logo
- Multiple page links (Home, Products, Cart, Login, Test Cases, API Testing, Video Tutorials, Contact)
- Active page highlighting
- Responsive mobile menu

### 2. Home Page
- Hero section with promotional content
- Categories sidebar (Women, Men, Kids)
- Brands list with product counts
- Featured products grid
- Recommended items section

### 3. Products Page
- Search bar for product filtering
- Category filters (Women, Men, Kids)
- Brand filters (POLO, H&M, MADAME, etc.)
- Product grid with 34+ products
### 5. Login/Signup Page
- Side-by-side forms with OR divider
- **Fully functional user registration**
- **Working login system**
- Email and password validation
- Password requirements (minimum 6 characters)
### 6. Shopping Cart (Full Implementation)
- **Add to cart** from any product card
- **View cart** with product details table
- **Adjust quantities** (increase/decrease or manual input)
- **Remove individual items**
- **Clear entire cart** button
- **Cart total calculation** (automatic)
- **Continue shopping** link
- **Proceed to checkout** button
- **Empty cart state** with call-to-action
- **Persistent storage** using localStorage
- Cart data survives page refreshes
- Real-time updates across all pages
- Success notification toast when adding items

### 7. User Authentication System
- **User registration** with name, email, password
- **Login functionality** with credential validation
- **Session management** with localStorage
- **Logout functionality**
- **User data persistence** across browser sessions
- Password validation and security checks
- Duplicate email prevention
## Data Storage

This application uses **browser localStorage** for data persistence:

- **Cart Data** (`cart` key): All shopping cart items with quantities
- **User Data** (`users` key): Array of all registered users
- **Session Data** (`currentUser` key): Currently logged-in user information

**To view stored data:**
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Expand Local Storage
4. Click on `http://localhost:3002`
## Security Note

⚠️ **Important**: This is a demonstration project with client-side only storage.

**Current Implementation:**
- Passwords stored in plain text in localStorage
- No server-side validation
- No encrypted communication
- Data stored only in browser

**For Production Use, Implement:**
- Backend server (Node.js, Python, etc.)
- Password hashing (bcrypt, argon2)
- JWT tokens for authentication
- HTTPS encryption
- Database storage (PostgreSQL, MongoDB)
- Email verification
- Password reset functionality
- Rate limiting
- CSRF protection
- Input sanitization

## Future Enhancements

- Product detail page with full product information
- Backend API integration with real database
- Secure password hashing and JWT authentication
- Payment gateway integration (Stripe, PayPal)
- Order history and tracking
- User profile management with address book
- Product reviews and ratings system
- Wishlist functionality
- Product recommendations
- Email notifications
- Admin dashboard
- Inventory management
- Multiple payment methods
- Order status tracking:
1. Navigate to the Login/Signup page
2. In the "New User Signup!" section, enter:
   - Name: Your Name
   - Email: your.email@example.com
   - Password: password123 (minimum 6 characters)
3. Click "Signup"
4. You'll be automatically logged in and redirected to home page
5. Your name will appear in the header

### Login with Existing Account:
1. Go to Login page
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to home page

### Test Shopping Cart:
1. Browse products on Home or Products page
2. Hover over any product card
3. Click "Add to cart" button
4. See success notification
5. Notice cart badge in header updates
6. Go to Cart page
7. Adjust quantities, remove items, or clear cart
8. Refresh page - cart data persists!

### Preloaded Test Account:
You can create an account with these credentials for testing:
- Email: test@example.com
- Password: password123
    id: timestamp,
    name: "User Name",
    email: "user@example.com",
    password: "hashedPassword",
    createdAt: "ISO date string"
  }
  ```

### 8. Footer
- Subscription form with email input
- Arrow button submit
- Copyright information
- Responsive designce with localStorage
- Responsive layout
- Orange circular "OR" separator
- Hover overlay with "Add to Cart" button
- "View Product" button
- Smooth animations

### 5. Login/Signup Page
- Side-by-side forms with OR divider
- Email and password validation
- Responsive layout
- Orange circular "OR" separator

### 6. Footer
- Subscription form with email input
- Arrow button submit
- Copyright information
- Responsive design

## Customization

### Colors
The primary colors can be changed in the CSS files:
- Primary Orange: `#ff8c00`
- Hover Orange: `#e67e00`
- Text Gray: `#666`
- Border Gray: `#e0e0e0`

### Products
Add or modify products in `src/data/productsData.js`

## Testing Credentials

You can use the following test credentials:
- Email: test.k@gmail.com
- Password: password

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Product detail page
- Working shopping cart with quantity management
- User authentication with backend
- Payment integration
- Order history
- User profile management
- Product reviews and ratings
- Wishlist functionality

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

This project is for educational purposes as a practice website clone.

## Acknowledgments

- Original website: [Automation Exercise](https://automationexercise.com/)
- Built as a learning project to practice React and responsive web design
