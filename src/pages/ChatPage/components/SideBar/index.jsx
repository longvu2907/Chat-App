import { useContext, useState } from "react";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import { AuthContext } from "../../../../context/AuthProvider";
import addRoomChat from "../../../../services/firebase/addRoomChat";
import getDocuments from "../../../../services/firebase/getDocuments";
import Room from "../Room";
import SearchUser from "../SearchUser";
import CreateRoomModal from "./CreateRoomModal";
import "./index.scss";

export default function SideBar({ roomList, currentRoom, setCurrentRoom }) {
  const [showModal, setShowModal] = useState(false);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const addPrivateRoomChat = async res => {
    let room = await getDocuments("rooms", {
      condition: {
        fieldName: "members",
        operator: "in",
        compareValue: [
          [user.uid, res.uid],
          [res.uid, user.uid],
        ],
      },
    });
    room = room.filter(r => !r?.groupChat);

    if (room.length === 0) {
      await addRoomChat({
        roomName: {
          [res.uid]: user.displayName,
          [user.uid]: res.displayName,
        },
        members: [user.uid, res.uid],
        groupChat: false,
        photoURL: {
          [res.uid]: user.photoURL,
          [user.uid]: res.photoURL,
        },
        host: null,
      });
      return;
    }
    setCurrentRoom(room[0]);
  };

  return (
    <div className='side-bar'>
      <SearchUser
        className='side-bar__search'
        searchCollection='users'
        searchField='searchKey'
        resOnClick={async res => await addPrivateRoomChat(res)}
      />
      <Card className='side-bar__chat-list'>
        {roomList.map(room => (
          <Room
            {...room}
            user={user}
            key={room.id}
            active={currentRoom?.id === room.id}
            onClick={() => setCurrentRoom(room)}
          />
        ))}
        <Button className='create-room' onClick={() => setShowModal(true)}>
          Create room
        </Button>
      </Card>
      {showModal && <CreateRoomModal setShowModal={setShowModal} />}
    </div>
  );
}
