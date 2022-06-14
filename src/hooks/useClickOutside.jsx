import { useEffect } from "react";

export default function useClickOutside({ wrapperRef, onClick }) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        onClick();
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, onClick]);
}
