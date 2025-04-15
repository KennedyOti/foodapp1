// src/routes/productRoutes.js
import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin-only route to add a product
router.post("/", protect, isAdmin, addProduct);

// Public route to fetch all products
router.get("/", getProducts);

// Admin-only route to update a product
router.put("/:id", protect, isAdmin, updateProduct); // The product ID is passed in the URL as a parameter

// Admin-only route to delete a product
router.delete("/:id", protect, isAdmin, deleteProduct); // The product ID is passed in the URL as a parameter

export default router;
