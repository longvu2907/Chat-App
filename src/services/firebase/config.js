import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCck_JK7BITsRDmkTbhUKq7k3GHh85bQes",
  authDomain: "todo-list-6ddaa.firebaseapp.com",
  databaseURL:
    "https://todo-list-6ddaa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-6ddaa",
  storageBucket: "todo-list-6ddaa.appspot.com",
  messagingSenderId: "522610170408",
  appId: "1:522610170408:web:ada2ab5c5dfd888626f31d",
  measurementId: "G-04PYZ6CYTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
