const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API route to serve data
app.get("/api/items", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data" });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
