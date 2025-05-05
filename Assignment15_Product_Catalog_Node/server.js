const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the cors package

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the "public" folder (for front-end)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get product details
app.get("/api/products", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read product data" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
