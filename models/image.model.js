const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
