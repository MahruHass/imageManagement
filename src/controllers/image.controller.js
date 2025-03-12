const imageService = require("../services/image.service");
const asyncHandler = require("../utils/asyncHandler");
const Image = require("../models/image.model");

exports.uploadImage = asyncHandler(async (req, res) => {
  const image = await imageService.uploadImage(req.file);
  res.status(201).json({
    success: true,
    data: {
      id: image._id,
      filename: image.filename,
    },
  });
});

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    console.log('Found images:', images);
    res.json(images);
  } catch (error) {
    console.error('Error in getAllImages:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
};

exports.getImage = asyncHandler(async (req, res) => {
  const image = await imageService.getImageById(req.params.id);
  res.set("Content-Type", image.contentType);
  res.send(image.data);
});
