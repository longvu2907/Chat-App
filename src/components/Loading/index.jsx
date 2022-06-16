import { useContext, useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { LoadingContext } from "../../context/LoadingProvider";

export default function Loading({ children }) {
  const { isLoading } = useContext(LoadingContext);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    if (isLoading) loadingBarRef.current.continuousStart();
    else loadingBarRef.current.complete();
  }, [isLoading]);

  return (
    <>
      <LoadingBar
        ref={loadingBarRef}
        style={{ height: "2px", background: "var(--logo)" }}
        shadow={false}
      />
      {children}
    </>
  );
}
