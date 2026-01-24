import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartNotification from './components/CartNotification';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="App">
          <Header />
          <CartNotification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/test-cases" element={<div className="placeholder-page">Test Cases Page - Coming Soon</div>} />
            <Route path="/api-testing" element={<div className="placeholder-page">API Testing Page - Coming Soon</div>} />
            <Route path="/contact" element={<div className="placeholder-page">Contact Page - Coming Soon</div>} />
          </Routes>
          <Footer />
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
