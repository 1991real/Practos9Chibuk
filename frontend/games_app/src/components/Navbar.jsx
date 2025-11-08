import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const buttonStyle = {
    marginRight: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#63a6eaff",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const navbarStyle = {
    position: "fixed",     
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#93a7deff",
    zIndex: 1000,
  };

  return (
    <div style={navbarStyle}>
      <button style={buttonStyle} onClick={() => navigate("/games")}>Games</button>
      <button style={buttonStyle} onClick={() => navigate("/news")}>News</button>
      <button style={buttonStyle} onClick={() => navigate("/about")}>About Us</button>
    </div>
  );
}

export default Navbar;
