import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExercisePage.css";



const ExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    calories: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.duration || !form.calories) return;
    setExercises([...exercises, form]);
    setForm({ name: "", duration: "", calories: "" });
  };

  const handleDelete = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // ✅ Summary calculation
  const totalDuration = exercises.reduce((acc, ex) => acc + Number(ex.duration), 0);
  const totalCalories = exercises.reduce((acc, ex) => acc + Number(ex.calories), 0);

  return (
    
    <div className="exercise-page">
      <h2>Exercise Tracker</h2>

      {/* Back to Dashboard */}
      <Link to="/dashboard">⬅ Back to Dashboard</Link>

      {/* Add Exercise Form */}
      <form onSubmit={handleSubmit} className="exercise-form">
        <input
          type="text"
          name="name"
          placeholder="Exercise Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories Burned"
          value={form.calories}
          onChange={handleChange}
        />
        <button type="submit">Add Exercise</button>
      </form>

      {/* ✅ Summary Section */}
      {exercises.length > 0 && (
        <div className="exercise-summary">
          Total Duration: <strong>{totalDuration} mins</strong> | Total Calories:{" "}
          <strong>{totalCalories} cal</strong>
        </div>
      )}

      {/* List of Exercises */}
      <ul className="exercise-list">
        {exercises.map((ex, index) => (
          <li key={index}>
            <span>
              {ex.name} - {ex.duration} mins - {ex.calories} cal
            </span>
            <button onClick={() => handleDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExercisePage;
