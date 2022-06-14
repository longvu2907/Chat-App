import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import addDocument from "../../../../services/firebase/addDocument";
import SearchUser from "../SearchUser";
import "./index.scss";

export default function MemberManager({
  members,
  id,
  user,
  setValue,
  handleSubmit,
}) {
  const [showAddMember, setShowAddMember] = useState(false);

  const addRemoveMember = async ({ memberList }) => {
    await addDocument(
      "rooms",
      { members: memberList.map(member => member.uid) },
      id,
    );
    const addedMember = memberList.filter(
      member => !members.some(prevMember => prevMember.uid === member.uid),
    );
    const addedMemberMessages = addedMember.map(member => ({
      createdAt: Timestamp.now(),
      text: `${member.displayName} was added`,
      uid: "system",
      roomId: id,
    }));
    const removedMember = members.filter(
      member => !memberList.some(currMember => currMember.uid === member.uid),
    );
    const removedMemberMessages = removedMember.map(member => ({
      createdAt: Timestamp.now(),
      text: `${member.displayName} was removed`,
      uid: "system",
      roomId: id,
    }));

    const notifyMessages = [...addedMemberMessages, ...removedMemberMessages];

    await Promise.all(
      notifyMessages.map(
        async message => await addDocument("messages", message),
      ),
    );
  };

  return (
    <div className={`add-user ${showAddMember ? "show" : ""}`}>
      <SearchUser
        searchCollection='users'
        searchField='searchKey'
        placeholder='Add user'
        members={members && members.filter(member => member.uid !== user.uid)}
        resOnClick={async resData => {
          if (members.some(member => member.uid === resData.uid)) {
            setValue(
              "memberList",
              members.filter(member => member.uid !== resData.uid),
            );
            await handleSubmit(addRemoveMember)();
            return;
          }

          setValue("memberList", [...members, resData]);
          await handleSubmit(addRemoveMember)();
        }}
        resIcon={[<AiOutlineUsergroupAdd />, <AiOutlineUsergroupDelete />]}
      />
      <AiOutlinePlusCircle onClick={() => setShowAddMember(prev => !prev)} />
    </div>
  );
}
