import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders on page load
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        alert(data.message || "Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    // Navigate to the order details page
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="container mt-5">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer.name}</td>
                <td>${order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrderManagement;
