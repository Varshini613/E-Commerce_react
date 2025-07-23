import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./Login";
import Product from "./Components/Product";
import Contact from "./Components/Contact";
import About from './Components/About';
import Register from "./Register";
import Header from './Components/Header'; 
import Home from './Components/Home';
import TermsAndConditions from "./Components/TermsAndConditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import Footer from './Components/Footer';
import CartPage from './CartPage';
import Checkout from './Components/checkout';

// Import Dashboard components
import AdminDashboard from './Components/AdminDashboard';
import VendorDashboard from './Components/VendorDashboard';
import UserDashboard from './Components/UserDashboard';

// Import the Role Selection page
import RoleSelection from './Components/RoleSelection'; // Add this import

// Import Add Product Page
import AddProductPage from './Components/AddProductPage'; // New page for adding product

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [authorized, setAuthorized] = useState(false);
  const [role, setRole] = useState(null); // Track user role
  const location = useLocation();
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedAuth = localStorage.getItem("authorized") === "true";
    setRole(savedRole);
    setAuthorized(savedAuth);
  }, []);
  

  // Paths where Header and Footer should be hidden
  // Paths where Header and Footer should be hidden
const hideHeaderFooterPaths = ['/', '/login', '/register', '/role-selection', '/admin-dashboard','/vendor-dashboard','/vendor-dashboard/add-product'];


  return (
    <>
      {/* Show Header only if not on login, register, or role-selection pages */}
      {!hideHeaderFooterPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<RoleSelection />} /> 
        <Route path="/role-selection" element={<RoleSelection />} /> 
        <Route path="/login" element={<Login setAuthorized={setAuthorized} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Role-based routing */}
        {role === 'admin' && (
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
)}

        {authorized && role === 'vendor' && (
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        )}
        {authorized && role === 'user' && (
          <Route path="/user-dashboard" element={<UserDashboard />} />
        )}

        {/* Add Product Route */}
        <Route path="/vendor-dashboard/add-product" element={<AddProductPage />} />
      </Routes>

      {/* Show Footer only if not on login, register, or role-selection pages */}
      {!hideHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
