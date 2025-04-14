// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import AdminProductManagement from "./components/AdminProductManagement";
import AdminOrderManagement from "./components/AdminOrderManagement"; // Added
import OrderDetails from "./components/OrderDetails"; // Added
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/products" element={<AdminProductManagement />} />

        {/* Admin Order Management Route */}
        <Route path="/admin/orders" element={<AdminOrderManagement />} />

        {/* Order Details Route */}
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
