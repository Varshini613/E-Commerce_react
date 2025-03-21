import React from "react";
import { Link } from "react-router-dom";
import "./MyList.css"; // Import styles

const MyList = () => {
  return (
    <header className="dashboard-header">
      <h1 className="header-title">Biscuits</h1>

      <nav className="nav-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="header-buttons">
        <button className="header-btn"><Link to="/login">Login</Link></button>
        <button className="header-btn"><Link to="/Register">Register</Link></button>
        <button className="header-btn"><Link to="/CartPage">🛒 Cart</Link></button>
      </div>
    </header>
  );
};

export default MyList;
