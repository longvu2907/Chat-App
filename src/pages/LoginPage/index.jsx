import React, { useState } from "react";
import { AiFillGoogleCircle, AiFillPhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../component/Button";
import Card from "../../component/Card";
import LoginWithPassword from "../../component/Form/LoginWithPassword";
import LoginWithPhone from "../../component/Form/LoginWithPhone";
import { LoginWithGoogle } from "../../services/firebase/LoginWithProvider";
import "./index.scss";

export default function LoginPage() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className='auth'>
      <div className='auth__header'>
        <h1 className='title'>Chat App</h1>
        <p className='content'>
          Chat App helps you connect with the people in your life.
        </p>
      </div>
      <Card className='auth__form'>
        <LoginWithPassword />
        <div className='boundary'>
          <span>OR</span>
        </div>
        <Button onClick={LoginWithGoogle}>
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
      </Card>
      {isShowModal && <LoginWithPhone setIsShowModal={setIsShowModal} />}
    </div>
  );
}
