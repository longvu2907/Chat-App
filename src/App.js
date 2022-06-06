import { useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import "./index.scss";
import Pages from "./pages";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Pages />
    </div>
  );
}

export default App;
