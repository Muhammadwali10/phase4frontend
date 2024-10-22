import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-popup">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Log when the form is submitted

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("https://phase4backend-1-w06d.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response:", response); // Log the response

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setSuccess("User registered successfully!");
        setError("");
        setShowModal(true);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else if (response.status === 409) {
        setError("Account already exists. Please use a different email or log in.");
        setSuccess("");
      } else {
        setError("An error occurred. Please try again.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error during signup:", error); // Log the error
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/signin">Log in here</a>.
      </p>
      {showModal && (
        <Modal
          message={success}
          onClose={() => {
            setShowModal(false);
            setSuccess(""); // Clear success message when closing the modal
          }}
        />
      )}
    </div>
  );
}

export default SignUpComponent;
