import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the products page after login
    navigate('/products');
  }, [navigate]);

  return null; // Optional: could show a loading spinner here
};

export default UserDashboard;
