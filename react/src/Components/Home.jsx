import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaBehance } from "react-icons/fa";

const bannerImages = [
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
  "/Red Cream Green Vintage Illustrative Voucher Food Ticket.png",
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
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

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="w-100 px-0">
        <div id="bannerCarousel" className="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner rounded shadow">
            {bannerImages.map((img, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <img src={img} className="d-block w-100" alt={`Banner ${index + 1}`} style={{ width: "100vw", height: "300px", objectFit: "cover" }} />
              </div>
            ))}
          </div>
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
        <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
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
              <div className="modal-footer">
                <button className="btn btn-success">Buy Now</button>
                <button className="btn btn-warning">Add to Cart</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-dark text-white mt-5 pt-4 pb-2 w-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">Commerce Theme</h5>
              <p className="text-muted small">Get monthly updates and free resources.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Contact Us</h5>
              <p className="small mb-1"><strong>Phone:</strong> +1 (0) 000 0000 001</p>
              <p className="small mb-1"><strong>Email:</strong> yourmail@example.com</p>
              <p className="small"><strong>Address:</strong> 1234 Street Name, City, AA 99999</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled small">
                <li><a href="#" className="small text-white text-decoration-none">About Us</a></li>
                <li><a href="#" className="small text-white text-decoration-none">Services</a></li>
                <li><a href="#" className="small text-white text-decoration-none">Get in Touch</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center border-top mt-3 pt-2">
         
          <p className="small text-white mb-0">&copy; 2025 Your Company. All rights reserved.</p>
   
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
