import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import "./index.scss";
import Room from "../Room";

const roomList = [
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage: "hi",
    lastMessageTime: "2 days",
    active: true,
    unread: false,
  },
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet incidunt hic quaerat beatae itaque dolore. Non itaque velit libero. Enim eaque fugit soluta maiores voluptatum quis error vitae voluptatem aliquid.",
    lastMessageTime: "1 days",
    unread: true,
  },
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage: "hi",
    lastMessageTime: "2 days",
    unread: false,
  },
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage: "hi",
    lastMessageTime: "2 days",
    unread: false,
  },
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage: "hi",
    lastMessageTime: "2 days",
    unread: false,
  },
];

export default function SideBar() {
  return (
    <div className='side-bar'>
      <Input
        icon={<AiOutlineSearch />}
        onIconClick={() => {}}
        className={"side-bar__search"}
        placeholder='Search'
      />
      <Card className='side-bar__chat-list'>
        {roomList.map((room, index) => (
          <Room {...room} key={index} />
        ))}
      </Card>
    </div>
  );
}
