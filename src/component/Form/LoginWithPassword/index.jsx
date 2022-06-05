import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import * as yup from "yup";
import { auth } from "../../../services/firebase/config";
import Button from "../../Button";
import Input from "../../Input";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

export default function LoginWithPassword() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { errors } = formState;

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name='email'
        register={register}
        error={errors.email}
        placeholder='Username'
        icon={<AiOutlineUser />}
      />
      <Input
        name='password'
        register={register}
        error={errors.password}
        type={showPassword ? "text" : "password"}
        placeholder='Password'
        icon={showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        onIconClick={() => setShowPassword(prev => !prev)}
      />
      <Button type='submit'>Login</Button>
    </form>
  );
}
