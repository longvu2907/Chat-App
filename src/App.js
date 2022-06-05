import { useContext } from "react";
import Header from "./component/Header";
import { ThemeContext } from "./context/ThemeProvider";
import "./index.scss";
import Pages from "./pages";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Header />
      <Pages />
    </div>
  );
}

export default App;
