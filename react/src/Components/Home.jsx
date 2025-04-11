import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emojiData from "../emojipedia";

const bannerImages = [
  "/Black White and Red Minimalist Market Shops Discount Black Friday Banner.png",
  "/Red Cream Green Vintage Illustrative Voucher Food Ticket.png",
  "/Black and Red Modern Black Friday Banner.png",
  "/Yellow and White Modern Illustrative Cyber Monday Sale Banner.png",
  "/Yellow and Black Modern Church Events Banner.png"
];

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const latestProducts = emojiData.slice(0, 8);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product, qty = 1) => {
    if (!product) return;
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += qty;
      toast.info(`Quantity updated for ${product.name} in your cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.emoji?.props?.src || product.image,
        quantity: qty
      });
      toast.success(`${product.name} added to your cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    handleCloseModal();
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product, quantity);
    navigate("/cart");
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* Auto Sliding Banner */}
      <div style={{ height: "300px", overflow: "hidden" }}>
        <img
          src={bannerImages[currentBanner]}
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
 
      {/* Latest Products Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5 display-6 fw-bold">Latest Products</h2>
        <div className="row g-4">
          {latestProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow-sm h-100 border-0 d-flex flex-column">
                <img 
                  src={product.emoji?.props?.src || product.image} 
                  alt={product.name} 
                  className="card-img-top p-3" 
                  style={{ height: "220px", objectFit: "contain", cursor: "pointer" }} 
                  onClick={() => handleViewDetails(product)}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p 
                    className="card-text text-muted small" 
                    dangerouslySetInnerHTML={{ __html: product.meaning }}
                  ></p>
                  <button 
                    className="btn btn-primary btn-sm mt-auto" 
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Product Details Modal */}
      {selectedProduct && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div 
            className="modal fade show d-block" 
            id="productModal" 
            tabIndex="-1" 
            aria-hidden="true"
            style={{ zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedProduct.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                
                <div className="modal-body">
                  {/* Compact Image Carousel */}
                  <div id="productCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={selectedProduct.emoji?.props?.src || selectedProduct.image}
                          className="d-block w-100"
                          alt={selectedProduct.name}
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </div>
                      {selectedProduct.additionalImages?.map((img, index) => (
                        <div className="carousel-item" key={index}>
                          <img
                            src={img}
                            className="d-block w-100"
                            alt={`Additional ${index + 1}`}
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                        </div>
                      ))}
                      {selectedProduct.video && (
                        <div className="carousel-item">
                          <div className="ratio ratio-16x9">
                            <iframe
                              src={selectedProduct.video}
                              title="Product video"
                              allowFullScreen
                              style={{ height: "200px" }}
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                  </div>

                  <div className="text-center">
                    <p 
                      className="fw-bold mb-2" 
                      dangerouslySetInnerHTML={{ __html: selectedProduct.meaning }}
                    ></p>
                    <p className="small text-muted">{selectedProduct.extraInfo}</p>
                  </div>

                  {/* Compact Quantity Selector */}
                  <div className="d-flex justify-content-center align-items-center my-3">
                    <button 
                      className="btn btn-outline-secondary px-2 py-1" 
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="mx-3">{quantity}</span>
                    <button 
                      className="btn btn-outline-secondary px-2 py-1" 
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-center">
                  <button 
                    className="btn btn-success mx-2 px-3 py-1" 
                    onClick={() => handleBuyNow(selectedProduct)}
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mx-2 px-3 py-1"
                    onClick={() => handleAddToCart(selectedProduct, quantity)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;