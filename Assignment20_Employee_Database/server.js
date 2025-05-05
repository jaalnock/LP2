// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB (using a local database named 'employees')
// mongoose.connect('mongodb+srv://jaalnock:admin@cluster0.t8d5tpp.mongodb.net/', {
mongoose
  .connect("mongodb://localhost:27017/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

// Define a schema for employee records
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: Date,
});

// Create a model for the employee schema
const Employee = mongoose.model("Employee", employeeSchema);

// Route to add a new employee
app.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body); // Create a new employee document
    await employee.save(); // Save it to the database
    res.send("Employee added successfully.");
  } catch (err) {
    res.status(500).send("Error adding employee.");
  }
});

// Route to get all employee records
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employee records
    res.json(employees); // Send as JSON response
  } catch (err) {
    res.status(500).send("Error fetching employees.");
  }
});

// Route to update an employee's details by name
app.put("/employees/name/:name", async (req, res) => {
  try {
    const result = await Employee.updateOne(
      { name: req.params.name },
      req.body
    ); // Update employee by name
    if (result.matchedCount === 0) {
      return res.status(404).send("Employee not found.");
    }
    res.send("Employee details updated successfully.");
  } catch (err) {
    res.status(500).send("Error updating employee.");
  }
});

// Route to delete an employee by ID
app.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id); // Delete employee by ID
    res.send("Employee deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting employee.");
  }
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Employee Management Backend is Running.");
});

// Route to insert 5 sample employees (call only once)
app.post("/insert", async (req, res) => {
  try {
    await Employee.insertMany([
      {
        name: "Alice",
        department: "HR",
        designation: "Manager",
        salary: 60000,
        joiningDate: new Date("2022-01-15"),
      },
      {
        name: "Bob",
        department: "IT",
        designation: "Developer",
        salary: 70000,
        joiningDate: new Date("2021-09-01"),
      },
      {
        name: "Charlie",
        department: "Finance",
        designation: "Analyst",
        salary: 55000,
        joiningDate: new Date("2020-11-20"),
      },
      {
        name: "David",
        department: "Marketing",
        designation: "Executive",
        salary: 50000,
        joiningDate: new Date("2023-03-10"),
      },
      {
        name: "Eva",
        department: "IT",
        designation: "Team Lead",
        salary: 80000,
        joiningDate: new Date("2019-07-25"),
      },
    ]);
    res.send("5 employees inserted successfully.");
  } catch (err) {
    res.status(500).send("Error inserting employees.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
