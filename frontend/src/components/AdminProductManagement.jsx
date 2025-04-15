// src/components/AdminProductManagement.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "starter",
    imageUrl: "", // Image URL to be provided by admin
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "starter",
      imageUrl: "",
    });

    // Show success alert
    setAlert({
      show: true,
      message: "Product added successfully!",
      variant: "success",
    });

    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000); // Hide alert after 3 seconds
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/products/${editingProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProduct),
      }
    );

    const data = await response.json();
    const updatedProducts = products.map((product) =>
      product._id === data._id ? data : product
    );
    setProducts(updatedProducts);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "starter",
      imageUrl: "",
    });
    setEditingProduct(null);

    // Show success alert
    setAlert({
      show: true,
      message: "Product updated successfully!",
      variant: "success",
    });

    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000); // Hide alert after 3 seconds
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    if (data.message === "Product deleted successfully") {
      setProducts(products.filter((product) => product._id !== id));

      // Show success alert
      setAlert({
        show: true,
        message: "Product deleted successfully!",
        variant: "danger",
      });

      setTimeout(
        () => setAlert({ show: false, message: "", variant: "" }),
        3000
      ); // Hide alert after 3 seconds
    }
  };

  // Set the form to edit a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Product Management</h2>

      {/* Display Alert when actions are performed */}
      {alert.show && (
        <Alert variant={alert.variant} dismissible>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
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
        <Button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
      </Form>

      <h3 className="mt-4">Existing Products</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProductManagement;
