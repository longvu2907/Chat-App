import { useState } from "react";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import useFirestore from "../../../../hooks/useFirestore";
import SearchUser from "../SearchUser";
import CreateRoomModal from "./CreateRoomModal";
import "./index.scss";

export default function SideBar() {
  const [roomList] = useFirestore("rooms");
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='side-bar'>
      <SearchUser
        className='side-bar__search'
        searchCollection='users'
        searchField='searchKey'
      />
      <Card className='side-bar__chat-list'>
        {/* {roomList.map((room, index) => (
          <Room {...room} key={index} />
        ))} */}
        <Button className='create-room' onClick={() => setShowModal(true)}>
          Create room
        </Button>
      </Card>
      {showModal && <CreateRoomModal setShowModal={setShowModal} />}
    </div>
  );
}
