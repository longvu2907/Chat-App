import React from "react";
import Avatar from "../../../../components/Avatar";

export default function Result({
  added,
  resOnClick,
  uid,
  photoURL,
  displayName,
  resIcon,
}) {
  return (
    <div
      className={`result ${added ? "added" : ""}`}
      onClick={resOnClick}
      uid={uid}
    >
      <div className='result__avatar'>
        <Avatar src={photoURL} />
      </div>
      <span className='result__name'>{displayName}</span>
      <div className='result__icon'>
        {resIcon && (added ? resIcon[1] : resIcon[0])}
      </div>
    </div>
  );
}
