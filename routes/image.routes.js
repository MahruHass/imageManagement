const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/image.model");

const upload = multer();

// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = new Image({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });

    await image.save();
    res.status(201).json({
      message: "Image uploaded successfully",
      imageId: image._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
});

// Get all images metadata
router.get("/", async (req, res) => {
  try {
    const images = await Image.find({}, { data: 0 });
    res.json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching images", error: error.message });
  }
});

// Get specific image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: error.message });
  }
});

module.exports = router;
