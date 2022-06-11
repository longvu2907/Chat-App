import unicodeNormalizer from "./unicodeNormalizer";

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
    searchName: unicodeNormalizer(displayName),
  };
}
