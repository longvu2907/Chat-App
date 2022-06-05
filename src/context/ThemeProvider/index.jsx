import React, { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }
      localStorage.setItem("theme", "light");
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemeProvider;
