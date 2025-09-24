// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   

// ✅ Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ExercisePage from "./pages/ExercisePage";
import DietPage from "./pages/DietPage";
import ProgressPage from "./pages/ProgressPage";  // (we’ll create next)
import GoalsPage from "./pages/GoalsPage";        // (we’ll create later)
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router basename="/fitaaj">
      {/* Navbar is always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
