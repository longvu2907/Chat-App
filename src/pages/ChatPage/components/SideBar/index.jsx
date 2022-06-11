import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import "./index.scss";
import Room from "../Room";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../../../services/firebase/config";

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
  {
    roomAvatar: "https://placekitten.com/408/287",
    roomName: "ahihi",
    lastMessage: "hi",
    lastMessageTime: "2 days",
    unread: false,
  },
];

export default function SideBar() {
  const onSearch = async t => {
    const queryText = "nguyen";
    const searchInputToLower = queryText.toLowerCase();
    const searchInputTOUpper = queryText.toUpperCase();

    console.log(searchInputToLower, searchInputTOUpper);

    const q = query(
      collection(db, "users"),
      orderBy("displayName"),
      where("displayName", ">=", queryText),
      where("displayName", "<=", queryText + "\uf8ff"),
      // startAt(queryText),
      // endAt(queryText + "\uf8ff"),
    );
    const docs = await getDocs(q);
    docs.forEach(doc => console.log(doc.data()));
  };

  return (
    <div className='side-bar'>
      <Input
        icon={<AiOutlineSearch />}
        onIconClick={e => onSearch(e.value)}
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
