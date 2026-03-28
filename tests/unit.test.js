const { create, readById, update, remove, search } = require("../backend/operations");

const sampleResources = [
  {
    id: "res-001",
    name: "analytics-vm-01",
    type: "Virtual Machine",
    region: "us-east-1",
    cpuUsage: 72,
    memoryUsage: 65,
    storageGB: 500,
    monthlyCost: 245.5,
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "res-002",
    name: "data-platform-db",
    type: "Database",
    region: "eu-west-1",
    cpuUsage: 45,
    memoryUsage: 80,
    storageGB: 2000,
    monthlyCost: 580.0,
    status: "active",
    createdAt: "2025-02-10",
  },
  {
    id: "res-003",
    name: "backup-storage-01",
    type: "Storage",
    region: "us-east-1",
    cpuUsage: 5,
    memoryUsage: 10,
    storageGB: 5000,
    monthlyCost: 150.0,
    status: "idle",
    createdAt: "2025-01-20",
  },
];

describe("CREATE - create()", () => {
  test("adds a new resource to the array", () => {
    const newRes = { id: "res-new", name: "test-vm", type: "Virtual Machine" };
    const result = create(sampleResources, newRes);

    expect(result).toHaveLength(sampleResources.length + 1);
    expect(result[result.length - 1]).toEqual(newRes);
  });

  test("does not mutate the original array", () => {
    const original = [...sampleResources];
    const newRes = { id: "res-extra", name: "extra-vm" };
    create(sampleResources, newRes);

    expect(sampleResources).toHaveLength(original.length);
  });
});