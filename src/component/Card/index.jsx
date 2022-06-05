import React from "react";
import "./index.scss";

export default function Card({ children, className, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}
