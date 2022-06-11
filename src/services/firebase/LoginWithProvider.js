import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import getUserData from "../../utils/getUserData";
import addDocument from "./addDocument";
import { auth } from "./config";

const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

const loginWithGoogle = async () => {
  try {
    const {
      _tokenResponse: { isNewUser },
      user,
    } = await signInWithPopup(auth, provider);

    if (isNewUser) {
      await addDocument("users", getUserData(user), user.uid);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginWithPhoneNumber = async phoneNumber => {
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

const verifyOtp = async (confirmation, otp) => {
  try {
    const {
      _tokenResponse: { isNewUser },
      user,
    } = await confirmation.confirm(otp);

    if (isNewUser) {
      addDocument("users", getUserData(user), user.uid);
    }
  } catch (error) {
    throw error;
  }
};

export { loginWithGoogle, loginWithPhoneNumber, verifyOtp };
