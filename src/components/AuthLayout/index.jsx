import React from "react";
import Card from "../Card";
import "./index.scss";

export default function AuthLayout({
  logoText = "Chat App",
  headerText = "Chat App helps you connect with the people in your life.",
  children,
}) {
  return (
    <div className='auth'>
      <div className='auth__header'>
        <h1 className='logo-text'>{logoText}</h1>
        <p className='header-text'>{headerText}</p>
      </div>
      <Card className='auth__form'>{children}</Card>
    </div>
  );
}
