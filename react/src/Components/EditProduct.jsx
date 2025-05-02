import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    discount: '',
    additional_image1: '',
    additional_image2: '',
    video_url: '',
    extra_info: '',
  });

  // Fetch the product data for editing
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data)) // Set fetched data in state
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission (Update the product)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated product data to the backend
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT', // PUT for updating product
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product), // Send the updated product data
    })
      .then(res => res.json())
      .then(updatedProduct => {
        alert('Product updated successfully!');
        navigate('/admin-dashboard'); // Redirect to admin dashboard after success
      })
      .catch(err => console.error('Error updating product:', err));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Discount</label>
          <input
            type="number"
            className="form-control"
            name="discount"
            value={product.discount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Image 1</label>
          <input
            type="text"
            className="form-control"
            name="additional_image1"
            value={product.additional_image1}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Image 2</label>
          <input
            type="text"
            className="form-control"
            name="additional_image2"
            value={product.additional_image2}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Video URL</label>
          <input
            type="text"
            className="form-control"
            name="video_url"
            value={product.video_url}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Extra Info</label>
          <textarea
            className="form-control"
            name="extra_info"
            value={product.extra_info}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
