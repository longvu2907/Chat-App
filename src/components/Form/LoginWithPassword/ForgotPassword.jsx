import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";
import { LoadingContext } from "../../../context/LoadingProvider";
import { AuthError } from "../../../services/firebase/AuthError";
import { auth } from "../../../services/firebase/config";
import Button from "../../Button";
import Input from "../../Input";
import Modal from "../../Modal";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
  })
  .required();

export default function ForgotPassword(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [passwordSent, setPasswordSent] = useState(false);
  const { setIsShowModal } = props;
  const { setIsLoading } = useContext(LoadingContext);

  const onSubmit = async ({ email }) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordSent(true);
    } catch (error) {
      setError("email", { message: AuthError[error.code] });
    }
    setIsLoading(false);
  };

  return (
    <Modal {...props}>
      {passwordSent ? (
        <>
          <h2 className='modal__header'>Password reset email sent</h2>
          <Button onClick={() => setIsShowModal(false)}>Done</Button>
        </>
      ) : (
        <>
          <h2 className='modal__header'>Reset Your Password</h2>
          <p className='modal__description'>
            Please enter your email address to send password reset email.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='email'
              register={register}
              error={errors.email}
              placeholder='Email'
              icon={<AiOutlineMail />}
            />
            <Button type='submit'>Send password reset email</Button>
          </form>
        </>
      )}
    </Modal>
  );
}
