import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
      <h2>My App</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
