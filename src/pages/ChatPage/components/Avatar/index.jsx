import React from "react";
import "./index.scss";

export default function Avatar({ online, ...props }) {
  return (
    <div className='avatar'>
      <img {...props} alt='avatar' online />
      {online && <div className='status'></div>}
    </div>
  );
}
