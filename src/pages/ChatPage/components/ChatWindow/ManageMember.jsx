import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlinePlusCircle,
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import * as yup from "yup";
import addDocument from "../../../../services/firebase/addDocument";
import getDocuments from "../../../../services/firebase/getDocuments";
import SearchUser from "../SearchUser";
import "./index.scss";

const schema = yup
  .object()
  .shape({
    memberList: yup.array().default([]),
  })
  .required();

export default function ManageMember({ members, id, user }) {
  const { handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const watchMembers = watch("memberList");
  const [showAddMember, setShowAddMember] = useState(false);

  useEffect(() => {
    members &&
      getDocuments("users", {
        condition: { fieldName: "uid", operator: "in", compareValue: members },
      }).then(datas => setValue("memberList", datas));
  }, [setValue, members, id]);

  const addMember = async ({ memberList }) => {
    console.log(memberList);
    await addDocument(
      "rooms",
      { members: memberList.map(member => member.uid) },
      id,
    );
  };

  return (
    <div className={`header__add-user ${showAddMember ? "show" : ""}`}>
      <SearchUser
        searchCollection='users'
        searchField='searchKey'
        placeholder='Add user'
        members={
          watchMembers && watchMembers.filter(member => member.uid !== user.uid)
        }
        resOnClick={async resData => {
          if (watchMembers.some(member => member.uid === resData.uid)) {
            setValue(
              "memberList",
              watchMembers.filter(member => member.uid !== resData.uid),
            );
            await handleSubmit(addMember)();
            return;
          }

          setValue("memberList", [...watchMembers, resData]);
          await handleSubmit(addMember)();
        }}
        resIcon={[<AiOutlineUsergroupAdd />, <AiOutlineUsergroupDelete />]}
      />

      <AiOutlinePlusCircle onClick={() => setShowAddMember(prev => !prev)} />
    </div>
  );
}
