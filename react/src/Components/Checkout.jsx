import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const location = useLocation();
  // Get cart items from location state or fallback to empty array
  const cartItems = location.state?.cartItems || [];
  const baseTotalPrice = location.state?.totalPrice || cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dispatchOption: '',
    shippingCost: 0,  // Add shipping cost to formData
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Show QR modal instead of final alert and redirect
      setShowQRModal(true);
      // Now clear the cart only after successful order placement
      // localStorage.removeItem("cart");
      // window.dispatchEvent(new Event("cartUpdated"));
      // navigate('/products');
  
     
    }
  };
const [showBillingDetails, setShowBillingDetails] = useState(false);

  // Calculate the total price including shipping cost
  const updatedTotalPrice = baseTotalPrice + formData.shippingCost;

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/cart">View Cart</Link></li>
          <li className="breadcrumb-item active" aria-current="page"><Link to="/checkout">Checkout</Link></li>
        </ol>
      </nav>

      {/* Checkout Steps Header */}
      <div className="checkout-steps mb-4">
        <div className="row justify-content-between">
          <div className={`col step ${step >= 1 ? 'active' : ''} text-center py-3`}>
            <div className="step-number">1</div>
            <div className="step-title">Address</div>
          </div>
          <div className={`col step ${step >= 2 ? 'active' : ''} text-center py-3`}>
            <div className="step-number">2</div>
            <div className="step-title">Dispatch</div>
          </div>
          <div className={`col step ${step >= 3 ? 'active' : ''} text-center py-3`}>
            <div className="step-number">3</div>
            <div className="step-title">Review & Payment</div>
          </div>
        </div>
      </div>
{/* Progress Bar */}
<div className="progress mb-4" style={{ height: '20px' }}>
  <div
    className="progress-bar"
    role="progressbar"
    style={{
      width: `${(step / 3) * 100}%`,
      backgroundColor: "#007bff",
    }}
    aria-valuenow={(step / 3) * 100}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    Step {step} of 3
  </div>
</div>


      <div className="row">
        <div className="col-md-8">
          {step === 1 && (
            <div className="address-form">
              <h4 className="mb-4">Shipping Address</h4>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="dispatch-options">
              <h4 className="mb-4">Shipping Methods</h4>

              <div className="card mb-3">
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dispatchOption"
                      id="postal"
                      value="India Postal"
                      checked={formData.dispatchOption === "India Postal"}
                      onChange={(e) => setFormData(prev => ({ ...prev, dispatchOption: e.target.value, shippingCost: 70 }))}
                    />
                    <label className="form-check-label" htmlFor="postal">
                      South India - India Postal (₹70.00, Estimated delivery 2-3 days)
                    </label>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dispatchOption"
                      id="professional"
                      value="Professional Courier"
                      checked={formData.dispatchOption === "Professional Courier"}
                      onChange={(e) => setFormData(prev => ({ ...prev, dispatchOption: e.target.value, shippingCost: 70 }))}
                    />
                    <label className="form-check-label" htmlFor="professional">
                      South India - Professional Courier (₹70.00, Estimated delivery 2-3 working days)
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(3)}
                  disabled={!formData.dispatchOption}  // Disable button if no option is selected
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="review-payment">
              <h4 className="mb-4">Review Order & Make Payment</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>Shipping Address</h5>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.email}</p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <h5>Dispatch Method</h5>
                  <p>{formData.dispatchOption}</p>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {showQRModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1050,
      animation: "fadeIn 0.3s",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowQRModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          background: "none",
          border: "none",
          fontSize: "26px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        &times;
      </button>

      <h3 style={{ marginBottom: "20px", fontSize: "22px", fontWeight: "500" }}>
        Choose Your Payment Method
      </h3>
       {/* Billing Details Section */}
<div
  style={{
    textAlign: "left",
    marginTop: "25px",
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "10px",
  }}
>
<div style={{ 
    padding: '16px',
    border: '1px solid #eee',
    borderRadius: '6px',
    fontSize: '14px'
}}>
    <h4 style={{
        margin: '0 0 12px 0',
        fontSize: '15px',
        fontWeight: '600',
        color: '#333'
    }}>
        Billing Summary
    </h4>
    
    <div style={{ marginBottom: '10px' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px'
        }}>
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{baseTotalPrice.toFixed(2)}</span>
        </div>
        
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px'
        }}>
            <span>Shipping</span>
            <span>₹{formData.shippingCost.toFixed(2)}</span>
        </div>
    </div>
    
    <div style={{ 
        borderTop: '1px dashed #e0e0e0',
        paddingTop: '10px',
        marginTop: '10px',
        fontWeight: '500'
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <span>Total</span>
            <span>₹{updatedTotalPrice.toFixed(2)}</span>
        </div>
    </div>
</div>
</div>



      {/* Payment Method Dropdown */}
      <select
        className="form-select mb-4"
        style={{
          fontSize: "14px",
          padding: "12px",
          width: "100%",
          marginTop:"15px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          outline: "none",
        }}
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        <option value="">-- Select Payment Method --</option>
        <option value="PhonePe">PhonePe</option>
        <option value="Google Pay">Google Pay</option>
        <option value="Paytm">Paytm</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
      </select>

      {selectedMethod && selectedMethod !== "Cash on Delivery" && (
        <>
          <p style={{ fontSize: "16px", marginBottom: "15px" }}>
            Scan the QR code using <strong>{selectedMethod}</strong>:
            
          </p>
         
          {/* Display QR code */}
          <img
            src="data:image/png;base64,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"  // Replace with actual QR code URL or data
            alt="QR Code"
            style={{
              maxWidth: "100px",
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />

          {/* UPI Payment Button */}
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              width: "100%",
              marginTop: "10px",
            }}
            onClick={() => {
              const submitOrderToServer = async () => {
                const orderData = {
                  ...formData,
                  cartItems,
                  totalPrice: updatedTotalPrice,
                  paymentMethod: selectedMethod,
                };
              
                try {
                  const res = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                  });
              
                  const result = await res.json();
              
                  if (res.ok) {
                    alert("Order placed successfully!");
                    localStorage.removeItem("cart");
                    window.dispatchEvent(new Event("cartUpdated"));
                    navigate("/products");
                  } else {
                    alert("Order failed: " + result.message);
                  }
                } catch (error) {
                  console.error("Submit error:", error);
                  alert("An error occurred while submitting the order.");
                }
              };
              
            }}
            
          >
            Proceed with Payment
          </button>
        </>
      )}

      {/* Cash on Delivery Button */}
      {selectedMethod === "Cash on Delivery" && (
        
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginTop: "20px",
          }}
          onClick={() => {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            setShowQRModal(false);
            navigate("/");
          }}
          
        >
          Confirm Cash on Delivery
        </button>
      )}
    </div>
  </div>
)}

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              
              {/* Display actual cart items count */}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartItems.length} Items)</span>
                <span>₹{baseTotalPrice.toFixed(2)}</span>
              </div>
              
              <hr />

              {/* Display shipping cost */}
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹{formData.shippingCost.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{updatedTotalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
