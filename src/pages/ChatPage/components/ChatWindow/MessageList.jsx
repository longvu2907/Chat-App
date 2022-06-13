import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import Message from "../Message";

export default function MessageList({ messages }) {
  const messageListRef = useRef(null);
  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const messageList = messageListRef.current;

    [...messageList.children].forEach(message => {
      const next = message.nextElementSibling;
      const prev = message.previousElementSibling;
      message.classList.remove("first");
      message.classList.remove("last");

      if (
        !next ||
        (!message.classList.contains("message--received") &&
          next.classList.contains("message--received")) ||
        (!message.classList.contains("message--sent") &&
          next.classList.contains("message--sent"))
      )
        message.classList.add("last");

      if (
        !prev ||
        (!message.classList.contains("message--received") &&
          prev.classList.contains("message--received")) ||
        (!message.classList.contains("message--sent") &&
          prev.classList.contains("message--sent"))
      )
        message.classList.add("first");
    });
  }, [messages]);

  return (
    <div className='message-list' ref={messageListRef}>
      {messages.map(message => (
        <Message
          {...message}
          newMessage={message.newData}
          key={message.id}
          currentUser={user}
        />
      ))}
    </div>
  );
}
