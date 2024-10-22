import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function ProfileComponent() {
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || ""
  );
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
      localStorage.setItem("profilePicture", reader.result);
      console.log("Profile picture updated:", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem("name", newName);
    console.log("Name updated:", newName);
  };

  useEffect(() => {
    console.log("Current profile picture:", profilePicture);
  }, [profilePicture]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture-container">
        <img
          src={profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>
      <Link to="/" className="back-button">
        Back to Home
      </Link>
    </div>
  );
}

export default ProfileComponent;
