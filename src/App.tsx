import { CssBaseline } from "@mui/material";

import { Home } from "./pages/Home";
import { ThemeProviderApp } from "./context/themeContextApp";

const App = () => {
  return (
    <ThemeProviderApp>
      <CssBaseline />
      <Home />
    </ThemeProviderApp>
  );
};

export default App;
