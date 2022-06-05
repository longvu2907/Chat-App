import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import Container from "../Container";
import ThemeToggleButton from "../ThemeToggleButton";
import "./index.scss";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
          <Link to='/login'>Log in</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </Container>
    </header>
  );
}
