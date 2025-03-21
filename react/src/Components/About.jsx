import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>React Ecommerce</strong>, your go-to platform for the best online shopping experience.
        We provide a variety of high-quality products with a seamless and user-friendly interface.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Our mission is to deliver the best online shopping experience by offering top-quality products
        with a hassle-free purchasing process.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>Wide range of high-quality products</li>
        <li>Secure payment methods</li>
        <li>Fast and reliable delivery</li>
        <li>24/7 customer support</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        Have any questions? Visit our <a href="/Contact">Contact Us</a> page to reach out to us!
      </p>
    </div>
  );
};

export default About;
