const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { create, readById, update, remove, search } = require("../operations");

const DATA_FILE = process.env.DATA_FILE
  ? path.resolve(process.env.DATA_FILE)
  : path.join(__dirname, "../data/resources.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeData(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}


router.get("/", (req, res) => {
  let resources = readData();
  const query = req.query.search ? req.query.search.trim() : "";

  if (query) {
    resources = search(resources, query);
  }

  res.json(resources);
});


router.get("/:id", (req, res) => {
  const resources = readData();
  const resource = readById(resources, req.params.id);

  if (!resource) {
    return res.status(404).json({ error: "Resource not found" });
  }

  res.json(resource);
});


router.post("/", (req, res) => {
  const {
    name,
    type,
    region,
    cpuUsage,
    memoryUsage,
    storageGB,
    monthlyCost,
    status,
  } = req.body;

  if (!name || !type || !region) {
    return res
      .status(400)
      .json({ error: "Name, type, and region are required" });
  }

  const cpu = Number(cpuUsage) || 0;
  const mem = Number(memoryUsage) || 0;

  if (cpu < 0 || cpu > 100) {
    return res
      .status(400)
      .json({ error: "CPU usage must be between 0 and 100" });
  }
  if (mem < 0 || mem > 100) {
    return res
      .status(400)
      .json({ error: "Memory usage must be between 0 and 100" });
  }