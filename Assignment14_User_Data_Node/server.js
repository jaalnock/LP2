const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static HTML files
app.use(express.static("public"));

// API endpoint to get users
app.get("/api/users", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data file" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
