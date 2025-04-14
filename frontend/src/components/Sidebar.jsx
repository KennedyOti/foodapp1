// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Sidebar = ({ role }) => {
  return (
    <div
      style={{ width: "200px", padding: "10px", backgroundColor: "#f4f4f4" }}
    >
      <ListGroup>
        {role === "admin" ? (
          <>
            <ListGroup.Item as={Link} to="/admin/products">
              Manage Products
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/admin/orders">
              Manage Orders
            </ListGroup.Item>
          </>
        ) : (
          <>
            <ListGroup.Item as={Link} to="/cart">
              View Cart
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/orders">
              My Orders
            </ListGroup.Item>
          </>
        )}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
