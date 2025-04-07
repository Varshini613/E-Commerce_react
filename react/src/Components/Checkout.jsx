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
  
     
    }
  };

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
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
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

      <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
        Choose Your Payment Method
      </h3>

      {/* Payment Dropdown */}
      <select
        className="form-select mb-4"
        style={{
          fontSize: "14px",
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
        }}
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        <option value="">-- Select Method --</option>
        <option value="PhonePe">Cash on Delivery</option>
        <option value="PhonePe">PhonePe</option>
        <option value="Google Pay">Google Pay</option>
        <option value="Paytm">Paytm</option>
        
      </select>

      {selectedMethod && (
        <>
          <p style={{ fontSize: "16px", marginBottom: "15px" }}>
            Scan the QR code using <strong>{selectedMethod}</strong>:
          </p>
          <img
            src="data:image/png;base64,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"
            alt="QR Code"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
          <div style={{ marginTop: "20px" }}>  
  {/* Cash on Delivery Button */}
  <button
    className="btn btn-lg btn-primary mb-3"
    onClick={() => {
      alert("Order placed successfully with Cash on Delivery!");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/");
    }}
  >
     Cash on Delivery
  </button>

  <br />

  {/* UPI Payment Button */}
  <button
    className="btn btn-lg btn-success mb-4"
    onClick={() => {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setShowQRModal(false);
      navigate("/");
    }}
  >
    ✅ Payment Done (UPI)
  </button>
</div>

        </>
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
