import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import SignupWithPassword from "../../components/Form/SignupWithPassword";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupWithPassword />
      <span>
        Already have an account?{" "}
        <Link className='link' to='/login'>
          Login
        </Link>
      </span>
    </AuthLayout>
  );
}
