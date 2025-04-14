// src/routes/productRoutes.js
import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, isAdmin, addProduct); // Admin-only route to add a product
router.get("/", getProducts); // Public route to fetch products

export default router;
