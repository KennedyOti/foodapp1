// src/components/Cart.jsx
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleCheckout = async () => {
    if (!deliveryAddress) {
      alert("Please enter a delivery address.");
      return;
    }

    // Create the order data object to be sent to the backend
    const orderData = {
      products: cart.map((item) => ({
        product: item._id, // Ensure _id is sent as the product ID
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      deliveryAddress,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the auth token
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          throw new Error(data.message || "Failed to place order.");
        }
      }

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/orders"); // Navigate to orders page after successful order
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id}>
              {" "}
              {/* Make sure _id is unique */}
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <p>
                ${item.price} x {item.quantity}
              </p>
              <Button
                onClick={() => handleRemoveItem(item._id)}
                variant="danger"
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="mt-3">
            <h5>Delivery Address</h5>
            <input
              type="text"
              className="form-control"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
          </div>
          <Button onClick={handleCheckout} className="mt-3" variant="success">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
