import { useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import useClickOutside from "../../../../hooks/useClickOutside";
import UserDisplay from "../UserDisplay";

export default function MemberList({ members }) {
  const [showMembers, setShowMembers] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside({ wrapperRef, onClick: () => setShowMembers(false) });

  return (
    <div className='member-list-wrapper' ref={wrapperRef}>
      <AiFillInfoCircle onClick={() => setShowMembers(prev => !prev)} />
      <div className={`member-list ${showMembers ? "show" : ""}`}>
        {members &&
          members.map(({ photoURL, displayName, uid }) => (
            <UserDisplay
              key={uid}
              photoURL={photoURL}
              displayName={displayName}
            />
          ))}
      </div>
    </div>
  );
}
