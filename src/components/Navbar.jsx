import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarImg from "../assets/default-avatar.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("fitUser"));
  const [userEmail, setUserEmail] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("fitUser") || "null");
      return u?.email || "";
    } catch {
      return "";
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => {
      const raw = localStorage.getItem("fitUser");
      setIsLoggedIn(!!raw);
      try {
        const u = JSON.parse(raw || "null");
        setUserEmail(u?.email || "");
      } catch {
        setUserEmail("");
      }
    };
    window.addEventListener("storage", onStorage);
    // Initialize from current storage
    onStorage();
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitUser");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">FitAAJ</Link>
      </div>

      {isLoggedIn ? (
        <div className="navbar-actions">
          <img src={avatarImg} alt="user" className="navbar-avatar" />
          {userEmail && <span className="navbar-user">{userEmail}</span>}
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}

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
