import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import * as yup from "yup";
import Avatar from "../../../../components/Avatar";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import { AuthContext } from "../../../../context/AuthProvider";
import useFirestore from "../../../../hooks/useFirestore";
import addDocument from "../../../../services/firebase/addDocument";
import "./index.scss";
import ManageMember from "./ManageMember";
import MessageList from "./MessageList";

const schema = yup
  .object()
  .shape({
    message: yup.string(),
  })
  .required();

export default function ChatWindow({
  roomName,
  members,
  unreadMembers,
  onlineMembers,
  photoURL,
  id,
  host,
  groupChat,
  setCurrentRoom,
}) {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: id || "",
    }),
    [id],
  );
  const messages = useFirestore("messages", { condition: condition });
  const online =
    onlineMembers?.filter(member => member !== user.uid).length > 0;
  const roomPhotoURL = groupChat ? photoURL : photoURL?.[user.uid];
  const roomDisplayName = groupChat ? roomName : roomName?.[user.uid];

  const sendMessage = async ({ message }) => {
    await addDocument("messages", {
      text: message,
      photoURL: user.photoURL,
      uid: user.uid,
      roomId: id,
      name: groupChat && user.displayName,
    });
    id &&
      addDocument(
        "rooms",
        {
          unreadMembers: members.filter(member => member !== user.uid),
        },
        id,
      );
    reset({ message: "" });
  };

  useEffect(() => {
    unreadMembers &&
      addDocument(
        "rooms",
        { unreadMembers: unreadMembers.filter(member => member !== user.uid) },
        id,
      );
  }, [messages, unreadMembers, id, user.uid]);

  return (
    <Card className={`chat-window ${id ? "chat-window--active" : ""}`}>
      {id ? (
        <>
          <div className='chat-window__header'>
            <div className='header__room-info'>
              <AiOutlineArrowLeft onClick={() => setCurrentRoom(null)} />
              <Avatar src={roomPhotoURL} online={online} />
              <div className='room-wrapper'>
                <h2 className='name'>{roomDisplayName}</h2>
                <span className='status'>{online ? "online" : "offline"}</span>
              </div>
            </div>

            {user.uid === host ? (
              <ManageMember user={user} members={members} id={id} />
            ) : (
              <></>
            )}
          </div>
          <MessageList messages={messages} />
          <form onSubmit={handleSubmit(sendMessage)}>
            <Input
              name='message'
              register={register}
              icon={<AiOutlineSend />}
              onIconClick={handleSubmit(sendMessage)}
              placeholder='Aa'
              autoComplete='off'
            />
          </form>
        </>
      ) : (
        <span className='chat-window__text'>
          Choose or create new room to begin chatting
        </span>
      )}
    </Card>
  );
}
