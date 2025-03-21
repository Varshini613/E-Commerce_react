// Home.js - React component for latest product images
import React from "react";
import "./Home.css";

const latestProducts = [
  { id: 1, image: "https://via.placeholder.com/200" },
  { id: 2, image: "https://via.placeholder.com/200" },
  { id: 3, image: "https://via.placeholder.com/200" },
  { id: 4, image: "https://via.placeholder.com/200" },
  { id: 5, image: "https://via.placeholder.com/200" },
  { id: 6, image: "https://via.placeholder.com/200" },
];

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Latest Products</h2>
      <div className="product-grid">
        {latestProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={`Product ${product.id}`} className="product-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
