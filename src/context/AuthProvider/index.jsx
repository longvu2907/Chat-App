import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/config";
import { LoadingContext } from "../LoadingProvider";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const unsubcribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthState({ isSignedIn: true, pending: false, user });
        navigate("/");
      } else setAuthState({ isSignedIn: false, pending: false, user });

      setIsLoading(false);
    });

    return () => {
      unsubcribeAuth();
    };
  }, [navigate, setIsLoading]);

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
