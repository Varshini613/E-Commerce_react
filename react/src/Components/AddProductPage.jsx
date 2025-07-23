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
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      await res.json();
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
    <div
      style={{
        backgroundImage: `url('/shopping-bag-cart.jpg')`, // Ensure image is in public/
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container p-4 rounded shadow"
        style={{
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // white with transparency
          backdropFilter: "blur(5px)", // softens background behind
        }}
      >
        <h2 className="text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {[
            "vendorName",
            "name",
            "description",
            "price",
            "brand",
            "category",
            "discount",
            "image",
            "videoUrl",
            "extraInfo",
          ].map((field) => (
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

          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
