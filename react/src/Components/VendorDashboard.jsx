import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorDashboard = () => {
  const navigate = useNavigate();

  // Function to handle "Add Product" button click
  const goToAddProduct = () => {
    navigate('/vendor-dashboard/add-product'); // updated path for vendor
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-black">Welcome to Vendor Dashboard</h1>
      <p className="text-lg text-black">Manage your products and inventory here.</p>

      {/* Button to add a new product */}
      <button
        onClick={goToAddProduct}
        className="mt-6 px-5 py-3 bg-blue-500 text-black font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Add Product
      </button>
    </div>
  );
};

export default VendorDashboard;
