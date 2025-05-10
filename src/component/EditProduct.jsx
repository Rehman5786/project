import React, { useState } from 'react';
import axios from 'axios';

const EditProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [message, setMessage] = useState('');

  // Fetch product by ID
  const fetchProduct = () => {
    axios.get(`http://localhost:9000/api/user/get/${productId}`)
      .then(res => {
        setProduct(res.data);
        setNewPrice(res.data.price);
        setMessage('');
      })
      .catch(() => {
        setMessage('Product not found.');
        setProduct(null);
      });
  };

  // Update price
  const updatePrice = () => {
    const updatedProduct = { ...product, price: newPrice };
    axios.put(`http://localhost:9000/api/user/put/${productId}`, updatedProduct)
      .then(res => {
        setProduct(res.data);
        setMessage('Price updated successfully!');
      })
      .catch(() => setMessage('Failed to update price.'));
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Product Price</h2>

      <div className="mb-4">
        <label className="block mb-1">Enter Product ID:</label>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={fetchProduct}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Product
        </button>
      </div>

      {product && (
        <div className="mt-4">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Current Price:</strong> ${product.price}</p>

          <label className="block mt-4 mb-1">New Price:</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={updatePrice}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Price
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-blue-700">{message}</p>}
    </div>
  );
};

export default EditProduct;
