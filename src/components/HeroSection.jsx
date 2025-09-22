import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // plain CSS for now

const Header = () => {
  return (
    <header className="header">
      <div className="logo">FIT-AAJ</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
