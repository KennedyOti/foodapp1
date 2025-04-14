import express from "express";
import {
  createOrder,
  getAllOrders, // Route to get all orders
  getOrder,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin-only route to get all orders
router.get("/", protect, isAdmin, getAllOrders);
router.post("/", protect, createOrder);
router.get("/:id", protect, getOrder);

export default router;
