import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import getDocuments from "../../../../services/firebase/getDocuments";
import MemberManager from "./MemberManager";
import "./index.scss";
import MemberList from "./MemberList";

const schema = yup
  .object()
  .shape({
    memberList: yup.array().default([]),
  })
  .required();

export default function ManageMember({ members, id, user, host }) {
  const { handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const watchMembers = watch("memberList");

  useEffect(() => {
    members &&
      getDocuments("users", {
        condition: { fieldName: "uid", operator: "in", compareValue: members },
      }).then(datas => setValue("memberList", datas));
  }, [setValue, members, id]);

  return (
    <div className='manage-member'>
      {user.uid === host ? (
        <MemberManager
          members={watchMembers}
          id={id}
          user={user}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />
      ) : (
        <></>
      )}

      <MemberList members={watchMembers} />
    </div>
  );
}
