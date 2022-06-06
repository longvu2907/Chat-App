import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import * as yup from "yup";
import { AuthError } from "../../../services/firebase/AuthError";
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

export default function SignupWithPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      setError("email", { message: AuthError[error.code] });
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
      <Input
        name='confirmPassword'
        register={register}
        error={errors.confirmPassword}
        type={showPassword ? "text" : "password"}
        placeholder='Confirm Password'
      />
      <Button type='submit'>Create Account</Button>
    </form>
  );
}
