import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import * as yup from "yup";
import { LoadingContext } from "../../../context/LoadingProvider";
import { AuthError } from "../../../services/firebase/AuthError";
import { verifyOtp } from "../../../services/firebase/LoginWithProvider";
import Button from "../../Button";

const schema = yup
  .object()
  .shape({
    otp: yup.number().required("OTP is required"),
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
  const { setIsLoading } = useContext(LoadingContext);

  const onSubmit = async ({ otp }) => {
    setIsLoading(true);
    try {
      await verifyOtp(confirmation, otp);
    } catch (error) {
      setError("otp", { message: AuthError[error.code] });
    }
    setIsLoading(false);
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
                shouldAutoFocus={true}
                numInputs={6}
                separator={<span>-</span>}
                containerStyle={{ justifyContent: "center" }}
                hasErrored={errors.otp}
                isInputNum={true}
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
