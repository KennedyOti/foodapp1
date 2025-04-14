// src/components/Order.jsx
import React, { useState } from "react";

const Order = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleSubmitOrder = async () => {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ deliveryAddress }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Delivery Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmitOrder} className="btn btn-success">
        Place Order
      </button>
    </div>
  );
};

export default Order;
