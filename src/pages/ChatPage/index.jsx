import { useContext, useState } from "react";
import InformationForm from "../../components/Form/InformationForm";
import { AuthContext } from "../../context/AuthProvider";
import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import "./index.scss";

export default function ChatPage() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(!user.displayName);

  return (
    <div className='chat'>
      <SideBar />
      <ChatWindow
        online
        roomName='Anh Thuy'
        avatar='https://placekitten.com/408/287'
      />
      {showModal && <InformationForm setShowModal={setShowModal} />}
    </div>
  );
}
