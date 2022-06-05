import React from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../component/Button";
import Card from "../../component/Card";
import Input from "../../component/Input";
import "./index.scss";

export default function SignupPage() {
  return (
    <div className='signup'>
      <div className='signup__header'>
        <h1 className='title'>Sign up</h1>
        <h2 className='content'>Connect with your friend now !</h2>
      </div>
      <Card className='signup__form'>
        {/* <Input placeholder='Display Name' icon={<AiOutlineUser />} />
        <Input placeholder='Username' icon={<AiOutlineUser />} />
        <Input
          password
          placeholder='Password'
          icon={{ show: <AiFillEye />, hide: <AiFillEyeInvisible /> }}
        /> */}
        <Button>Create Account</Button>
        <Button>Signup With Google</Button>
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
