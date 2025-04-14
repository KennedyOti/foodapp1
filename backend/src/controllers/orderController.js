import mongoose from "mongoose";
import Order from "../models/Order.js";

// Create a new order (Customer)
const createOrder = async (req, res) => {
  const { products } = req.body;

  // Validate request body
  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid products data" });
  }

  try {
    // Validate product IDs and quantity
    const isValidProductIds = products.every((product) =>
      mongoose.Types.ObjectId.isValid(product.product)
    );

    if (!isValidProductIds) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Ensure all products have valid quantity
    const isValidQuantity = products.every((product) => product.quantity > 0);
    if (!isValidQuantity) {
      return res
        .status(400)
        .json({ message: "All products must have a valid quantity" });
    }

    // Calculate the total amount based on product prices and quantities
    const totalAmount = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    // Create the order
    const order = new Order({
      customer: req.user._id,
      products: products.map((p) => ({
        product: p.product,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount, // Dynamically calculated total amount
      status: "pending",
    });

    await order.save();

    // Populate product details and return the populated order
    const populatedOrder = await Order.findById(order._id)
      .populate("products.product", "name price")
      .populate("customer", "name email");

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error("Order creation error:", error); // Log the error for debugging
    res.status(500).json({
      message: "Server error",
      error: error.message, // Send actual error message for debugging
    });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer", "name email");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single order (Customer or Admin)
const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("customer", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow the customer who placed the order to access it
    if (
      req.user._id.toString() !== order.customer.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the functions so they can be used in routes
export { createOrder, getAllOrders, getOrder };
