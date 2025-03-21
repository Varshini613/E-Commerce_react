import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Login Component
 * 
 * This component provides a login form for users to authenticate themselves.
 * On successful login, the user is redirected to the "/products" page.
 * If the credentials are invalid, an alert is shown.
 */
const Login = () => {
  const navigate = useNavigate();

  // Hardcoded credentials for demonstration purposes
  const correctUsername = "admin";
  const correctPassword = "admin";

  // State to manage form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles form submission.
   * Validates the username and password.
   * Redirects to the "/products" page on successful login.
   * Shows an alert for invalid credentials.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === correctUsername && password === correctPassword) {
      alert("Login Successful!");
      navigate("/products"); // Redirect to the products page
    } else {
      alert("Invalid username or password!"); // Show error for invalid credentials
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        {/* Login Form Header */}
        <h2 className="text-center mb-4">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Registration Link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;