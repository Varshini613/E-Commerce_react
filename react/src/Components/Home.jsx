import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaBehance } from "react-icons/fa";

const bannerImages = [
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
  "/Red Cream Green Vintage Illustrative Voucher Food Ticket.png",
  "/Black and Red Modern Black Friday Banner.png",
  "/Yellow and White Modern Illustrative Cyber Monday Sale Banner.png",
  "/Yellow  and Black Modern Church Events Banner.png"
];

const latestProducts = [
  { id: 1, name: "Sunfeast Marie light", price: "₹102", image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, name: "Whea Free Jeera cookies", price: "₹245", image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 3, name: "Sunfeast Farmlite", price: "₹100", image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, name: "Britannia Good Day", price: "₹141", image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 5, name: "Hide & Seek", price: "₹102", image: "https://m.media-amazon.com/images/I/71cw2JLKmvL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 6, name: "Cadbury oreo", price: "₹245", image: "https://m.media-amazon.com/images/I/61v+M74dWoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 7, name: "Britannia Milk Bikis Milk Cream Biscuits", price: "₹100", image: "https://m.media-amazon.com/images/I/71Wp9Qnc4vL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 8, name: "Sunfeast Mom's Magic", price: "₹141", image: "https://m.media-amazon.com/images/I/810ZSi0ry+L._AC_UL480_FMwebp_QL65_.jpg" },
];

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // ✅ React Router hook for navigation

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    navigate("/products"); // ✅ Redirects to Cart Page
  };

  const handleBuyNow = () => {
    navigate("/products"); // ✅ Redirects to Cart Page
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="w-100 px-0">
        <div id="bannerCarousel" className="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-inner rounded shadow">
            {bannerImages.map((img, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <img src={img} className="d-block w-100" alt={`Banner ${index + 1}`} style={{ width: "100vw", height: "300px", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Latest Products Section */}
      <h2 className="text-center mb-5 display-6 fw-bold">Latest Products</h2>
      <div className="row g-4">
        {latestProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100 border-0 d-flex flex-column">
              <img src={product.image} alt={product.name} className="card-img-top p-3" style={{ height: "220px", objectFit: "contain" }} />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text text-muted small">{product.price}</p>
                <button className="btn btn-primary btn-sm mt-auto" onClick={() => handleViewDetails(product)} data-bs-toggle="modal" data-bs-target="#productModal">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="modal fade show d-block" id="productModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid mb-3" style={{ maxHeight: "200px" }} />
                <p className="fw-bold">{selectedProduct.price}</p>
                <p>High-quality {selectedProduct.name} for your everyday needs.</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-success mx-2" onClick={handleBuyNow}>Buy Now</button>
                <button className="btn btn-warning mx-2" onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
