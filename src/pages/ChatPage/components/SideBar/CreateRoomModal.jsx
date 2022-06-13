import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import * as yup from "yup";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { AuthContext } from "../../../../context/AuthProvider";
import { LoadingContext } from "../../../../context/LoadingProvider";
import addRoomChat from "../../../../services/firebase/addRoomChat";
import { AuthError } from "../../../../services/firebase/AuthError";
import SearchUser from "../SearchUser";

const schema = yup
  .object()
  .shape({
    roomName: yup.string().required("Room name is required"),
    members: yup.array().default([]),
  })
  .required();

export default function CreateRoomModal({ setShowModal, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setIsLoading } = useContext(LoadingContext);
  const watchMembers = watch("members");
  const {
    authState: {
      user: { displayName, photoURL, uid },
    },
  } = useContext(AuthContext);

  useEffect(() => {
    setValue("members", [{ displayName, photoURL, uid }]);
  }, [setValue, displayName, photoURL, uid]);

  const onSubmit = async ({ roomName, members }) => {
    setIsLoading(true);
    try {
      addRoomChat({
        roomName,
        members: members.map(member => member.uid),
        groupChat: true,
        host: uid,
      });
      setShowModal(false);
    } catch (error) {
      setError("roomName", { message: AuthError[error.code] });
    }
    setIsLoading(false);
  };

  return (
    <Modal setShowModal={setShowModal}>
      <h2 className='modal__header'>Create room</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Room name'
          name='roomName'
          register={register}
          error={errors.roomName}
        />
        <SearchUser
          searchCollection='users'
          searchField='searchKey'
          placeholder='Add user'
          members={
            watchMembers && watchMembers.filter(member => member.uid !== uid)
          }
          resOnClick={resData => {
            if (watchMembers.some(member => member.uid === resData.uid)) {
              setValue(
                "members",
                watchMembers.filter(member => member.uid !== resData.uid),
              );
              return;
            }

            setValue("members", [...watchMembers, resData]);
          }}
          resIcon={[<AiOutlineUsergroupAdd />, <AiOutlineUsergroupDelete />]}
        />
        <Button type='submit'>Create</Button>
      </form>
    </Modal>
  );
}
