import React, { useState } from "react";
import { AiFillGoogleCircle, AiFillPhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import LoginWithPassword from "../../components/Form/LoginWithPassword";
import LoginWithPhone from "../../components/Form/LoginWithPhone";
import { loginWithGoogle } from "../../services/firebase/LoginWithProvider";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <AuthLayout>
      <LoginWithPassword />
      <div className='boundary'>
        <span>OR</span>
      </div>
      <Button onClick={async () => await loginWithGoogle()}>
        <AiFillGoogleCircle />
        Login With Google
      </Button>
      <Button onClick={() => setShowModal(true)}>
        <AiFillPhone />
        Login With Phone Number
      </Button>
      <span>
        Don't have an account?{" "}
        <Link className='link' to='/signup'>
          Register
        </Link>
      </span>
      {showModal && <LoginWithPhone setShowModal={setShowModal} />}
    </AuthLayout>
  );
}
