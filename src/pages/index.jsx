import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Container from "../component/Container";
import Header from "../component/Header";
import { AuthContext } from "../context/AuthProvider";
import { LoadingContext } from "../context/LoadingProvider";
import { auth } from "../services/firebase/config";
import ChatPage from "./ChatPage";
import "./index.scss";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function Pages() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signout' element={<Signout />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      <Header />
      <div className='wrapper'>
        <Container>{isLoading ? <></> : <Outlet />}</Container>
      </div>
    </>
  );
};

const Signout = () => {
  auth.signOut();

  return <Navigate to='/login' />;
};
const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to='/login' />;

  return children;
};
