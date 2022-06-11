import React, { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../services/firebase/config";
import ChatPage from "./ChatPage";
import "./index.scss";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function Pages() {
  const {
    authState: { isSignedIn, pending },
  } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<Layout pending={pending} />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signout' element={<Signout />} />
        <Route
          path='/'
          element={
            <RequireAuth isSignedIn={isSignedIn}>
              <ChatPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

const Layout = ({ pending }) => {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <Container>{!pending && <Outlet />}</Container>
      </div>
    </>
  );
};

const Signout = () => {
  auth.signOut();

  return <Navigate to='/login' />;
};

const RequireAuth = ({ isSignedIn, children }) => {
  if (!isSignedIn) return <Navigate to='/login' />;

  return children;
};
