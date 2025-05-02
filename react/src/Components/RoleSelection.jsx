import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    localStorage.setItem("role", role);
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #cfe0fc 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative Circles */}
      <div className="position-absolute top-10 left-10 w-48 h-48 rounded-circle bg-blue-300 filter blur-3xl opacity-60"></div>
      <div className="position-absolute bottom-10 right-10 w-48 h-48 rounded-circle bg-indigo-300 filter blur-3xl opacity-60"></div>

      <div 
        className="card p-5 shadow-lg rounded-3xl w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm animate-fade-in"
        style={{ zIndex: 1 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-black mb-3">
            🛍️ ShopEase
          </h1>
          <p className="text-muted text-base">
            Select your role to proceed
          </p>
        </div>

        {/* Role Buttons */}
        <div className="d-grid gap-4">
          <button
            className="w-full py-3 text-black bg-blue-600 font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => handleRoleSelection("admin")}
          >
             Admin
          </button>

          <button
            className="w-full py-3 text-black bg-blue-600 font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => handleRoleSelection("vendor")}
          >
            📦 Vendor Partner
          </button>

          <button
            className="w-full py-3 text-black bg-blue-600 font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => handleRoleSelection("user")}
          >
            👤 Customer Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          🔒 Your data is safe with us
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
