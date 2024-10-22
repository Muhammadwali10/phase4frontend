import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Simulate storing the new password
    localStorage.setItem("password", newPassword);
    setMessage("Password reset successfully! Please sign in.");

    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
        />
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Remember your password? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordComponent;
