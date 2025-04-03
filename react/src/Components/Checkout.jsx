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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission/payment
      alert('Order placed successfully!');
      
      // Now clear the cart only after successful order placement
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
  
      navigate('/');
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
