import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    supplierName: "",
    productStatus: ""
  });

  const API_URL = "http://localhost:5001/api/products";

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(API_URL, form);

    setForm({
      productName: "",
      category: "",
      price: "",
      quantity: "",
      supplierName: "",
      productStatus: ""
    });

    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div className="container">
      <h1>Product Inventory Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="supplierName"
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={handleChange}
        />

        <input
          name="productStatus"
          placeholder="Product Status"
          value={form.productStatus}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>

      {products.map((product) => (
        <div key={product._id} className="card">
          <h3>{product.productName}</h3>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Supplier: {product.supplierName}</p>
          <p>Status: {product.productStatus}</p>

          <button onClick={() => handleDelete(product._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;