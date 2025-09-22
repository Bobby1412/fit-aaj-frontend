import React from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="home-title">Start Your Fitness Journey Today 💪</h1>
        <p className="home-subtitle">
          Track your workouts, diet, water intake, and more — all in one place.
        </p>
        <button
          className="home-button"
          onClick={() => navigate("/register")} // 👈 Navigate to Register
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Our Features</h2>
        <div className="features-container">
          <FeatureCard
            icon="🏃"
            title="Track Steps"
            description="Monitor your daily step count and stay active."
          />
          <FeatureCard
            icon="💧"
            title="Water Intake"
            description="Log your daily water intake and stay hydrated."
          />
          <FeatureCard
            icon="🏋️"
            title="Workouts"
            description="Record exercises and monitor progress."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
