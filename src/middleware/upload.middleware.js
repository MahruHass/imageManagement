const multer = require("multer");
const { AppError } = require("./error.middleware");

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError("Only image files are allowed!", 400), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = upload;
