import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "../context/LoadingProvider";
import { db } from "../services/firebase/config";

export default function useFirestore(
  collectionName,
  { condition = null, orderByField = "createdAt", sortedIn = "desc" } = {},
) {
  const firstGetData = useRef(true);
  const [documents, setDocuments] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    firstGetData.current = true;

    const collectionRef = collection(db, collectionName);

    let q = query(collectionRef, orderBy(orderByField, sortedIn));

    if (condition) {
      const { fieldName, operator, compareValue } = condition;
      q = query(
        collectionRef,
        where(fieldName, operator, compareValue),
        orderBy(orderByField, sortedIn),
      );
      setDocuments([]);
    }

    const unsubscribe = onSnapshot(q, snapshot => {
      snapshot
        .docChanges()
        .reverse()
        .forEach(change => {
          const data = {
            ...change.doc.data(),
            newData: !firstGetData.current,
            id: change.doc.id,
          };
          if (change.type === "added") {
            setDocuments(prev => [data, ...prev]);
          }

          if (change.type === "modified") {
            setDocuments(prev =>
              prev.map(prevData => {
                if (prevData.id === change.doc.id) return data;
                return prevData;
              }),
            );
          }

          if (change.type === "removed") {
            setDocuments(prev =>
              prev.filter(prevData => prevData.id !== change.doc.id),
            );
          }
        });
      firstGetData.current = false;
    });

    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [collectionName, condition, orderByField, sortedIn, setIsLoading]);

  return documents;
}
