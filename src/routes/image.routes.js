const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");
const upload = require("../middleware/upload.middleware");

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImage);

module.exports = router;
