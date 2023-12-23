import React from "react";
import Button from "./Button";

const Header = (props) => {
  const { title, onAdd, showAddForm } = props;

  return (
    <header className="header">
      <h2>{title}</h2>
      <Button onClick={onAdd} text={showAddForm ? "Hide Form" : "Open Form"} />
    </header>
  );
};

export default Header;
