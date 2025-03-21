import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login from "./Login";
import Dashboard from "./dashboard";
import Contact from "./Components/Contact";
import About from './Components/About';
import Register from "./Register";
import MyList from './MyList'; 
import Home from './Home';






function App() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <Router>
    
      <MyList /> 
      <Routes>
        <Route path="/login" element={<Login setAuthorized={setAuthorized} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/products" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
       
      </Routes>
    </Router>
  );
}

export default App;









