import React, { useState } from 'react';
import axios from 'axios';

const UserActions = () => {
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [deleteId, setDeleteId] = useState('');
  const baseUrl = 'http://localhost:9000/api';

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    try {
      await axios.post(`${baseUrl}/post`, user);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error posting user:', error);
      alert('Succeccful to add user');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${deleteId}`);
      alert(res.data);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Successfully  deleted user');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Operations</h2>

      <div>
        <h3>Post User</h3>
        <input type="text" name="id" placeholder="ID" onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <button onClick={handlePost}>Add User</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Delete User</h3>
        <input
          type="text"
          placeholder="User ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserActions;
