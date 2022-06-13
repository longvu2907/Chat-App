import { arrayRemove, arrayUnion } from "firebase/firestore";
import addDocument from "./addDocument";
import getDocuments from "./getDocuments";

export default async function setOnlineStatus(uid, online) {
  try {
    await addDocument("users", { online }, uid);
    const roomList = await getDocuments("rooms", {
      condition: {
        fieldName: "members",
        operator: "array-contains",
        compareValue: uid,
      },
    });

    await Promise.all(
      roomList.map(room => {
        if (online) {
          return addDocument(
            "rooms",
            { onlineMembers: arrayUnion(uid) },
            room.id,
          );
        }
        return addDocument(
          "rooms",
          { onlineMembers: arrayRemove(uid) },
          room.id,
        );
      }),
    );
  } catch (error) {
    console.log(error);
  }
}
