import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "../../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginWithPhoneNumber } from "../../../services/firebase/LoginWithProvider";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup
  .object()
  .shape({
    phone: yup
      .string()
      .required("Phone is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

export default function PhoneNumberForm({ setConfirmation, nextFormStep }) {
  const recaptchaWrapperRef = useRef();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ phone }) => {
    console.log(phone);
    try {
      const ConfimationResult = await LoginWithPhoneNumber("+" + phone);
      setConfirmation(ConfimationResult);
      nextFormStep();
    } catch (error) {
      setError("phone", { message: error.code });
      recaptchaWrapperRef.current.innerHTML =
        '<div id="recaptcha-container"></div>';
    }
  };

  return (
    <>
      <h2 className='modal__header'>Your Phone!</h2>
      <p className='modal__description'>
        A 6 digit OTP will be sent via SMS to verify your mobile number
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='phone'
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <div className={`input-wrapper ${errors.phone ? "invalid" : ""}`}>
              <ReactPhoneInput
                {...field}
                inputExtraProps={{ ref }}
                country={"vn"}
                inputClass='input'
              />
              <p className='error-msg'>{errors.phone?.message}</p>
            </div>
          )}
        />

        <Button type='submit'>Send OTP</Button>
      </form>
      <div ref={recaptchaWrapperRef}>
        <div id='recaptcha-container'></div>
      </div>
    </>
  );
}
