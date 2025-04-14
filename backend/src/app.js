import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
//import createDefaultAdmin from "./createDefaultAdmin.js"; // Import the function to create the default admin

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


// Default route for checking API status
app.get("/", (req, res) => {
  res.send("API is running... ✅");
});

// Export the app for use with your server
export default app;
