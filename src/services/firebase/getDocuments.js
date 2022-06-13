import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

export default async function getDocuments(
  collectionName,
  { condition = null, docID = null, limitNumber = 25 } = {},
) {
  if (docID) {
    const docSnap = await getDoc(doc(db, collectionName, docID));

    if (docSnap.exists()) return { ...docSnap.data(), id: docID };
    return null;
  }

  let q = query(collection(db, collectionName), limit(limitNumber));
  if (condition) {
    const { fieldName, operator, compareValue } = condition;
    q = query(
      collection(db, collectionName),
      where(fieldName, operator, compareValue),
      limit(limitNumber),
    );
  }
  const docs = await getDocs(q);

  const data = [];
  docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
  return data;
}
