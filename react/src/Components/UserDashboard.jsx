import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to /products when this component mounts
    navigate('/products');
  }, [navigate]);

  return null; // or return a loading spinner or message if needed
}

export default UserDashboard;
