import React, { useState } from "react";
import emojiData from "./emojipedia";
import MyList from "./MyList"; 
import "./App.css";

function Dashboard({ authorized }) {
  // Remove the duplicate authorized state from here.
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

  // Since Dashboard is only rendered when authorized is true, you can directly show the dashboard.
  return (
    <div className="dashboard">
      {/* <header className="dashboard-header">
        <h1 className="header-title">Biscuits</h1>

        <MyList />

        <div className="header-buttons">
          <button className="header-btn">Login</button>
          <button className="header-btn">Register</button>
          <button className="header-btn">🛒 Cart</button>
        </div>
      </header> */}

      <div className="filters">
        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Butter Biscuits">Butter Biscuits</option>
          <option value="Cream Biscuits">Cream Biscuits</option>
          <option value="Digestive Biscuits">Digestive Biscuits</option>
          <option value="Marie Biscuits">Marie Biscuits</option>
          <option value="Choco fills">Choco fills</option>
        </select>

        <input
          type="text"
          placeholder="Search for items..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="dictionary">
        {filteredData.length > 0 ? (
          filteredData.map((emoji) => (
            <div
              key={emoji.id}
              className="term"
              onClick={() => {
                setSelectedEmoji(emoji);
                setQuantity(1);
              }}
            >
              <div className="emoji">{emoji.emoji}</div>
              <h3>{emoji.name}</h3>
              <p>{emoji.meaning}</p>

              <div className="card-buttons">
                <button className="buy-btn">Buy Now</button>
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No items found</p>
        )}
      </div>

      {selectedEmoji && (
        <>
          <div
            className="overlay active"
            onClick={() => setSelectedEmoji(null)}
          ></div>
          <div className="modal active">
            <button
              className="close-btn"
              onClick={() => setSelectedEmoji(null)}
            >
              X
            </button>
            <div className="card-details">
              {selectedEmoji.emoji}
              <h2>{selectedEmoji.name}</h2>
              <p>{selectedEmoji.meaning}</p>
              <p className="extra-info">{selectedEmoji.extraInfo}</p>

              <div className="quantity-counter">
                <button className="qty-btn" onClick={decreaseQuantity}>
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button className="qty-btn" onClick={increaseQuantity}>
                  +
                </button>
              </div>

              <div className="modal-buttons">
                <button className="buy-btn">Buy Now</button>
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
