import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/config";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? "loading" : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
