import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">FitAAJ</Link>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <div
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
