import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";
import { LoadingContext } from "../../../context/LoadingProvider";
import { AuthError } from "../../../services/firebase/AuthError";
import { auth } from "../../../services/firebase/config";
import Button from "../../Button";
import Input from "../../Input";
import ForgotPassword from "./ForgotPassword";

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
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code.includes("password"))
        setError("password", { message: AuthError[error.code] });
      else setError("email", { message: AuthError[error.code] });
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='email'
          register={register}
          error={errors.email}
          placeholder='Email'
          icon={<AiOutlineMail />}
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
        <span className='forgot-password' onClick={() => setShowModal(true)}>
          Forgotten password ?
        </span>
        <Button type='submit'>Login</Button>
      </form>
      {showModal && <ForgotPassword setShowModal={setShowModal} />}
    </>
  );
}
