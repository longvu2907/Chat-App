import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import getDocuments from "./getDocuments";

export default async function addDocument(collectionName, data, docID = null) {
  if (docID) {
    const docRef = doc(db, collectionName, docID);
    const docData = await getDocuments(collectionName, { docID });

    if (docData) return await updateDoc(docRef, data);
    return await setDoc(docRef, { ...data, createdAt: Timestamp.now() });
  }

  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, { ...data, createdAt: Timestamp.now() });
}
