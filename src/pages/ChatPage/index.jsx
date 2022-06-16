import { lazy, useContext, useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { AuthContext } from "../../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import addDocument from "../../services/firebase/addDocument";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import "./index.scss";

const InformationForm = lazy(() =>
  import("../../components/Form/InformationForm"),
);

export default function ChatPage() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(!user.displayName);
  const condition = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    }),
    [user.uid],
  );
  const setLastestRoom = useRef(true);
  const roomList = useFirestore("rooms", {
    condition,
    orderByField: "lastUpdate",
  });
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (setLastestRoom.current && roomList.length !== 0 && !isMobile) {
      setCurrentRoom(roomList[0]);
      setLastestRoom.current = false;
    } else
      setCurrentRoom(
        prev => roomList.filter(room => room.id === prev?.id)?.[0],
      );
  }, [roomList]);

  const setRoom = useMemo(
    () => room => {
      room &&
        addDocument(
          "rooms",
          {
            unreadMembers: room.unreadMembers.filter(
              member => member !== user.uid,
            ),
          },
          room.id,
        );
      setCurrentRoom(room);
    },
    [user.uid],
  );

  return (
    <div className='chat'>
      <SideBar
        roomList={roomList}
        currentRoom={currentRoom}
        setCurrentRoom={setRoom}
      />
      <ChatWindow {...currentRoom} setCurrentRoom={setRoom} />
      {showModal && <InformationForm setShowModal={setShowModal} />}
    </div>
  );
}
