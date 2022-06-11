import React from "react";
import "./index.scss";

export default function Input({
  name,
  icon,
  error,
  onIconClick,
  register,
  className,
  ...props
}) {
  return (
    <div className={`input-wrapper ${error ? "invalid" : ""}`}>
      <input
        className={`input ${className}`}
        id={name}
        {...(register && register(name))}
        {...props}
      />
      {icon && (
        <label htmlFor={name} onClick={onIconClick}>
          <i className={`icon ${onIconClick ? "clickable" : ""}`}>{icon}</i>
        </label>
      )}
      <p className='error-msg'>{error?.message}</p>
    </div>
  );
}
