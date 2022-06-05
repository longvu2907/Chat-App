import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

const LoginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

const LoginWithPhoneNumber = async phoneNumber => {
  const appVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" },
    auth,
  );
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier,
    );
    appVerifier.clear();
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    appVerifier.clear();
    throw error;
  }
};

export { LoginWithGoogle, LoginWithPhoneNumber };
