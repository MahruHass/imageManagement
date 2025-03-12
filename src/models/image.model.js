const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    contentType: {
      type: String,
      required: [true, "Content type is required"],
      enum: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
    },
    data: {
      type: Buffer,
      required: [true, "Image data is required"],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
imageSchema.index({ filename: 1 });

module.exports = mongoose.model("Image", imageSchema);
