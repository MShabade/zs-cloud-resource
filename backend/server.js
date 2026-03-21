const express = require("express");
const cors = require("cors");
const path = require("path");
const resourceRoutes = require("./routes/resources");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/resources", resourceRoutes);

app.get("/api/rates", (req, res) => {
  const https = require("https");
  const url = "https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP,INR,JPY,AUD,CAD";

  https.get(url, (extRes) => {
    let raw = "";
    extRes.on("data", (chunk) => { raw += chunk; });
    extRes.on("end", () => {
      try {
        res.json(JSON.parse(raw));
      } catch (e) {
        res.status(500).json({ error: "Invalid response from rates API" });
      }
    });
  }).on("error", (err) => {
    res.status(502).json({ error: "Could not reach rates API: " + err.message });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
