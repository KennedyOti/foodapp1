// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="container mt-5">
      <h2>Available Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              {/* Dynamically setting the image src to ensure it loads properly */}
              <Card.Img
                variant="top"
                src={product.imageUrl} // Directly use the image URL from the database
                alt={product.name}
                style={{ width: "100%", height: "auto" }} // Adjust the image style to fit
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
