import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./dashboard";
import Contact from "./Components/Contact";
import About from './Components/About';
import Register from "./Register";
import MyList from './MyList'; 
import Home from './Components/Home';













function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  // Hide MyList on login and register pages
  const hideHeaderPaths = ['/login', '/register'];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <MyList />}
      <Routes>
        <Route path="/login" element={<Login setAuthorized={setAuthorized} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
