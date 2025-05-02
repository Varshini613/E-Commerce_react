import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    discount: "",
    image: "",
    additionalImages: ["", ""],
    videoUrl: "",
    extraInfo: "",
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (name === "additionalImages") {
      const updated = [...formData.additionalImages];
      updated[dataset.index] = value;
      setFormData((prev) => ({ ...prev, additionalImages: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      alert("✅ Product added!");
      setFormData({
        vendorName: "",
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        discount: "",
        image: "",
        additionalImages: ["", ""],
        videoUrl: "",
        extraInfo: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {["vendorName", "name", "description", "price", "brand", "category", "discount", "image", "videoUrl", "extraInfo"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
              required={["vendorName", "name", "description", "price"].includes(field)}
            />
          </div>
        ))}

        {[0, 1].map((index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">Additional Image {index + 1}</label>
            <input
              type="text"
              name="additionalImages"
              data-index={index}
              className="form-control"
              value={formData.additionalImages[index]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
