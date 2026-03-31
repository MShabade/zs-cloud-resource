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

  test("GET /api/resources - returns an array of all resources (200)", async () => {
    const res = await request(app).get("/api/resources");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/resources/:id - returns the correct resource (200)", async () => {
    const res = await request(app).get(`/api/resources/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.name).toBe("integration-vm");
  });

  test("GET /api/resources/:id - returns 404 for unknown ID", async () => {
    const res = await request(app).get("/api/resources/nonexistent-id");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /api/resources?search= - filters results by search term (200)", async () => {
    const res = await request(app).get("/api/resources?search=integration");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain("integration");
  });

  test("GET /api/resources?search= - returns empty array when no match", async () => {
    const res = await request(app).get("/api/resources?search=zzznomatch999");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  test("PUT /api/resources/:id - updates specified fields (200)", async () => {
    const res = await request(app)
      .put(`/api/resources/${createdId}`)
      .send({ cpuUsage: 85, status: "idle" });

    expect(res.status).toBe(200);
    expect(res.body.cpuUsage).toBe(85);
    expect(res.body.status).toBe("idle");
    expect(res.body.name).toBe("integration-vm");
  });

  test("PUT /api/resources/:id - returns 404 for unknown ID", async () => {
    const res = await request(app)
      .put("/api/resources/nonexistent-id")
      .send({ cpuUsage: 50 });

    expect(res.status).toBe(404);
  });

  test("DELETE /api/resources/:id - removes the resource (200)", async () => {
    const res = await request(app).delete(`/api/resources/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Resource deleted successfully");
    expect(res.body.resource.id).toBe(createdId);
  });

  test("GET /api/resources/:id - returns 404 after deletion", async () => {
    const res = await request(app).get(`/api/resources/${createdId}`);

    expect(res.status).toBe(404);
  });

  test("DELETE /api/resources/:id - returns 404 for unknown ID", async () => {
    const res = await request(app).delete("/api/resources/nonexistent-id");

    expect(res.status).toBe(404);
  });
});
