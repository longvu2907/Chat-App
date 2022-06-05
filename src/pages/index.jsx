import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "../component/Container";
import { AuthContext } from "../context/AuthProvider";
import ChatPage from "./ChatPage";
import "./index.scss";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function Pages() {
  const { user } = useContext(AuthContext);

  return (
    <div className='wrapper'>
      <Container>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={user ? <ChatPage /> : <LoginPage />} />
        </Routes>
      </Container>
    </div>
  );
}
