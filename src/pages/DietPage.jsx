// src/pages/DietPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DietPage.css";

const DietPage = () => {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    calories: "",
    meal: "Breakfast"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.calories) return;
    setFoods([...foods, form]);
    setForm({ name: "", calories: "", meal: "Breakfast" });
  };

  const totalCalories = foods.reduce((sum, f) => sum + Number(f.calories), 0);

  return (
    <div className="diet-page">
      <h2>Diet Tracker</h2>

      {/* Back to Dashboard */}
      <Link to="/dashboard">⬅ Back to Dashboard</Link>

      {/* Add Food Form */}
      <form onSubmit={handleSubmit} className="diet-form">
        <input
          type="text"
          name="name"
          placeholder="Food Item"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
        />
        <select name="meal" value={form.meal} onChange={handleChange}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
        <button type="submit">Add Food</button>
      </form>

      {/* Food List */}
      <ul className="diet-list">
        {foods.map((food, index) => (
          <li key={index}>
            {food.meal}: {food.name} - {food.calories} cal
          </li>
        ))}
      </ul>

      {/* Total Calories */}
      <div className="total-calories">
        <strong>Total Calories: {totalCalories} cal</strong>
      </div>
    </div>
  );
};

export default DietPage;
