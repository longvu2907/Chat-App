import React from "react";
import "./index.scss";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className='btn'>
      {children}
    </button>
  );
}
