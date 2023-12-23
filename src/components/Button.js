import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      style={{ backgroundColor: "red", fontWeight: "bold" }}
      onClick={onClick}
      className="btn"
    >
      {text}
    </button>
  );
};

export default Button;
