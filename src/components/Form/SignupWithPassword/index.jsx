import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";
import { LoadingContext } from "../../../context/LoadingProvider";
import addDocument from "../../../services/firebase/addDocument";
import { AuthError } from "../../../services/firebase/AuthError";
import { auth } from "../../../services/firebase/config";
import getUserData from "../../../utils/getUserData";
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
  const { setIsLoading } = useContext(LoadingContext);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await addDocument("users", getUserData(user), user.uid);
    } catch (error) {
      setError("email", { message: AuthError[error.code] });
    }
    setIsLoading(false);
  };

  return (
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
