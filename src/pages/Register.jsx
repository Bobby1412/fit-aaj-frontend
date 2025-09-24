import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // same css we used for login
import AlertDialog from "../components/AlertDialog";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    fetch("http://localhost:9090/fitaaj-backend/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setMessage(data.message || "Signup successful! Please login.");
          if (data.userId) {
            localStorage.setItem("fitUser", JSON.stringify({ id: data.userId, name: data.name, email }));
            try { window.dispatchEvent(new Event("storage")); } catch (_) {}
          }
          setDialogOpen(true);
        } else {
          setMessage(data.message || "Signup failed");
        }
      })
      .catch(() => setMessage("Network error"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <AlertDialog
        open={dialogOpen}
        title="localhost:9090 says"
        message={message || "Signup successful! Please login."}
        onClose={() => {
          setDialogOpen(false);
          navigate("/login");
        }}
      />
    </div>
  );
};

export default Register;
