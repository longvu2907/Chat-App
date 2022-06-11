import Avatar from "../Avatar";
import "./index.scss";

export default function Room({
  photoURL,
  roomName,
  lastMessage,
  lastMessageTime,
  unread,
  active,
  ...props
}) {
  return (
    <div className={`room ${active ? "active" : ""}`} {...props}>
      <div className='room__avatar'>
        <Avatar src={photoURL} online />
      </div>
      <div className={`room__wrapper ${unread ? "room__wrapper--unread" : ""}`}>
        <h2 className='name'>{roomName}</h2>
        <div className='message'>
          <span className='message__text'>{lastMessage}</span>
          <span className='message__time'>{lastMessageTime}</span>
        </div>
      </div>
      {unread && <div className='room__notify'></div>}
    </div>
  );
}
