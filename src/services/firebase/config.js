import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaJ4-pltFpSNR8EJ6HfFDO-O6VJ8ejI1s",
  authDomain: "chat-app-55b03.firebaseapp.com",
  projectId: "chat-app-55b03",
  storageBucket: "chat-app-55b03.appspot.com",
  messagingSenderId: "32023613446",
  appId: "1:32023613446:web:75f4d1049460340da97387",
  measurementId: "G-QNYPLE14FG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
