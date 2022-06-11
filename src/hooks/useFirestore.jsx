import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "../context/LoadingProvider";
import { db } from "../services/firebase/config";
import getRelativeTime from "../utils/getRelativeTime";

export default function useFirestore(
  collectionName,
  {
    condition = null,
    orderByField = "createdAt",
    sortedIn = "desc",
    limitNumber = 25,
  } = {},
) {
  const getOldData = useRef(true);
  const [documents, setDocuments] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);

  const loadMoreData = async () => {
    setIsLoading(true);

    const next = query(
      collection(db, collectionName),
      orderBy(orderByField, sortedIn),
      startAfter(documents.at(-1)[orderByField]),
      limit(limitNumber),
    );

    const docs = await getDocs(next);
    let datas = [];
    docs.forEach(
      doc =>
        (datas = [
          ...datas,
          {
            ...doc.data(),
            newData: false,
            id: doc.id,
            relativeTime: getRelativeTime(doc.data().createdAt.toDate()),
          },
        ]),
    );

    setDocuments(prev => [...prev, ...datas]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getOldData.current = true;

    let q = query(
      collection(db, collectionName),
      orderBy(orderByField, sortedIn),
      limit(limitNumber),
    );

    if (condition) {
      const { fieldName, operator, compareValue } = condition;
      q = query(
        collection(db, collectionName),
        where(fieldName, operator, compareValue),
        orderBy(orderByField, sortedIn),
        limit(limitNumber),
      );
    }

    const unsubscribe = onSnapshot(q, snapshot => {
      let datas = [];
      snapshot.docChanges().forEach(change => {
        const data = {
          ...change.doc.data(),
          newData: !getOldData.current,
          id: change.doc.id,
          relativeTime: getRelativeTime(change.doc.data().createdAt.toDate()),
        };
        if (change.type === "added") {
          datas = [...datas, data];
        }

        if (change.type === "modified") {
          datas = datas.map(prevData => {
            if (prevData.id === change.doc.id) return data;
            return prevData;
          });
        }

        if (change.type === "removed") {
          datas = datas.filter(prevData => prevData.id !== change.doc.id);
        }
      });

      if (getOldData.current) setDocuments(datas);
      else setDocuments(prev => [...datas, ...prev]);

      getOldData.current = false;
    });

    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [
    collectionName,
    condition,
    orderByField,
    sortedIn,
    limitNumber,
    setIsLoading,
  ]);

  return [documents, loadMoreData];
}
