import React from "react";
import "./Home.css";

const latestProducts = [
  { id: 1, image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 3, image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
  
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
