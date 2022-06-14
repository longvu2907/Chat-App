import Avatar from "../../../../components/Avatar";
import "./index.scss";

export default function UserDisplay({
  added,
  resOnClick,
  uid,
  photoURL,
  displayName,
  resIcon,
}) {
  return (
    <div
      className={`user-display ${added ? "added" : ""}`}
      onClick={resOnClick}
      uid={uid}
    >
      <div className='user-display__avatar'>
        <Avatar src={photoURL} />
      </div>
      <span className='user-display__name'>{displayName}</span>
      <div className='user-display__icon'>
        {resIcon && (added ? resIcon[1] : resIcon[0])}
      </div>
    </div>
  );
}
