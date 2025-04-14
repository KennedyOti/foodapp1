import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams(); // Get the orderId from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOrder(data);
      } else {
        alert(data.message || "Failed to fetch order details");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleBackToOrders = () => {
    navigate("/admin/orders"); // Navigate back to the orders page
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Order Details</h2>
      <h4>Order ID: {order._id}</h4>
      <p>Customer: {order.customer.name}</p>
      <p>Email: {order.customer.email}</p>
      <p>Address: {order.deliveryAddress}</p>
      <p>Status: {order.status}</p>

      <h5>Products</h5>
      <ul>
        {order.products.map((item) => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>

      <p>Total Amount: ${order.totalAmount}</p>

      <Button onClick={handleBackToOrders} variant="secondary">
        Back to Orders
      </Button>
    </div>
  );
};

export default OrderDetails;
