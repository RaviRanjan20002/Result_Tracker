
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// >> 
//   TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       25512
//   TCP    [::]:5000              [::]:0                 LISTENING       25512
// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// taskkill /PID 23996 /F

// SUCCESS: The process with PID 25512 has been terminated.
// PS D:\TestPlatform\backend> npm start


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/result_database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Connected to MongoDB!"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Define Mongoose Schema
// const resultSchema = new mongoose.Schema({
//   testDate: String,
//   name: String,
//   fatherName: String,
//   batch: String,
//   testType: String,
//   subjectMarks: {
//     physics: { correctMark: Number, incorrectMark: Number, totalMark: Number },
//     chemistry: { correctMark: Number, incorrectMark: Number, totalMark: Number },
//     mathematics: { correctMark: Number, incorrectMark: Number, totalMark: Number },
//   },
//   totalMarks: Number,
// });

// const Result = mongoose.model("Result", resultSchema);

// // ✅ API to Add Student Test Details
// app.post("/api/results", async (req, res) => {
//   try {
//     const result = new Result(req.body);
//     await result.save();
//     res.status(201).json({ message: "Result saved successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ API to Fetch Test Details by Student Name
// app.get("/api/results/:name", async (req, res) => {
//   try {
//     const results = await Result.find({ name: req.params.name });
//     if (results.length === 0) {
//       return res.status(404).json({ message: "No records found for this student." });
//     }
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ API to Fetch Unique Students (For Auto-Fill Feature)
// app.get("/api/students", async (req, res) => {
//   try {
//     const students = await Result.find().select("name fatherName batch -_id").lean();
//     const uniqueStudents = Object.values(
//       students.reduce((acc, student) => {
//         acc[student.name] = student;
//         return acc;
//       }, {})
//     );
//     res.status(200).json(uniqueStudents);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // API to fetch student details by name
// app.get("/api/students/:name", async (req, res) => {
//   try {
//     const student = await Result.findOne({ name: req.params.name }).select("fatherName batch -_id");
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Mongoose Schema
const resultSchema = new mongoose.Schema({
  testDate: String,
  name: String,
  fatherName: String,
  batch: String,
  testType: String,
  subjectMarks: {
    physics: { correctMark: Number, incorrectMark: Number, totalMark: Number },
    chemistry: { correctMark: Number, incorrectMark: Number, totalMark: Number },
    biology: { correctMark: Number, incorrectMark: Number, totalMark: Number },
    mathematics: { correctMark: Number, incorrectMark: Number, totalMark: Number },
  },
  totalMarks: Number,
});

const Result = mongoose.model("Result", resultSchema);

// ✅ API to Add Student Test Details
app.post("/api/results", async (req, res) => {
  try {
    let { testType, subjectMarks } = req.body;
    let totalMarks = 0;

    // Ensure only the correct subjects are stored
    if (testType === "neet") {
      totalMarks = subjectMarks.physics.totalMark + subjectMarks.chemistry.totalMark + subjectMarks.biology.totalMark;
      subjectMarks = {
        physics: subjectMarks.physics,
        chemistry: subjectMarks.chemistry,
        biology: subjectMarks.biology,
      }; // Remove Mathematics
    } else {
      totalMarks = subjectMarks.physics.totalMark + subjectMarks.chemistry.totalMark + subjectMarks.mathematics.totalMark;
      subjectMarks = {
        physics: subjectMarks.physics,
        chemistry: subjectMarks.chemistry,
        mathematics: subjectMarks.mathematics,
      }; // Remove Biology
    }

    const result = new Result({ ...req.body, subjectMarks, totalMarks });

    await result.save();
    res.status(201).json({ message: "Result saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Test Details by Student Name
app.get("/api/results/:name", async (req, res) => {
  try {
    const results = await Result.find({ name: req.params.name });
    if (results.length === 0) {
      return res.status(404).json({ message: "No records found for this student." });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Unique Students (For Auto-Fill Feature)
app.get("/api/students", async (req, res) => {
  try {
    const students = await Result.find().select("name fatherName batch -_id").lean();
    const uniqueStudents = Object.values(
      students.reduce((acc, student) => {
        acc[student.name] = student;
        return acc;
      }, {})
    );
    res.status(200).json(uniqueStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Student Details by Name
app.get("/api/students/:name", async (req, res) => {
  try {
    const student = await Result.findOne({ name: req.params.name }).select("fatherName batch -_id");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

