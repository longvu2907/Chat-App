import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend, AiOutlinePlusCircle } from "react-icons/ai";
import * as yup from "yup";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import { LoadingContext } from "../../../../context/LoadingProvider";
import useFirestore from "../../../../hooks/useFirestore";
import Avatar from "../Avatar";
import Message from "../Message";
import "./index.scss";

const schema = yup
  .object()
  .shape({
    message: yup.string(),
  })
  .required();

export default function ChatWindow({ roomName, online, avatar }) {
  const { setIsLoading } = useContext(LoadingContext);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [messages, getMoreMessages] = useFirestore("messages", {
    limitNumber: 5,
  });

  const onSubmit = ({ message }) => {
    // setMessages(prev => [
    //   {
    //     key: 3,
    //     sent: false,
    //     avatar: "https://placekitten.com/408/287",
    //     text: message,
    //   },
    //   ...prev,
    // ]);
    getMoreMessages();
  };

  return (
    <Card className='chat-window'>
      <div className='chat-window__header'>
        <div className='header__room-info'>
          <Avatar src={avatar} online={online} />
          <div className='room-wrapper'>
            <h2 className='name'>{roomName}</h2>
            <span className='status'>{online ? "online" : "offline"}</span>
          </div>
        </div>
        <div className='header__add-user'>
          <AiOutlinePlusCircle />
        </div>
      </div>
      <div className='message-list'>
        {messages.map(message => (
          <Message {...message} newMessage={message.newData} key={message.id} />
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='message'
          register={register}
          icon={<AiOutlineSend />}
          onIconClick={() => {}}
          placeholder='Aa'
        />
      </form>
    </Card>
  );
}
