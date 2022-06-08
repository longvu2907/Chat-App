import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./index.scss";

export default function ThemeToggleButton({ theme, toggleTheme, ...props }) {
  const [onMoveOut, setOnMoveOut] = useState(false);
  const [onMoveIn, setOnMoveIn] = useState(true);

  return (
    <div {...props}>
      <div
        className={`theme-toggle-icon ${onMoveIn ? "move-in" : ""}${
          onMoveOut ? "move-out" : ""
        }`}
        onClick={() => {
          if (!onMoveOut && !onMoveIn) setOnMoveOut(true);
        }}
        onAnimationEnd={() => {
          setOnMoveOut(false);
          if (!onMoveIn) {
            setOnMoveIn(true);
            toggleTheme();
          } else setOnMoveIn(false);
        }}
      >
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </div>
    </div>
  );
}
