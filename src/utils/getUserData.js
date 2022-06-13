import generateSearchKey from "./generateSearchKey";

export default function getUserData({
  displayName,
  email,
  phoneNumber,
  photoURL,
  uid,
}) {
  return {
    displayName,
    email,
    phoneNumber,
    photoURL,
    uid,
    searchKey: displayName && generateSearchKey(displayName),
  };
}
