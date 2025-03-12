const Image = require("../models/image.model");
const { AppError } = require("../middleware/error.middleware");

class ImageService {
  async uploadImage(file) {
    if (!file) {
      throw new AppError("No file uploaded", 400);
    }

    const image = new Image({
      filename: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      data: file.buffer,
    });

    await image.save();
    return image;
  }

  async getAllImages() {
    return await Image.find({}, { data: 0 }).sort({ createdAt: -1 });
  }

  async getImageById(id) {
    const image = await Image.findById(id);
    if (!image) {
      throw new AppError("Image not found", 404);
    }
    return image;
  }
}

module.exports = new ImageService();
