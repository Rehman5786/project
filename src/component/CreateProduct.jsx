import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/user/post', product)
      .then(res => {
        alert('Product created!');
        setProduct({ name: '', price: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <input name="name" placeholder="Name" value={product.name} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
