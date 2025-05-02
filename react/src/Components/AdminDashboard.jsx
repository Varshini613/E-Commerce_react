import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('products');

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));

    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveProductEdit = (updatedProduct) => {
    fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
      .then(() => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setEditingProduct(null);
      })
      .catch(err => console.error("Product update error:", err));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(products.filter(p => p.id !== productId));
      })
      .catch(err => console.error("Product deletion error:", err));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUserEdit = (updatedUser) => {
    fetch(`http://localhost:5000/api/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })
      .then(() => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setEditingUser(null);
      })
      .catch(err => console.error("User update error:", err));
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(users.filter(u => u.id !== userId));
      })
      .catch(err => console.error("User deletion error:", err));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="d-flex justify-content-between mb-4">
        <div>
          <button
            className={`btn me-2 ${view === 'products' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('products')}
          >
            📦 Products
          </button>
          <button
            className={`btn ${view === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('users')}
          >
            👥 Registered Users
          </button>
        </div>
      </div>

      {/* ---------------- PRODUCT SECTION ---------------- */}
      {view === 'products' && (
        <div>
          <h4>📦 Product Details</h4>
          <table className="table table-hover table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Vendor</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Discount</th>
                <th>Images</th>
                <th>Video</th>
                <th>Extra Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="11" className="text-center">No products found</td></tr>
              ) : (
                products.map(product => (
                  editingProduct && editingProduct.id === product.id ? (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      {/* Editable fields */}
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.vendor_name} onChange={e => setEditingProduct({ ...editingProduct, vendor_name: e.target.value })} /></td>
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} /></td>
                      <td><input type="number" className="form-control form-control-sm" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} /></td>
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.brand} onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })} /></td>
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} /></td>
                      <td><input type="number" className="form-control form-control-sm" value={editingProduct.discount} onChange={e => setEditingProduct({ ...editingProduct, discount: e.target.value })} /></td>
                      <td>
                        <input type="text" className="form-control form-control-sm mb-1" value={editingProduct.additional_image1} onChange={e => setEditingProduct({ ...editingProduct, additional_image1: e.target.value })} placeholder="Image 1 URL" />
                        <input type="text" className="form-control form-control-sm" value={editingProduct.additional_image2} onChange={e => setEditingProduct({ ...editingProduct, additional_image2: e.target.value })} placeholder="Image 2 URL" />
                      </td>
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.video_url} onChange={e => setEditingProduct({ ...editingProduct, video_url: e.target.value })} placeholder="Video URL" /></td>
                      <td><input type="text" className="form-control form-control-sm" value={editingProduct.extra_info} onChange={e => setEditingProduct({ ...editingProduct, extra_info: e.target.value })} placeholder="Extra Info" /></td>
                      <td>
                        <button className="btn btn-success btn-sm me-1" onClick={() => handleSaveProductEdit(editingProduct)}>💾</button>
                        <button className="btn btn-secondary btn-sm me-1" onClick={() => setEditingProduct(null)}>❌</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.vendor_name}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>{product.discount}%</td>
                      <td>
                        <img src={product.additional_image1} alt="Img1" width="40" height="40" className="me-1" />
                        <img src={product.additional_image2} alt="Img2" width="40" height="40" />
                      </td>
                      <td>{product.video_url ? <a href={product.video_url} target="_blank" rel="noopener noreferrer">🎥</a> : 'No video'}</td>
                      <td>{product.extra_info}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditProduct(product)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>🗑️</button>
                      </td>
                    </tr>
                  )
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- USERS SECTION ---------------- */}
      {view === 'users' && (
        <div>
          {editingUser && (
            <div className="card card-body mb-3">
              <h5>Editing User ID {editingUser.id}</h5>
              <input
                className="form-control mb-2"
                value={editingUser.name}
                onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                placeholder="Name"
              />
              <input
                className="form-control mb-2"
                value={editingUser.role}
                onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                placeholder="Role"
              />
              <button className="btn btn-success me-2" onClick={() => handleSaveUserEdit(editingUser)}>💾 Save</button>
              <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>❌ Cancel</button>
            </div>
          )}

          <h4>👥 Registered Users</h4>
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No users found</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditUser(user)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
