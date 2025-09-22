import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // we’ll style separately

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">FIT AAJ</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
