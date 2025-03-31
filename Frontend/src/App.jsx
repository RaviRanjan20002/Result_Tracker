import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetDetails from "../src/component/SetDetails";
import GetDetails from "../src/component/GetDetails";
import Dummy from "../src/component/Dummy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetDetails/>} />
        <Route path="/getdetails" element={<GetDetails />} />
        <Route path="/d" element={<Dummy />} />
      </Routes>
    </Router>
  );
}

export default App;

