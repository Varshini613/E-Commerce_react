import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaBehance } from "react-icons/fa";

// Banner images
const bannerImages = [
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
  "/Red Cream Green Vintage Illustrative Voucher Food Ticket.png",
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
];

// Product data
const latestProducts = [
  { id: 1, image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 3, image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 5, image: "https://m.media-amazon.com/images/I/71bufOt9zAL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 6, image: "https://m.media-amazon.com/images/I/71cw2JLKmvL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 7, image: "https://m.media-amazon.com/images/I/81MdF4B3F1L._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 8, image: "https://m.media-amazon.com/images/I/916aCP2ISiL._AC_UL480_FMwebp_QL65_.jpg" },
];

function Home() {
  return (
    <div className="container py-5">
      {/* Banner Carousel */}
      <div id="bannerCarousel" className="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner rounded shadow">
          {bannerImages.map((img, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={img} className="d-block w-100" alt={`Banner ${index + 1}`} style={{ maxHeight: "300px", objectFit: "cover" }} />
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

      {/* Latest Products */}
      <h2 className="text-center mb-5 display-6 fw-bold">Latest Products</h2>
      <div className="row g-4">
        {latestProducts.map((product, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100 border-0">
              <img src={product.image} alt={`Product ${product.id}`} className="card-img-top p-3" style={{ height: "220px", objectFit: "contain" }} />
              <div className="card-body d-flex flex-column justify-content-between text-center">
                <h5 className="card-title fw-bold">Product {product.id}</h5>
                <p className="card-text text-muted small">Lorem ipsum dolor sit amet.</p>
                <button className="btn btn-primary btn-sm mt-auto">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 pt-4 pb-2">
        <div className="container">
          <div className="row">
            {/* About & Subscription */}
            <div className="col-md-4">
              <h5 className="fw-bold">Commerce Theme</h5>
              <p className="text-muted small">Get monthly updates and free resources.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-md-4">
              <h5 className="fw-bold">Contact Us</h5>
              <p className="small mb-1"><strong>Phone:</strong> +1 (0) 000 0000 001</p>
              <p className="small mb-1"><strong>Email:</strong> yourmail@example.com</p>
              <p className="small"><strong>Address:</strong> 1234 Street Name, City, AA 99999</p>

              {/* Social Media Icons */}
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-muted fs-4"><FaFacebookF /></a>
                <a href="#" className="text-muted fs-4"><FaInstagram /></a>
                <a href="#" className="text-muted fs-4"><FaTwitter /></a>
                <a href="#" className="text-muted fs-4"><FaYoutube /></a>
                <a href="#" className="text-muted fs-4"><FaGoogle /></a>
                <a href="#" className="text-muted fs-4"><FaBehance /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-md-4">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled small">
                <li><a href="#" className="text-muted text-decoration-none">About Us</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Services</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Get in Touch</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center border-top mt-3 pt-2">
            <p className="small text-muted mb-0">&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
