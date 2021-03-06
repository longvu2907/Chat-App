import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/config";
import setOnlineStatus from "../../services/firebase/setOnlineStatus";
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
    const unsubcribeAuth = onAuthStateChanged(auth, async user => {
      if (user) {
        await setOnlineStatus(user.uid, true);

        setAuthState({ isSignedIn: true, pending: false, user });
        navigate("/");
      } else {
        authState.user && (await setOnlineStatus(authState.user.uid, false));

        setAuthState({ isSignedIn: false, pending: false, user });
      }

      setIsLoading(false);
    });

    return () => {
      unsubcribeAuth();
    };
  }, [navigate, setIsLoading, authState.user]);

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
