import Avatar from "../../../../components/Avatar";
import getRelativeTime from "../../../../utils/getRelativeTime";
import "./index.scss";

export default function Message({
  uid,
  newMessage,
  text,
  photoURL,
  currentUser,
  createdAt,
  name,
}) {
  const sent = currentUser.uid === uid;
  return uid === "initial" ? (
    <div className='message message--initial'>
      <span className='message__time'>
        {createdAt.toDate().toLocaleString()}
      </span>
      <span className='message__text'>{text}</span>
    </div>
  ) : (
    <div
      className={`message message--${sent ? "sent" : "received"} `}
      uid={uid}
    >
      <span className='message__name'>{name}</span>
      <div className='message-wrapper'>
        <div className='message__avatar'>
          {!sent && <Avatar src={photoURL} />}
        </div>
        <div className={`message__text ${newMessage ? "slide-up" : ""}`}>
          <p>{text}</p>
        </div>
      </div>
      <span className='message__time'>
        {getRelativeTime(createdAt.toDate())}
      </span>
    </div>
  );
}
