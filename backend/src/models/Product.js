// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['starter', 'main', 'dessert', 'drink'],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,  // Expecting image URL from frontend
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
