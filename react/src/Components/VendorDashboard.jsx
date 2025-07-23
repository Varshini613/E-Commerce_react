import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorDashboard = () => {
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate('/vendor-dashboard/add-product');
  };

  const handleLogout = () => {
    // Optional: localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{
        backgroundImage: `url('shopping-bag-cart.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'black'
      }}
    >
      <h1 className="text-4xl font-bold mb-3">Welcome to Vendor Dashboard</h1>
      <p className="text-lg mb-4">Manage your products and inventory here.</p>

      {/* Buttons Container */}
      <div>
        <button
          onClick={goToAddProduct}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            marginRight: '10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Product
        </button>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;
