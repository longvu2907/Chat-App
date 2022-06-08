import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

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
export const db = getFirestore(app);
export default app;

// getDocs(collection(db, "users")).then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// });

// const message = {
//   createdAt: Timestamp.now(),
//   uid: "123",
//   roomID: "ouwUXJi1qoGsiqGMpBve",
//   text: "hahaha",
// };

// const seens = {
//   seenAt: message.createdAt,
//   uid: message.uid,
// };

// updateDoc(doc(db, "rooms", message.roomID), {
//   messages: arrayUnion(message),
//   seens: seens,
// }).then(() => {});

// const q = query(collection(db, "users"));
// getDocs(q).then(querySnapshot => {
//   querySnapshot.forEach(d => console.log(d.data()));
// });

// const unsubscribe = onSnapshot(q, snapshot => {
//   snapshot.docChanges().forEach(change => {
//     if (change.type === "added") {
//       console.log("New user: ", change.doc.data());
//     }
//     if (change.type === "modified") {
//       console.log("Modified user: ", change.doc.data());
//     }
//     if (change.type === "removed") {
//       console.log("Removed user: ", change.doc.data());
//     }
//   });
//   // const users = [];
//   // snapshot.forEach(doc => {
//   //   users.push(doc.data());
//   // });
//   // users.forEach(user => console.log(user));
// });
