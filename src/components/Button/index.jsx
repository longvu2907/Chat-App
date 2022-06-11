import React from "react";
import "./index.scss";

export default function Button({ className, children, ...props }) {
  return (
    <div className={className}>
      <button {...props} className='btn'>
        {children}
      </button>
    </div>
  );
}
