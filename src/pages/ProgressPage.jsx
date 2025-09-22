import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import "./ProgressPage.css";

const ProgressPage = () => {
  // Sample dummy data (replace later with backend data or context)
  const exerciseData = [
    { day: "Mon", calories: 300, duration: 40 },
    { day: "Tue", calories: 450, duration: 50 },
    { day: "Wed", calories: 200, duration: 20 },
    { day: "Thu", calories: 500, duration: 60 },
    { day: "Fri", calories: 350, duration: 35 },
  ];

  const dietData = [
    { day: "Mon", calories: 1800, protein: 90 },
    { day: "Tue", calories: 2000, protein: 100 },
    { day: "Wed", calories: 1500, protein: 70 },
    { day: "Thu", calories: 2200, protein: 110 },
    { day: "Fri", calories: 1900, protein: 95 },
  ];

  return (
    <div className="progress-page">
      <h2>Progress Reports</h2>

      {/* Back to Dashboard */}
      <Link to="/dashboard">⬅ Back to Dashboard</Link>

      <div className="chart-container">
        {/* Exercise Chart */}
        <h3>Exercise (Calories Burned & Duration)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={exerciseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#ff7300" />
            <Line type="monotone" dataKey="duration" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        {/* Diet Chart */}
        <h3>Diet (Calories & Protein)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dietData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#8884d8" />
            <Bar dataKey="protein" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressPage;
