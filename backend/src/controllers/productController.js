// src/controllers/productController.js
import Product from "../models/Product.js";

// Add a new product (Admin Only)
const addProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;  // Expecting image URL from frontend

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,  // Save the image URL in the database
    });

    await product.save();
    res.status(201).json(product);  // Return the saved product
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products
    res.json(products);  // Return the products as JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { addProduct, getProducts };
