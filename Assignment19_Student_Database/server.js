const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://jaalnock:admin@cluster0.t8d5tpp.mongodb.net/', {
mongoose
  .connect("mongodb://localhost:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

// Define schema and model
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number,
});

const Student = mongoose.model("studentmarks", studentSchema);

// Insert sample students (only once)
app.get("/insert", async (req, res) => {
  await Student.insertMany([
    {
      Name: "ABC",
      Roll_No: 111,
      WAD_Marks: 25,
      CC_Marks: 25,
      DSBDA_Marks: 25,
      CNS_Marks: 25,
      AI_Marks: 25,
    },
    {
      Name: "XYZ",
      Roll_No: 112,
      WAD_Marks: 28,
      CC_Marks: 22,
      DSBDA_Marks: 30,
      CNS_Marks: 24,
      AI_Marks: 26,
    },
    {
      Name: "PQR",
      Roll_No: 113,
      WAD_Marks: 19,
      CC_Marks: 21,
      DSBDA_Marks: 18,
      CNS_Marks: 23,
      AI_Marks: 20,
    },
    {
      Name: "LMN",
      Roll_No: 114,
      WAD_Marks: 35,
      CC_Marks: 29,
      DSBDA_Marks: 32,
      CNS_Marks: 30,
      AI_Marks: 33,
    },
    {
      Name: "DEF",
      Roll_No: 115,
      WAD_Marks: 15,
      CC_Marks: 16,
      DSBDA_Marks: 12,
      CNS_Marks: 14,
      AI_Marks: 18,
    },
  ]);
  res.send("Students inserted.");
});

// Display total count and all documents
app.get("/students", async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.send(
    `<h3>Total Students: ${count}</h3><pre>${JSON.stringify(
      students,
      null,
      2
    )}</pre>`
  );
});

// Names of students with DSBDA > 20
app.get("/dsbda-above-20", async (req, res) => {
  const result = await Student.find(
    { DSBDA_Marks: { $gt: 20 } },
    { Name: 1, _id: 0 }
  );
  res.send(result.map((s) => s.Name).join("<br>"));
});

// Update specified student's marks by 10
app.put("/update/:name", async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10,
      },
    }
  );
  res.send(`Updated marks of ${req.params.name} by 10.`);
});

// List names with all subject marks > 25
app.get("/all-above-25", async (req, res) => {
  const students = await Student.find(
    {
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      AI_Marks: { $gt: 25 },
    },
    { Name: 1, _id: 0 }
  );
  res.send(students.map((s) => s.Name).join("<br>"));
});

// Names with <40 in both WAD (Maths) and CNS (Science)
app.get("/less-than-40", async (req, res) => {
  const students = await Student.find(
    {
      WAD_Marks: { $lt: 40 },
      CNS_Marks: { $lt: 40 },
    },
    { Name: 1, _id: 0 }
  );
  res.send(students.map((s) => s.Name).join("<br>"));
});

// Remove specified student
app.delete("/remove/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send(`Deleted student: ${req.params.name}`);
});

// Display all in tabular format
app.get("/table", async (req, res) => {
  const students = await Student.find();
  let html = `
    <table border="1" cellpadding="5">
      <tr><th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>
  `;
  students.forEach((s) => {
    html += `<tr>
      <td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td>
      <td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.CC_Marks}</td><td>${s.AI_Marks}</td>
    </tr>`;
  });
  html += "</table>";
  res.send(html);
});

app.get("/", (req, res) => res.send("Student Marks App Running!"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
