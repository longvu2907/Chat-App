import React from "react";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import "./index.scss";

export default function ChatPage() {
  return (
    <div className='chat'>
      <SideBar />
      <ChatWindow />
    </div>
  );
}
