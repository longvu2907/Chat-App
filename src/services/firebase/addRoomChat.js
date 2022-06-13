import { Timestamp } from "firebase/firestore";
import addDocument from "./addDocument";
import getDocuments from "./getDocuments";

export default async function addRoomChat({
  roomName,
  members,
  groupChat,
  host,
  photoURL,
}) {
  try {
    const onlineMembers = (
      await getDocuments("users", {
        condition: { fieldName: "uid", operator: "in", compareValue: members },
      })
    )
      .filter(member => member.online)
      .map(member => member.uid);
    const room = await addDocument("rooms", {
      roomName,
      members,
      groupChat,
      host,
      onlineMembers,
      photoURL: photoURL
        ? photoURL
        : `https://avatars.dicebear.com/api/jdenticon/${roomName}.svg`,
    });
    await addDocument("messages", {
      createdAt: Timestamp.now(),
      text: groupChat
        ? `${roomName} was created`
        : "You are now connected on Chat App",
      uid: "initial",
      roomId: room.id,
    });
  } catch (error) {
    throw error;
  }
}
