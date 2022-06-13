import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineArrowLeft,
  AiOutlinePlusCircle,
  AiOutlineSend,
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import * as yup from "yup";
import Avatar from "../../../../components/Avatar";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import { AuthContext } from "../../../../context/AuthProvider";
import useFirestore from "../../../../hooks/useFirestore";
import addDocument from "../../../../services/firebase/addDocument";
import getDocuments from "../../../../services/firebase/getDocuments";
import SearchUser from "../SearchUser";
import "./index.scss";
import MessageList from "./MessageList";

const schema = yup
  .object()
  .shape({
    message: yup.string(),
    memberList: yup.array().default([]),
  })
  .required();

export default function ChatWindow({
  roomName,
  members,
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
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const watchMembers = watch("memberList");
  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: id || "",
    }),
    [id],
  );
  const [showAddMember, setShowAddMember] = useState(false);
  const messages = useFirestore("messages", { condition: condition });
  const online =
    onlineMembers?.filter(member => member !== user.uid).length > 0;
  const roomPhotoURL = groupChat ? photoURL : photoURL?.[user.uid];
  const roomDisplayName = groupChat ? roomName : roomName?.[user.uid];

  useEffect(() => {
    members &&
      getDocuments("users", {
        condition: { fieldName: "uid", operator: "in", compareValue: members },
      }).then(datas => setValue("memberList", datas));
  }, [setValue, members, id]);

  const sendMessage = async ({ message }) => {
    await addDocument("messages", {
      text: message,
      photoURL: user.photoURL,
      uid: user.uid,
      roomId: id,
    });
    reset({ message: "" });
  };

  const addMember = async ({ memberList }) => {
    await addDocument(
      "rooms",
      { members: memberList.map(member => member.uid) },
      id,
    );
  };

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
              <div
                className={`header__add-user ${showAddMember ? "show" : ""}`}
              >
                <SearchUser
                  searchCollection='users'
                  searchField='searchKey'
                  placeholder='Add user'
                  members={
                    watchMembers &&
                    watchMembers.filter(member => member.uid !== user.uid)
                  }
                  resOnClick={async resData => {
                    if (
                      watchMembers.some(member => member.uid === resData.uid)
                    ) {
                      setValue(
                        "memberList",
                        watchMembers.filter(
                          member => member.uid !== resData.uid,
                        ),
                      );
                      return;
                    }

                    setValue("memberList", [...watchMembers, resData]);
                    await handleSubmit(addMember)();
                  }}
                  resIcon={[
                    <AiOutlineUsergroupAdd />,
                    <AiOutlineUsergroupDelete />,
                  ]}
                />

                <AiOutlinePlusCircle
                  onClick={() => setShowAddMember(prev => !prev)}
                />
              </div>
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
