// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

  mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

// Define a schema for book records
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String,
});

// Create a model for the book schema
const Book = mongoose.model("Book", bookSchema);

// Route to add a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body); // Create a new book document
    await book.save(); // Save it to the database
    res.send("Book added successfully.");
  } catch (err) {
    res.status(500).send("Error adding book.");
  }
});

// Route to insert 5 sample books (call only once)
app.post("/insert", async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 300,
        genre: "Fiction",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 350,
        genre: "Fiction",
      },
      {
        title: "1984",
        author: "George Orwell",
        price: 250,
        genre: "Dystopian",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 200,
        genre: "Classic",
      },
      {
        title: "Moby Dick",
        author: "Herman Melville",
        price: 400,
        genre: "Adventure",
      },
    ]);
    res.send("5 books inserted successfully.");
  } catch (err) {
    res.status(500).send("Error inserting books.");
  }
});

// Route to get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all book records
    res.json(books); // Send as JSON response
  } catch (err) {
    res.status(500).send("Error fetching books.");
  }
});

// Route to update a book's details by ID
app.put("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body); // Update book by ID
    res.send("Book details updated successfully.");
  } catch (err) {
    res.status(500).send("Error updating book.");
  }
});

// Route to delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id); // Delete book by ID
    res.send("Book deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting book.");
  }
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Bookstore Backend is Running.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
