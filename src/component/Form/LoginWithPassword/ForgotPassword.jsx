import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";
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

  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordSent(true);
    } catch (error) {
      setError("email", { message: AuthError[error.code] });
    }
  };

  return (
    <Modal {...props}>
      {passwordSent ? (
        <>
          <h2>Password reset email sent</h2>
          <Button onClick={() => setIsShowModal(false)}>Done</Button>
        </>
      ) : (
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
      )}
    </Modal>
  );
}
