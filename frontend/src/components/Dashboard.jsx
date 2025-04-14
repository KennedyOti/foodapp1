// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Sidebar role={user?.role} />
        </Col>
        <Col md={9}>
          <div>
            <h2>Welcome, {user ? user.name : "Guest"}</h2>
            <h3>Your Dashboard</h3>
            {/* Additional dashboard content here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
