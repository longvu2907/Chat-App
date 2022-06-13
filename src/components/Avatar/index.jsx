import React from "react";
import "./index.scss";

export default function Avatar({ online, ...props }) {
  return (
    <div className='avatar'>
      <img {...props} alt='avatar' referrerPolicy='no-referrer' />
      {online && <div className='status'></div>}
    </div>
  );
}
