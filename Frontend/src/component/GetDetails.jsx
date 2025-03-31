import React, { useState } from "react";
import axios from "axios";

const GetDetails = () => {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`https://result-tracker-5.onrender.com/api/results/${name}`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h2>Search Student Results</h2>
      <input type="text" placeholder="Enter Student Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={fetchResults}>Search</button>

      {results.length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Test Date</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Batch</th>
              <th>Test Type</th>
              <th>Physics (Correct)</th>
              <th>Physics (Incorrect)</th>
              <th>Physics (Total)</th>
              <th>Chemistry (Correct)</th>
              <th>Chemistry (Incorrect)</th>
              <th>Chemistry (Total)</th>
              <th>Mathematics (Correct)</th>
              <th>Mathematics (Incorrect)</th>
              <th>Mathematics (Total)</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.testDate}</td>
                <td>{result.name}</td>
                <td>{result.fatherName}</td>
                <td>{result.batch}</td>
                <td>{result.testType}</td>
                <td>{result.subjectMarks.physics.correctMark}</td>
                <td>{result.subjectMarks.physics.incorrectMark}</td>
                <td>{result.subjectMarks.physics.totalMark}</td>
                <td>{result.subjectMarks.chemistry.correctMark}</td>
                <td>{result.subjectMarks.chemistry.incorrectMark}</td>
                <td>{result.subjectMarks.chemistry.totalMark}</td>
                <td>{result.subjectMarks.mathematics.correctMark}</td>
                <td>{result.subjectMarks.mathematics.incorrectMark}</td>
                <td>{result.subjectMarks.mathematics.totalMark}</td>
                <td>{result.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>    
  );
};

export default GetDetails;

