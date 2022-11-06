import { CssBaseline, ThemeProvider } from "@mui/material";
import { light } from "./css/theme";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
};

export default App;
