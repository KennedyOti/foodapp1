// src/components/AdminProductManagement.jsx
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "starter",
    imageUrl: "", // Image URL to be provided by admin
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products"); // Ensure the backend is running on port 5000
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/products", {
      // Ensure the backend is running on port 5000
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct), // Sending product data including image URL
    });

    const data = await response.json();
    setProducts([...products, data]); // Add new product to the list of products
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "starter",
      imageUrl: "", // Reset the form
    });
  };

  return (
    <div className="container mt-5">
      <h2>Product Management</h2>
      <Form onSubmit={handleAddProduct}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="starter">Starter</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="productImageUrl">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
          />
        </Form.Group>
        <Button type="submit">Add Product</Button>
      </Form>

      <h3 className="mt-4">Existing Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <img
              src={product.imageUrl} // Display the online image URL
              alt={product.name}
              style={{ width: "100px", height: "100px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManagement;
