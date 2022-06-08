import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import SignupWithPassword from "../../components/Form/SignupWithPassword";

export default function SignupPage() {
  return (
    <div className='auth'>
      <div className='auth__header'>
        <h1 className='title'>Chat App</h1>
        <p className='content'>
          Chat App helps you connect with the people in your life.
        </p>
      </div>
      <Card className='auth__form'>
        <SignupWithPassword />
        <span>
          Already have an account?{" "}
          <Link className='link' to='/login'>
            Login
          </Link>
        </span>
      </Card>
    </div>
  );
}
