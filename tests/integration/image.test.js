const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../server");
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

describe("Image API", () => {
  jest.setTimeout(10000);

  it("should upload an image", async () => {
    const response = await request(app)
      .post("/api/images/upload")
      .attach("image", Buffer.from("test"), "test.jpg");

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
  });

  it("should get all images", async () => {
    const response = await request(app).get("/api/images");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
