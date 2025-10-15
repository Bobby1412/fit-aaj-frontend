import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
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
  const [newEntry, setNewEntry] = useState({
    steps: 0,
    waterMl: 0,
    exerciseMinutes: 0,
    caloriesIntake: 0
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("fitUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      fetch(apiUrl(`/api/dashboard/${user.id}`))
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
    const payload = { 
      userId: user.id, 
      date: today, 
      steps: newEntry.steps, 
      waterMl: newEntry.waterMl, 
      exerciseMinutes: newEntry.exerciseMinutes, 
      caloriesIntake: newEntry.caloriesIntake 
    };
    setStatus("Saving...");
    fetch(apiUrl("/api/dashboard"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then((r) => r.json().catch(() => ({})))
      .then(() => {
        setStatus("Saved");
        setShowEditModal(false);
        setNewEntry({ steps: 0, waterMl: 0, exerciseMinutes: 0, caloriesIntake: 0 });
        fetch(apiUrl(`/api/dashboard/${user.id}`))
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

      {/* Create entry modal with input fields */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Today Entry</h2>
            <form className="onboarding-form" onSubmit={handleOnboarding}>
              <div className="form-group">
                <label htmlFor="steps">Steps:</label>
                <input
                  type="number"
                  id="steps"
                  value={newEntry.steps}
                  onChange={(e) => setNewEntry({...newEntry, steps: parseInt(e.target.value) || 0})}
                  placeholder="Enter steps"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="water">Water (ml):</label>
                <input
                  type="number"
                  id="water"
                  value={newEntry.waterMl}
                  onChange={(e) => setNewEntry({...newEntry, waterMl: parseInt(e.target.value) || 0})}
                  placeholder="Enter water intake"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="exercise">Exercise (minutes):</label>
                <input
                  type="number"
                  id="exercise"
                  value={newEntry.exerciseMinutes}
                  onChange={(e) => setNewEntry({...newEntry, exerciseMinutes: parseInt(e.target.value) || 0})}
                  placeholder="Enter exercise minutes"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="calories">Calories Intake:</label>
                <input
                  type="number"
                  id="calories"
                  value={newEntry.caloriesIntake}
                  onChange={(e) => setNewEntry({...newEntry, caloriesIntake: parseInt(e.target.value) || 0})}
                  placeholder="Enter calories"
                  min="0"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit">Create Entry</button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
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