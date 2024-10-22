import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ResetPasswordComponent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simulated original password for comparison (you would usually retrieve this from your backend or state)
  const originalPassword = localStorage.getItem("originalPassword") || "YourOriginalPassword"; // Replace with actual retrieval method

  const handleResetPassword = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("resetEmail");

    if (!storedEmail) {
      setError("No email found. Please go back and enter your email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password === originalPassword) {
      setError("New password cannot be the same as the original password.");
      return;
    }

    // Simulate password update (e.g., log to console)
    console.log(`Password for ${storedEmail} reset to ${password}`);

    // Clear stored email
    localStorage.removeItem("resetEmail");

    // Optionally clear original password or set it to the new password
    localStorage.setItem("originalPassword", password); // Update with new password for future comparisons

    setMessage("Password updated successfully!");
    setError("");
    setTimeout(() => {
      navigate("/signin"); // Redirect to sign-in page
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordComponent;
