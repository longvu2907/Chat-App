import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../../../components/Input";
import { AuthContext } from "../../../../context/AuthProvider";
import useClickOutside from "../../../../hooks/useClickOutside";
import useFirestore from "../../../../hooks/useFirestore";
import unicodeNormalizer from "../../../../utils/unicodeNormalizer";
import UserDisplay from "../UserDisplay";
import "./index.scss";

export default function SearchUser({
  searchCollection,
  searchField,
  resOnClick,
  resIcon,
  placeholder,
  members,
  ...props
}) {
  const [showResult, setShowResult] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const wrapperRef = useRef(null);
  const { register, watch, reset } = useForm();
  const watchSearch = watch("search");

  const condition = useMemo(
    () => ({
      fieldName: searchField,
      operator: "array-contains",
      compareValue: searchKey,
    }),
    [searchField, searchKey],
  );

  const results = useFirestore(searchCollection, {
    condition,
  });
  const {
    authState: { user },
  } = useContext(AuthContext);

  useClickOutside({
    wrapperRef,
    onClick: () => {
      reset({ search: "" });
      setShowResult(false);
    },
  });

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      setSearchKey(unicodeNormalizer(watchSearch));
    }, 500);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [results, watchSearch]);

  return (
    <div
      className='search-wrapper'
      onClick={() => setShowResult(true)}
      ref={wrapperRef}
    >
      <Input
        name='search'
        register={register}
        placeholder={placeholder || "Search"}
        autoComplete='off'
        icon={<AiOutlineSearch />}
        onIconClick={() => {}}
        onFocus={() => setShowResult(true)}
        {...props}
      />
      <div className={`result-list ${showResult ? "show" : ""}`}>
        <div className='result'>
          <div className='result__search-icon'>
            <AiOutlineSearch />
          </div>
          <span className='result__search-text'>{`Search for "${watchSearch}"`}</span>
        </div>
        {members &&
          members.map(member => (
            <UserDisplay
              added
              resOnClick={() => resOnClick(member)}
              resIcon={resIcon}
              key={member.uid}
              {...member}
            />
          ))}
        {results
          .filter(
            ({ uid }) =>
              (!members || members.every(member => member.uid !== uid)) &&
              uid !== user.uid,
          )
          .map(res => (
            <UserDisplay
              resOnClick={() => resOnClick(res)}
              resIcon={resIcon}
              key={res.uid}
              {...res}
            />
          ))}
      </div>
    </div>
  );
}
