import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../../../components/Input";
import { AuthContext } from "../../../../context/AuthProvider";
import { LoadingContext } from "../../../../context/LoadingProvider";
import { db } from "../../../../services/firebase/config";
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
  const { setIsLoading } = useContext(LoadingContext);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const { register, watch } = useForm();
  const watchSearch = watch("search", "");
  const wrapperRef = useRef(null);
  const {
    authState: { user },
  } = useContext(AuthContext);
  console.log(members);

  const onSearch = useMemo(
    () => async queryText => {
      setIsLoading(true);
      queryText = unicodeNormalizer(queryText);

      const q = query(
        collection(db, searchCollection),
        orderBy(searchField),
        startAt(queryText),
        endAt(queryText + "\uf8ff"),
      );
      const docs = await getDocs(q);
      const data = [];
      docs.forEach(doc => data.push(doc.data()));

      setResults(data.filter(value => value.uid !== user.uid));
      setIsLoading(false);
    },
    [searchCollection, searchField, setIsLoading, user],
  );

  useEffect(() => {
    if (watchSearch === "") {
      setResults([]);
      return;
    }

    const searchDebounce = setTimeout(() => {
      onSearch(watchSearch);
    }, 500);

    return () => clearTimeout(searchDebounce);
  }, [watchSearch, onSearch]);

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
        placeholder={placeholder || "Search"}
        name='search'
        autoComplete='off'
        icon={<AiOutlineSearch />}
        onIconClick={() => onSearch(watchSearch)}
        register={register}
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
