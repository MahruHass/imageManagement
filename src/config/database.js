const mongoose = require("mongoose");

let mongoConnection = null;

const connectDB = async (uri) => {
  if (mongoConnection) {
    return mongoConnection;
  }

  try {
    mongoConnection = await mongoose.connect(uri);
    if (process.env.NODE_ENV !== "test") {
      console.log(`MongoDB Connected: ${mongoConnection.connection.host}`);
    }
    return mongoConnection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV === "test") {
      throw error;
    }
    process.exit(1);
  }
};

const disconnectDB = async () => {
  if (mongoConnection) {
    await mongoose.disconnect();
    mongoConnection = null;
  }
};

module.exports = { connectDB, disconnectDB };
