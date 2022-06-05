import React from "react";
import OtpInput from "react-otp-input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../Button";

const schema = yup
  .object()
  .shape({
    otp: yup.string().required("OTP is required"),
  })
  .required();

export default function OtpForm({ confirmation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ otp }) => {
    try {
      const user = await confirmation.confirm(otp);
      console.log(user);
    } catch (error) {
      setError("otp", { message: error.code });
    }
  };

  return (
    <>
      <h2 className='modal__header'>OTP Verification</h2>
      <p className='modal__description'>Enter the OTP you received</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='otp'
          rules={{ required: true }}
          render={({ field: { ...field } }) => (
            <div className={`input-wrapper ${errors.otp ? "invalid" : ""}`}>
              <OtpInput
                {...field}
                numInputs={6}
                separator={<span>-</span>}
                containerStyle={{ justifyContent: "center" }}
                hasErrored={errors.otp}
                errorStyle={{
                  outline: "1px solid var(--error-text)",
                }}
                inputStyle={{
                  width: "2rem",
                  height: "2.5rem",
                  margin: "0 .3rem",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: "none",
                }}
                focusStyle={{
                  outline: "1px solid var(--input-focus)",
                  boxShadow: "0 0 5px var(--input-focus)",
                }}
              />
              <p className='error-msg'>{errors.otp?.message}</p>
            </div>
          )}
        />
        <Button type='submit'>Verify</Button>
      </form>
    </>
  );
}
