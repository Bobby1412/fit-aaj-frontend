import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // common css for login/register
import AlertDialog from "../components/AlertDialog";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    fetch("http://localhost:8081/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setMessage(data.message || "Login successful.");
          if (data.userId) {
            localStorage.setItem("fitUser", JSON.stringify({ id: data.userId, name: data.name, email }));
            // Notify other components (e.g., Navbar) in the same tab
            try { window.dispatchEvent(new Event("storage")); } catch (_) {}
          }
          setDialogOpen(true);
        } else {
          setMessage(data.message || "Login failed");
        }
      })
      .catch(() => setMessage("Network error"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p className="auth-footer">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <AlertDialog
        open={dialogOpen}
        title="localhost:9090 says"
        message={message || "Login successful. Welcome back!"}
        onClose={() => {
          setDialogOpen(false);
          navigate("/dashboard");
        }}
      />
    </div>
  );
};

export default Login;
