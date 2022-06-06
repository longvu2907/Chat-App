import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/config";
import { LoadingContext } from "../LoadingProvider";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const unsubcribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setIsLoading(false);

        navigate("/");
        return;
      }

      setUser(null);
      setIsLoading(false);
    });
    return () => {
      unsubcribeAuth();
    };
  }, [navigate, setIsLoading]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
