import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { ThemeContext } from "../../context/ThemeProvider";
import Avatar from "../Avatar";
import Container from "../Container";
import ThemeToggleButton from "../ThemeToggleButton";
import "./index.scss";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {
    authState: { isSignedIn, pending, user },
  } = useContext(AuthContext);

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
          {!pending &&
            (isSignedIn ? (
              <>
                <div className='auth__user'>
                  <div className='user__avatar'>
                    <Avatar src={user.photoURL} />
                  </div>
                  <span className='user__name'>{user.displayName}</span>
                </div>
                <Link to='/signout'>Sign out</Link>
              </>
            ) : (
              <>
                <Link to='/login'>Log in</Link>
                <Link to='/signup'>Sign Up</Link>
              </>
            ))}
        </div>
      </Container>
    </header>
  );
}
