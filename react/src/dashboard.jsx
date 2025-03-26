import React, { useState } from "react";
import emojiData from "./emojipedia";

function Dashboard({ authorized }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 0 && setQuantity(quantity - 1);

  const filteredData = emojiData.filter(
    (emoji) =>
      (category === "All" || emoji.category === category) &&
      emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Butter Biscuits">Butter Biscuits</option>
            <option value="Cream Biscuits">Cream Biscuits</option>
            <option value="Digestive Biscuits">Digestive Biscuits</option>
            <option value="Marie Biscuits">Marie Biscuits</option>
            <option value="Choco fills">Choco fills</option>
          </select>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search for biscuits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredData.length > 0 ? (
          filteredData.map((emoji) => (
            <div className="col" key={emoji.id}>
              <div className="card h-100 shadow-sm"
                onClick={() => {
                  setSelectedEmoji(emoji);
                  setQuantity(1);
                }}
              >
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <img
                      src={emoji.emoji.props.src}
                      alt={emoji.name}
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                    <h5 className="card-title mb-2">{emoji.name}</h5>
                    <p className="card-text text-muted mb-4">{emoji.meaning}</p>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-sm">Buy Now</button>
                    <button className="btn btn-outline-success btn-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No items found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedEmoji && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedEmoji(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedEmoji.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedEmoji(null)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={selectedEmoji.emoji.props.src}
                    alt={selectedEmoji.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <p className="text-muted">{selectedEmoji.meaning}</p>
                  <p className="text-muted">{selectedEmoji.extraInfo}</p>

                  <div className="d-flex justify-content-center align-items-center my-3">
                    <button
                      className="btn btn-secondary me-2"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary">Buy Now</button>
                    <button className="btn btn-outline-success">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;