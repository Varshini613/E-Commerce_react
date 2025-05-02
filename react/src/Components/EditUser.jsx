import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(() => {
        alert('User updated successfully');
        navigate('/admin-dashboard');
      })
      .catch(err => console.error('Error updating user:', err));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Name"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
