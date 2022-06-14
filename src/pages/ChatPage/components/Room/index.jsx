import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";
import NotificationSound from "../../../../assets/sound/Notification.mp3";
import Avatar from "../../../../components/Avatar";
import useFirestore from "../../../../hooks/useFirestore";
import addDocument from "../../../../services/firebase/addDocument";
import getRelativeTime from "../../../../utils/getRelativeTime";
import "./index.scss";

export default function Room({
  id,
  roomName,
  photoURL,
  onlineMembers,
  groupChat,
  unreadMembers,
  user,
  active,
  onClick,
}) {
  const condition = useMemo(
    () => ({ fieldName: "roomId", operator: "==", compareValue: id }),
    [id],
  );
  const [unread, setUnread] = useState(false);
  const [notification] = useSound(NotificationSound, { volume: 0.4 });

  const lastMessage = useFirestore("messages", { condition })[0];
  const roomPhotoURL = groupChat ? photoURL : photoURL[user.uid];
  const roomDisplayName = groupChat ? roomName : roomName[user.uid];

  useEffect(() => {
    lastMessage &&
      addDocument("rooms", { lastUpdate: lastMessage.createdAt }, id);
  }, [lastMessage, id]);

  useEffect(() => {
    const checkUnread = unreadMembers && unreadMembers.includes(user.uid);
    if (checkUnread) notification();
    setUnread(checkUnread);
  }, [unreadMembers, user.uid, notification]);

  return (
    <div className={`room ${active ? "active" : ""}`} onClick={onClick}>
      <div className='room__avatar'>
        <Avatar
          src={roomPhotoURL}
          online={
            onlineMembers.filter(member => member !== user.uid).length > 0
          }
        />
      </div>
      <div className={`room__wrapper ${unread ? "room__wrapper--unread" : ""}`}>
        <h2 className='name'>{roomDisplayName}</h2>
        <div className='lastMessage'>
          <span className='lastMessage__text'>{lastMessage?.text}</span>
          <span className='lastMessage__time'>
            {getRelativeTime(lastMessage?.createdAt?.toDate())}
          </span>
        </div>
      </div>
      {unread && <div className='room__notify'></div>}
    </div>
  );
}
