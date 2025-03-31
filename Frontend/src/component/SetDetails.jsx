// import React, { useState } from "react";
// import axios from "axios";

// const SetDetails = () => {
//   const [formData, setFormData] = useState({
//     testDate: "",
//     name: "",
//     fatherName: "",
//     batch: "bhim",
//     testType: "jeemains",
//     subjectMarks: {
//       physics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
//       chemistry: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
//       mathematics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
//     },
//     totalMarks: 0,
//   });

//   // Function to fetch student details when the name is entered
//   const fetchStudentDetails = async (name) => {
//     if (name.length < 3) return; // Avoid unnecessary API calls for short inputs
//     try {
//       const response = await axios.get(`http://localhost:5000/api/students/${name}`);
//       setFormData((prevData) => ({
//         ...prevData,
//         fatherName: response.data.fatherName,
//         batch: response.data.batch,
//       }));
//     } catch (error) {
//       console.log("Student not found, allowing new entry.");
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Update formData for all fields normally
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
  
//     // Fetch student details only when entering a name
//     if (name === "name") {
//       fetchStudentDetails(value);
//     }
//   };
  
//   const handleSubjectChange = (subject, field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       subjectMarks: {
//         ...prevData.subjectMarks,
//         [subject]: {
//           ...prevData.subjectMarks[subject],
//           [field]: Number(value),
//         },
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const totalMarks =
//       formData.subjectMarks.physics.totalMark +
//       formData.subjectMarks.chemistry.totalMark +
//       formData.subjectMarks.mathematics.totalMark;

//     try {
//       await axios.post("http://localhost:5000/api/results", {
//         ...formData,
//         totalMarks,
//       });
//       alert("Result Saved!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Set Student Details</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="date" name="testDate" onChange={handleChange} required />

//         <input
//           type="text"
//           name="name"
//           placeholder="Student Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

// <input
//   type="text"
//   name="fatherName"
//   placeholder="Father's Name"
//   value={formData.fatherName}
//   onChange={handleChange}  // Now updates properly for new entries
//   required
// />
//         <select name="batch" onChange={handleChange} value={formData.batch}>
//           <option value="Arjun">Arjun</option>
//           <option value="Eklavya">Eklavya</option>
//           <option value="Bhism">Bhism</option>
//           <option value="Bheem">Bheem</option>
//           <option value="Madhav">Madhav</option>
//           <option value="Dron">Dron</option>
//           <option value="Nakul">Nakul</option>
//           <option value="Toppers">Toppers</option>
//         </select>

//         <select name="testType" onChange={handleChange}>
//           <option value="jeemains">JEE Mains</option>
//           <option value="jeeadvanced">JEE Advanced</option>
//           <option value="neet">NEET</option>
//           <option value="topictest">Topic Test</option>
//           <option value="quiztest">Quiz Test</option>
//         </select>

//         {["physics", "chemistry", "mathematics"].map((subject) => (
//           <div key={subject}>
//             <h4>{subject.toUpperCase()}</h4>
//             <input
//               type="number"
//               placeholder="Correct"
//               onChange={(e) => handleSubjectChange(subject, "correctMark", e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Incorrect"
//               onChange={(e) => handleSubjectChange(subject, "incorrectMark", e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Total Marks"
//               onChange={(e) => handleSubjectChange(subject, "totalMark", e.target.value)}
//             />
//           </div>
//         ))}

//         <button type="submit">Save Details</button>
//       </form>
//     </div>
//   );
// };

// export default SetDetails;









import React, { useState } from "react";
import axios from "axios";
import "../styles/SetDetails.css"; // Assuming you have a CSS file for styling
const SetDetails = () => {
  const [formData, setFormData] = useState({
    testDate: "",
    name: "",
    fatherName: "",
    batch: "bhim",
    testType: "jeemains",
    subjectMarks: {
      physics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
      chemistry: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
      biology: { correctMark: 0, incorrectMark: 0, totalMark: 0 }, // Added biology
      mathematics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
    },
    totalMarks: 0,
  });

  const fetchStudentDetails = async (name) => {
    if (name.length < 3) return;
    try {
      const response = await axios.get(`https://result-tracker-5.onrender.com/api/students/${name}`);
      setFormData((prevData) => ({
        ...prevData,
        fatherName: response.data.fatherName,
        batch: response.data.batch,
      }));
    } catch (error) {
      console.log("Student not found, allowing new entry.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "name") {
      fetchStudentDetails(value);
    }
  };

  const handleSubjectChange = (subject, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      subjectMarks: {
        ...prevData.subjectMarks,
        [subject]: {
          ...prevData.subjectMarks[subject],
          [field]: Number(value),
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalMarks =
      formData.subjectMarks.physics.totalMark +
      formData.subjectMarks.chemistry.totalMark +
      (formData.testType === "neet"
        ? formData.subjectMarks.biology.totalMark
        : formData.subjectMarks.mathematics.totalMark);

    try {
      await axios.post("https://result-tracker-5.onrender.com/api/results", {
        ...formData,
        totalMarks,
      });
      alert("Result Saved!");
          // ✅ Reset form fields after saving
    setFormData({
      testDate: "",
      name: "",
      fatherName: "",
      batch: "Arjun",
      testType: "jeemains",
      subjectMarks: {
        physics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
        chemistry: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
        biology: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
        mathematics: { correctMark: 0, incorrectMark: 0, totalMark: 0 },
      },
      totalMarks: 0,
    });
    // ✅ Reset form inputs visually (force update in case of UI issues)
    document.getElementById("student-form").reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Set Student Details</h2>
      <form id="student-form" onSubmit={handleSubmit}>
        <input type="date" name="testDate" onChange={handleChange} required />

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />

        <select name="batch" onChange={handleChange} value={formData.batch}>
          <option value="Arjun">Arjun</option>
          <option value="Eklavya">Eklavya</option>
          <option value="Bhism">Bhism</option>
          <option value="Bheem">Bheem</option>
          <option value="Madhav">Madhav</option>
          <option value="Dron">Dron</option>
          <option value="Nakul">Nakul</option>
          <option value="Toppers">Toppers</option>
        </select>

        <select name="testType" onChange={handleChange} value={formData.testType}>
          <option value="jeemains">JEE Mains</option>
          <option value="jeeadvanced">JEE Advanced</option>
          <option value="neet">NEET</option>
          <option value="topictest">Topic Test</option>
          <option value="quiztest">Quiz Test</option>
        </select>

        {/* Always show Physics & Chemistry */}
        {["physics", "chemistry"].map((subject) => (
          <div key={subject}>
            <h4>{subject.toUpperCase()}</h4>
            <input
              type="number"
              placeholder="Correct"
              onChange={(e) => handleSubjectChange(subject, "correctMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Incorrect"
              onChange={(e) => handleSubjectChange(subject, "incorrectMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Marks"
              onChange={(e) => handleSubjectChange(subject, "totalMark", e.target.value)}
            />
          </div>
        ))}

        {/* Conditionally show Mathematics or Biology */}
        {formData.testType === "neet" ? (
          <div>
            <h4>BIOLOGY</h4>
            <input
              type="number"
              placeholder="Correct"
              onChange={(e) => handleSubjectChange("biology", "correctMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Incorrect"
              onChange={(e) => handleSubjectChange("biology", "incorrectMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Marks"
              onChange={(e) => handleSubjectChange("biology", "totalMark", e.target.value)}
            />
          </div>
        ) : (
          <div>
            <h4>MATHEMATICS</h4>
            <input
              type="number"
              placeholder="Correct"
              onChange={(e) => handleSubjectChange("mathematics", "correctMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Incorrect"
              onChange={(e) => handleSubjectChange("mathematics", "incorrectMark", e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Marks"
              onChange={(e) => handleSubjectChange("mathematics", "totalMark", e.target.value)}
            />
          </div>
        )}

        <button type="submit">Save Details</button>
      </form>
    </div>
  );
};

export default SetDetails;
