const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./src/config/database");
const imageRoutes = require("./src/routes/image.routes");
const { errorHandler } = require("./src/middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/images", imageRoutes);

// Error Handler
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
      app.listen(PORT + 1);
    } else {
      console.error('Error starting server:', error);
    }
  }
};

startServer();

module.exports = app;
