import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Scholarships from "./pages/Scholarships";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarships" element={<Scholarships />} />
      </Routes>
    </>
  );
}

export default App;
