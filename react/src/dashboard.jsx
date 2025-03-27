import React, { useState } from "react";
import emojiData from "./emojipedia";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard({ authorized }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [brand, setBrand] = useState("All");
  const [discount, setDiscount] = useState("All");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 0 && setQuantity(quantity - 1);

  // Filtering Logic
  const filteredData = emojiData.filter((emoji) => {
    const categoryMatch = category === "All" || emoji.category === category;
    const searchMatch = emoji.name.toLowerCase().includes(searchTerm.toLowerCase());

    const priceMatch =
      price === "All" ||
      (price === "Under 500" && emoji.price < 500) ||
      (price === "500 - 1000" && emoji.price >= 500 && emoji.price <= 1000) ||
      (price === "Above 1000" && emoji.price > 1000);

    const brandMatch = brand === "All" || emoji.brand === brand;
    const discountMatch = discount === "All" || emoji.discount >= parseInt(discount);

    return categoryMatch && searchMatch && priceMatch && brandMatch && discountMatch;
  });

  return (
    <div className="container my-4">
      <div className="row">
        {/* Left Sidebar Filters */}
        <div className="col-md-3">
          <div className="p-3 border rounded">
            <h5 className="mb-3">Filters</h5>

            {/* Category Filter */}
            <div className="mb-3">
              <h6>Category</h6>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">Select Category</option>
                <option value="Biscuits">Biscuits</option>
                <option value="Toys">Toys</option>
                <option value="Devotional Products">Devotional Products</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-3">
              <h6>Price</h6>
              {["All", "Under 500", "500 - 1000", "Above 1000"].map((range) => (
                <div key={range} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value={range}
                    checked={price === range}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="form-check-label">{range}</label>
                </div>
              ))}
            </div>

 {/* Brand Filter */}
<div className="mb-3">
  <h6>Brand</h6>

  {/** Dynamically get brands for the selected category **/}
  {[
    "All",
    ...new Set(
      emojiData
        .filter((emoji) => category === "All" || emoji.category === category)
        .map((emoji) => emoji.brand)
    ),
  ].map((b) => (
    <div key={b} className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="brand"
        value={b}
        checked={brand === b}
        onChange={(e) => setBrand(e.target.value)}
      />
      <label className="form-check-label">{b}</label>
    </div>
  ))}
</div>


            {/* Discount Filter */}
            <div className="mb-3">
              <h6>Discount</h6>
              {["All", "10", "20", "30","40","50"].map((d) => (
                <div key={d} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    value={d}
                    checked={discount === d}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <label className="form-check-label">{d}% and above</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Product List */}
        <div className="col-md-9">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredData.length > 0 ? (
              filteredData.map((emoji) => (
                <div className="col" key={emoji.id}>
                  <div className="card h-100 shadow-sm"
                    onClick={() => setSelectedEmoji(emoji)}
                    data-bs-toggle="modal"
                    data-bs-target="#productModal"
                  >
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                      <img
                      src={emoji.emoji.props.src}
                      alt={emoji.name}
                       className="img-fluid rounded mb-3"
                        style={{ 
                        width: "100%",  
                         height: "150px", 
                          objectFit: "contain" 
                               }}
                      />
                        <h5 className="card-title mb-2">{emoji.name}</h5>
                        {/* <p className="card-text text-muted mb-4"><strong>{emoji.meaning}</strong></p>
                       */}
                       <p className="card-text text-muted mb-4" dangerouslySetInnerHTML={{ __html: emoji.meaning }}></p>

                      </div>
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary btn-sm">Buy Now</button>
                        <button className="btn btn-outline-success btn-sm">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No items found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Product Details */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedEmoji && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">{selectedEmoji.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {/* <div className="modal-body text-center"> */}
                <div className="modal-body text-center" style={{ maxHeight: "350px", overflowY: "auto" }}>

                  <img
                    src={selectedEmoji.emoji.props.src}
                    alt={selectedEmoji.name}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <p dangerouslySetInnerHTML={{ __html: selectedEmoji.meaning }}></p>

                  <p><strong>Description:</strong> {selectedEmoji.extraInfo}</p>
                  
                </div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                    <span className="mx-3">{quantity}</span>
                    <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
                     Add to Cart
                </button>
                 <button type="button" className="btn btn-primary">
                     Buy Now
                </button>
          </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
