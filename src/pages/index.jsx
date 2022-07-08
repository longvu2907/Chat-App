import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../services/firebase/config";
import ChatPage from "./ChatPage";
import "./index.scss";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
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
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

const Layout = ({ pending }) => {
  return (
    <Loading>
      <Header />
      <div className='wrapper'>
        <Container>{!pending && <Outlet />}</Container>
      </div>
    </Loading>
  );
};

const Signout = () => {
  auth.signOut();

  return <></>;
};

const RequireAuth = ({ isSignedIn, children }) => {
  if (!isSignedIn) return <Navigate to='/login' />;

  return children;
};
