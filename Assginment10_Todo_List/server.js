const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("."));
app.use(express.json());

let tasks = [
  { id: 1, text: "Buy groceries" },
  { id: 2, text: "Do laundry" },
  { id: 3, text: "Study for test" }
];
let idCounter = 4;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a task
app.post("/tasks", (req, res) => {
  const task = { id: idCounter++, text: req.body.text };
  tasks.push(task);
  res.status(201).json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).end();
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
