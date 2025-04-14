// src/middleware/upload.js
import multer from "multer";
import path from "path";

// Set up Multer to store images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

export default upload;
