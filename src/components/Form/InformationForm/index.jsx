import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { LoadingContext } from "../../../context/LoadingProvider";
import addDocument from "../../../services/firebase/addDocument";
import { AuthError } from "../../../services/firebase/AuthError";
import { auth } from "../../../services/firebase/config";
import getUserData from "../../../utils/getUserData";
import Button from "../../Button";
import GenderSelect from "../../GenderSelect";
import Input from "../../Input";
import Modal from "../../Modal";

const schema = yup
  .object()
  .shape({
    displayName: yup.string().required("Display name is required"),
    gender: yup.string().required("Gender is required").default("male"),
  })
  .required();

export default function InformationForm({ setShowModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: schema.cast(), resolver: yupResolver(schema) });
  const { setIsLoading } = useContext(LoadingContext);

  const onSubmit = async ({ displayName, gender }) => {
    setIsLoading(true);
    const user = auth.currentUser;

    try {
      await updateProfile(user, {
        displayName,
        photoURL: `https://avatars.dicebear.com/api/${gender}/${user.uid}.svg`,
        gender,
      });

      await addDocument("users", getUserData(user), user.uid);

      setShowModal(false);
    } catch (error) {
      console.log(error);
      setError("displayName", { message: AuthError[error.code] });
    }
    setIsLoading(false);
  };

  return (
    <Modal>
      <h2 className='modal__header'>Welcome !</h2>
      <p className='modal__description'>
        Please enter display name and gender.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='displayName'
          register={register}
          error={errors.displayName}
          placeholder='Display Name'
          icon={<AiOutlineUser />}
        />
        <GenderSelect register={register} />
        <Button type='submit'>Done</Button>
      </form>
      <Button>
        <Link to='/signout'>Sign out</Link>
      </Button>
    </Modal>
  );
}
