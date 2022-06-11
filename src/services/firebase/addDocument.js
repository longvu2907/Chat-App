import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export default async function addDocument(collectionName, data, docID = null) {
  const docData = {
    ...data,
    createdAt: Timestamp.now(),
  };

  if (docID) {
    const docRef = doc(db, collectionName, docID);
    const data = await getDoc(docRef);
    if (data.data()) await updateDoc(docRef, docData);
    else await setDoc(docRef, docData);
    return;
  }

  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, docData);
}
