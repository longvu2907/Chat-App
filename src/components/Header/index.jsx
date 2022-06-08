import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AuthContext } from "../../context/AuthProvider";
import { LoadingContext } from "../../context/LoadingProvider";
import { ThemeContext } from "../../context/ThemeProvider";
import Container from "../Container";
import ThemeToggleButton from "../ThemeToggleButton";
import "./index.scss";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const loadingBarRef = useRef(null);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isLoading) loadingBarRef.current.continuousStart();
    else loadingBarRef.current.complete();
  }, [isLoading]);

  return (
    <header className='header'>
      <Container>
        <div className='header__title'>
          <Link to=''>Chat App</Link>
        </div>
        <ThemeToggleButton
          className='header__theme-btn'
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div className='header__auth'>
          {!isLoading && user ? (
            <Link to='/signout'>Sign out</Link>
          ) : (
            <>
              <Link to='/login'>Log in</Link>
              <Link to='/signup'>Sign Up</Link>
            </>
          )}
        </div>
      </Container>
      <LoadingBar
        ref={loadingBarRef}
        containerStyle={{ top: "4.5rem" }}
        style={{ height: "3px", background: "var(--logo)" }}
        shadow={false}
      />
    </header>
  );
}
