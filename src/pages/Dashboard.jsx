import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExerciseTracker from "../components/ExerciseTracker";
import DietTracker from "../components/DietTracker";
import ProgressReport from "../components/ProgressReport";
import GoalSetting from "../components/GoalSetting";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("fitUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      fetch(`http://localhost:8081/api/dashboard/${user.id}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => setEntries(Array.isArray(data) ? data : []))
        .catch(() => setEntries([]));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitUser");
    navigate("/");
  };

  const handleOnboarding = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("fitUser");
    if (!savedUser) return;
    const user = JSON.parse(savedUser);
    const today = new Date().toISOString().slice(0, 10);
    const payload = { userId: user.id, date: today, steps: 0, waterMl: 0, exerciseMinutes: 0, caloriesIntake: 0 };
    setStatus("Saving...");
    fetch("http://localhost:8081/api/dashboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then((r) => r.json().catch(() => ({})))
      .then(() => {
        setStatus("Saved");
        setShowEditModal(false);
        fetch(`http://localhost:8081/api/dashboard/${user.id}`)
          .then((r) => (r.ok ? r.json() : []))
          .then((data) => setEntries(Array.isArray(data) ? data : []))
          .catch(() => {});
      })
      .catch(() => setStatus("Save failed"));
  };

  if (!userData) {
    return (
      <div className="dashboard-container">
        <h1>Welcome to FitAAJ 🎉</h1>
        <p>Please login or register to continue.</p>
        <div style={{ marginTop: "12px" }}>
          <Link to="/login">Go to Login</Link> | <Link to="/register">Go to Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Fitness Dashboard</h1>
      {status && <p>{status}</p>}

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShowEditModal(true)} className="edit-btn">New Today Entry</button>
      </div>

      {/* Simple create entry modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Today Entry</h2>
            <form className="onboarding-form" onSubmit={handleOnboarding}>
              <button type="submit">Create</button>
              <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Recent Entries</h3>
        {entries.slice(0, 5).map((e) => (
          <div key={e.id}>Date: {e.date} | Steps: {e.steps ?? 0} | Water: {e.waterMl ?? 0} ml</div>
        ))}
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <Link to="/exercise"><ExerciseTracker /></Link>
        <Link to="/diet"><DietTracker /></Link>
        <Link to="/progress"><ProgressReport /></Link>
        <Link to="/goals"><GoalSetting /></Link>
      </div>
    </div>
  );
};

export default Dashboard;