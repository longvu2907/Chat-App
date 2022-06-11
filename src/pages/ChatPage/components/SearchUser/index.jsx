import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../../../components/Input";
import useFirestore from "../../../../hooks/useFirestore";
import unicodeNormalizer from "../../../../utils/unicodeNormalizer";
import Avatar from "../Avatar";
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
  const { register, watch } = useForm();
  const watchSearch = watch("search");

  const condition = useMemo(
    () => ({
      fieldName: searchField,
      operator: "array-contains",
      compareValue: searchKey,
    }),
    [searchField, searchKey],
  );

  const [results, loadMoreResults] = useFirestore(searchCollection, {
    condition,
  });

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      setSearchKey(unicodeNormalizer(watchSearch));
    }, 500);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [results, watchSearch]);

  useEffect(() => {
    //Click out side search-wrapper
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setShowResult(false);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef]);

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
        {results.map(({ displayName, photoURL, uid }) => {
          const added = members && members.includes(uid);
          return (
            <div
              className={`result ${added ? "added" : ""}`}
              onClick={resOnClick}
              key={uid}
              uid={uid}
            >
              <div className='result__avatar'>
                <Avatar src={photoURL} />
              </div>
              <span className='result__name'>{displayName}</span>
              <div className='result__icon'>
                {resIcon && (added ? resIcon[1] : resIcon[0])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
