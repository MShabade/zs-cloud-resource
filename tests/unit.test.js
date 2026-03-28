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

describe("READ - readById()", () => {
  test("returns the correct resource when ID exists", () => {
    const result = readById(sampleResources, "res-001");

    expect(result).not.toBeNull();
    expect(result.name).toBe("analytics-vm-01");
    expect(result.type).toBe("Virtual Machine");
  });

  test("returns null when ID does not exist", () => {
    const result = readById(sampleResources, "res-999");

    expect(result).toBeNull();
  });

  test("returns null for an empty array", () => {
    const result = readById([], "res-001");

    expect(result).toBeNull();
  });
});

describe("UPDATE - update()", () => {
  test("updates the specified fields of an existing resource", () => {
    const result = update(sampleResources, "res-001", { cpuUsage: 90, status: "idle" });

    expect(result).not.toBeNull();
    expect(result.updated.cpuUsage).toBe(90);
    expect(result.updated.status).toBe("idle");
  });

  test("preserves unmodified fields after update", () => {
    const result = update(sampleResources, "res-001", { cpuUsage: 90 });

    expect(result.updated.name).toBe("analytics-vm-01");
    expect(result.updated.region).toBe("us-east-1");
  });

  test("returns the updated resource in the new array", () => {
    const result = update(sampleResources, "res-002", { monthlyCost: 999 });

    const inArray = result.newArray.find((r) => r.id === "res-002");
    expect(inArray.monthlyCost).toBe(999);
  });

  test("returns null when ID does not exist", () => {
    const result = update(sampleResources, "res-999", { cpuUsage: 50 });

    expect(result).toBeNull();
  });

  test("does not mutate the original array", () => {
    const originalCPU = sampleResources[0].cpuUsage;
    update(sampleResources, "res-001", { cpuUsage: 99 });

    expect(sampleResources[0].cpuUsage).toBe(originalCPU);
  });
});

describe("DELETE - remove()", () => {
  test("removes the resource and returns it as 'deleted'", () => {
    const result = remove(sampleResources, "res-003");

    expect(result).not.toBeNull();
    expect(result.deleted.id).toBe("res-003");
    expect(result.deleted.name).toBe("backup-storage-01");
  });

  test("the new array no longer contains the deleted resource", () => {
    const result = remove(sampleResources, "res-003");

    const stillPresent = result.newArray.find((r) => r.id === "res-003");
    expect(stillPresent).toBeUndefined();
  });

  test("the new array length is one less than the original", () => {
    const result = remove(sampleResources, "res-001");

    expect(result.newArray).toHaveLength(sampleResources.length - 1);
  });

  test("returns null when ID does not exist", () => {
    const result = remove(sampleResources, "res-999");

    expect(result).toBeNull();
  });

  test("returns null for an empty array", () => {
    const result = remove([], "res-001");

    expect(result).toBeNull();
  });
});

describe("SEARCH - search()", () => {
  test("finds resources matching the name", () => {
    const result = search(sampleResources, "analytics");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("analytics-vm-01");
  });

  test("finds resources matching the type", () => {
    const result = search(sampleResources, "database");

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("Database");
  });

  test("finds resources matching the region", () => {
    const result = search(sampleResources, "eu-west-1");

    expect(result).toHaveLength(1);
    expect(result[0].region).toBe("eu-west-1");
  });

  test("finds resources matching the status", () => {
    const result = search(sampleResources, "idle");

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("idle");
  });

  test("search is case-insensitive", () => {
    const result = search(sampleResources, "VIRTUAL MACHINE");

    expect(result).toHaveLength(1);
  });

  test("returns empty array when no match found", () => {
    const result = search(sampleResources, "nonexistent-term");

    expect(result).toHaveLength(0);
  });

  test("returns all resources when query matches all", () => {
    const result = search(sampleResources, "us-east-1");

    expect(result).toHaveLength(2);
  });
});
