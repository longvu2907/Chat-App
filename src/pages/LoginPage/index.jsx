import React, { useState } from "react";
import { AiFillGoogleCircle, AiFillPhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import LoginWithPassword from "../../components/Form/LoginWithPassword";
import LoginWithPhone from "../../components/Form/LoginWithPhone";
import { loginWithGoogle } from "../../services/firebase/LoginWithProvider";

export default function LoginPage() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <AuthLayout>
      <LoginWithPassword />
      <div className='boundary'>
        <span>OR</span>
      </div>
      <Button onClick={loginWithGoogle}>
        <AiFillGoogleCircle />
        Login With Google
      </Button>
      <Button onClick={() => setIsShowModal(true)}>
        <AiFillPhone />
        Login With Phone Number
      </Button>
      <span>
        Don't have an account?{" "}
        <Link className='link' to='/signup'>
          Register
        </Link>
      </span>
      {isShowModal && <LoginWithPhone setIsShowModal={setIsShowModal} />}
    </AuthLayout>
  );
}
