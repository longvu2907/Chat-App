import { yupResolver } from "@hookform/resolvers/yup";
import { arrayUnion } from "firebase/firestore";
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
import addDocument from "../../../../services/firebase/addDocument";
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
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    setValue("members", [user.uid]);
  }, [setValue, user]);

  const onSubmit = async ({ roomName, members }) => {
    setIsLoading(true);
    try {
      const resDoc = await addDocument("rooms", {
        roomName,
        members,
        photoURL: `https://avatars.dicebear.com/api/jdenticon/${roomName}.svg`,
      });
      await Promise.all(
        members.map(
          async member =>
            await addDocument(
              "users",
              {
                roomList: arrayUnion(resDoc.id),
              },
              member,
            ),
        ),
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
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
          searchField='searchName'
          placeholder='Add user'
          members={watchMembers}
          resOnClick={e => {
            const uid = e.currentTarget.getAttribute("uid");
            if (watchMembers.includes(uid)) {
              setValue(
                "members",
                watchMembers.filter(element => element !== uid),
              );
              return;
            }

            setValue("members", [...watchMembers, uid]);
          }}
          resIcon={[<AiOutlineUsergroupAdd />, <AiOutlineUsergroupDelete />]}
        />
        <Button type='submit'>Create</Button>
      </form>
    </Modal>
  );
}
