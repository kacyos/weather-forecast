import { blue, deepPurple, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const light = createTheme({
  palette: {
    primary: { main: blue[500], dark: blue[700] },

    text: {
      primary: grey[800],
      secondary: grey[900],
    },

    background: {
      default: blue[50],
      paper: deepPurple["100"],
    },
  },
});
