import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for carousel functionality

// Banner images (put these images directly inside your "public/" folder)
const bannerImages = [
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
  "/Red Cream Green Vintage Illustrative Voucher Food Ticket.png",
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
];



<<<<<<< HEAD
=======





>>>>>>> 26c4a9d18419bdaddea509fdecdbb6cffb1131d3
// Product data
const latestProducts = [
  { id: 1, image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 3, image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 5, image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 6, image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 7, image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 8, image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
];

function Home() {
  return (
    <div className="container py-5">
      {/* Banner Carousel */}
      <div
        id="bannerCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="3000" // Change scroll interval (in milliseconds)
      >
        <div className="carousel-inner rounded shadow">
          {bannerImages.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={img}
                className="d-block w-100"
                alt={`Banner ${index + 1}`}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Optional controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Latest Products */}
      <h2 className="text-center mb-5 display-6 fw-bold">Latest Products</h2>
      <div className="row g-4">
        {latestProducts.map((product, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm h-100 border-0 overflow-hidden">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "220px", objectFit: "contain" }}
              />
              <div className="card-body p-3 text-center">
                <h5 className="card-title mb-0 fw-bold">Product {product.id}</h5>
                <p className="card-text text-muted small mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="btn btn-primary btn-sm mt-3">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
