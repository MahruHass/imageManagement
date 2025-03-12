const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const ImageService = require("../../src/services/image.service");
const { connectDB, disconnectDB } = require("../../src/config/database");

let mongoServer;

beforeAll(async () => {
  await disconnectDB();
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  await connectDB(process.env.MONGODB_URI);
});

afterAll(async () => {
  await disconnectDB();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe("ImageService", () => {
  const mockFile = {
    originalname: "test.jpg",
    mimetype: "image/jpeg",
    size: 1024,
    buffer: Buffer.from("test"),
  };

  it("should upload an image", async () => {
    jest.setTimeout(10000);
    const image = await ImageService.uploadImage(mockFile);
    expect(image.filename).toBe("test.jpg");
    expect(image.contentType).toBe("image/jpeg");
  });

  it("should throw error when no file is provided", async () => {
    await expect(ImageService.uploadImage(null)).rejects.toThrow(
      "No file uploaded"
    );
  });
});
