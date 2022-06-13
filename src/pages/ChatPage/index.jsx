import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import InformationForm from "../../components/Form/InformationForm";
import { AuthContext } from "../../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import "./index.scss";

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
  const roomList = useFirestore("rooms", { condition });
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (setLastestRoom.current && roomList.length !== 0 && !isMobile) {
      setCurrentRoom(roomList[0]);
      setLastestRoom.current = false;
    }
  }, [roomList]);

  return (
    <div className='chat'>
      <SideBar
        roomList={roomList}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
      />
      <ChatWindow {...currentRoom} setCurrentRoom={setCurrentRoom} />
      {showModal && <InformationForm setShowModal={setShowModal} />}
    </div>
  );
}
