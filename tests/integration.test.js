const path = require("path");

process.env.DATA_FILE = path.join(__dirname, "test-data.json");

const request = require("supertest");
const app     = require("../backend/server");
const fs      = require("fs");

const TEST_FILE = process.env.DATA_FILE;

beforeAll(() => {
  fs.writeFileSync(TEST_FILE, JSON.stringify([]));
});

afterAll(() => {
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
});

describe("Cloud Resource API - Full CRUD Integration", () => {
  let createdId;

  test("POST /api/resources - creates a new resource (201)", async () => {
    const res = await request(app)
      .post("/api/resources")
      .send({
        name:         "integration-vm",
        type:         "Virtual Machine",
        region:       "us-east-1",
        cpuUsage:     60,
        memoryUsage:  55,
        storageGB:    200,
        monthlyCost:  180,
        status:       "active",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("integration-vm");
    expect(res.body.type).toBe("Virtual Machine");
    expect(res.body.status).toBe("active");

    createdId = res.body.id;
  });

  test("POST /api/resources - rejects request missing required fields (400)", async () => {
    const res = await request(app)
      .post("/api/resources")
      .send({ name: "no-type-vm" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("POST /api/resources - rejects invalid CPU value (400)", async () => {
    const res = await request(app)
      .post("/api/resources")
      .send({
        name:        "invalid-cpu-vm",
        type:        "Virtual Machine",
        region:      "us-east-1",
        cpuUsage:    150,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/cpu/i);
  });