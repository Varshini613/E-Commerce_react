import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Alert } from "react-bootstrap";

const Login = ({ setAuthorized, setRole }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin credentials (hardcoded for simplicity)
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  // Check for role in localStorage on component mount
  useEffect(() => {
    const selectedRole = localStorage.getItem("role");
    if (!selectedRole || !["user", "vendor", "admin"].includes(selectedRole)) {
      localStorage.removeItem("role");
      navigate("/role-selection");
    }
  }, [navigate]);

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedRole = localStorage.getItem("role");
  
    if (selectedRole === "admin") {
      if (username === adminEmail && password === adminPassword) {
        localStorage.setItem("authorized", "true");
        localStorage.setItem("role", "admin");
        setRole("admin");
        setAuthorized(true);
        navigate("/admin-dashboard");
      } else {
        alert("Incorrect admin credentials. Please try again.");
        return;
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const userRole = data.user.role; // Role from database
  
          if (userRole !== selectedRole) {
            // If role mismatch
            setError("Invalid credentials or incorrect role.");
            setTimeout(() => navigate("/role-selection"), 2000); // Redirect after error
            return; // Stop further execution
          }
  
          // Role matches, proceed normally
          localStorage.setItem("authorized", "true");
          localStorage.setItem("role", userRole);
          setRole(userRole);
          setAuthorized(true);
  
          if (userRole === "user") {
            navigate("/user-dashboard");
          } else if (userRole === "vendor") {
            navigate("/vendor-dashboard");
          } else {
            setError("Unknown role assigned.");
          }
        } else {
          setError(data.message || "Invalid credentials.");
          setTimeout(() => navigate("/role-selection"), 2000);
        }
      } catch (error) {
        setError("Error occurred while logging in.");
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "400px", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Login</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Button variant="link" onClick={() => navigate("/register")} className="p-0">
              Register here
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
