import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import * as yup from "yup";
import Card from "../../../../components/Card";
import Input from "../../../../components/Input";
import Message from "../Message";
import "./index.scss";

const fakeChat = [
  // { key: 9, sent: false, text: "haha" },
  // { key: 8, sent: true, text: "hajaisdfa" },
  // { key: 7, sent: true, text: "hi" },
  // { key: 6, sent: false, text: "hi" },
  // { key: 5, sent: false, text: "how about u" },
  {
    key: 4,
    sent: true,
    avatar: "https://placekitten.com/408/287",
    text: "im doing great",
  },
  {
    key: 3,
    sent: false,
    avatar: "https://placekitten.com/408/287",
    text: "how r u",
  },
  {
    key: 2,
    sent: false,
    avatar: "https://placekitten.com/408/287",
    text: "hello",
  },
  {
    key: 1,
    sent: true,
    avatar: "https://placekitten.com/408/287",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione natus cumque eveniet accusantium, dolorum magni rerum? Quaerat provident, officiis eligendi quibusdam sint commodi odio rem qui saepe dolor debitis quia.",
  },
];

const schema = yup
  .object()
  .shape({
    message: yup.string(),
  })
  .required();

export default function ChatWindow() {
  const chatListRef = useRef(null);
  const firstRender = useRef(true);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ message }) => {
    console.log(message);
  };

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <Card className='chat-window'>
      <div className='message-list' ref={chatListRef}>
        {fakeChat.map(message => (
          <Message {...message} firstRender={firstRender.current} />
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
