import React from "react";
import "./button.css";

function Button({ children, ...props }) {
  return (
    <>
      <button className="button" {...props}>
        {children}
      </button>
    </>
  );
}

export default Button;
