import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GoalsPage.css";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline) return;
    setGoals([...goals, { ...form, completed: false }]);
    setForm({ title: "", deadline: "" });
  };

  const toggleComplete = (index) => {
    const updated = [...goals];
    updated[index].completed = !updated[index].completed;
    setGoals(updated);
  };

  return (
    <div className="goals-page">
      <h2>Fitness Goals</h2>
      <Link to="/dashboard" className="back-link">⬅ Back to Dashboard</Link>

      {/* Add Goal Form */}
      <form onSubmit={handleSubmit} className="goal-form">
        <input
          type="text"
          name="title"
          placeholder="Enter Goal"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />
        <button type="submit">Add Goal</button>
      </form>

      {/* List of Goals */}
      <ul className="goal-list">
        {goals.map((goal, index) => (
          <li key={index} className={goal.completed ? "completed" : ""}>
            <span>
              {goal.title} - ⏳ {goal.deadline}
            </span>
            <button onClick={() => toggleComplete(index)}>
              {goal.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsPage;
