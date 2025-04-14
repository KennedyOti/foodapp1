// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavbarComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">FoodApp</Navbar.Brand>
        <Nav className="me-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
