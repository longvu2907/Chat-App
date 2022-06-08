import React, { useEffect, useRef } from "react";
import Avatar from "../Avatar";
import "./index.scss";

export default function Message({ avatar, sent, firstRender, text }) {
  const isFirstRender = useRef(firstRender);
  const messageRef = useRef(null);

  useEffect(() => {
    const message = messageRef.current;
    message.classList.remove("last");
    message.classList.remove("first");

    if (
      (sent &&
        message.nextElementSibling &&
        message.nextElementSibling.classList.contains("message--received")) ||
      (!sent &&
        message.nextElementSibling &&
        message.nextElementSibling.classList.contains("message--sent")) ||
      !message.nextElementSibling
    ) {
      message.classList.add("last");
    }

    if (
      (sent &&
        message.previousElementSibling &&
        message.previousElementSibling.classList.contains(
          "message--received",
        )) ||
      (!sent &&
        message.previousElementSibling &&
        message.previousElementSibling.classList.contains("message--sent")) ||
      !message.previousElementSibling
    ) {
      message.classList.add("first");
    }
  }, [
    sent,
    messageRef.current?.nextElementSibling,
    messageRef.current?.previousElementSibling,
  ]);

  return (
    <div
      className={`message message--${sent ? "sent" : "received"} `}
      ref={messageRef}
    >
      <div className='message__avatar'>{!sent && <Avatar src={avatar} />}</div>
      <div
        className={`message__text ${isFirstRender.current ? "" : "slide-up"}`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
