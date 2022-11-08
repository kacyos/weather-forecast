import { deepPurple, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const dark = createTheme({
  palette: {
    primary: { main: deepPurple[300], dark: deepPurple[400] },

    text: {
      primary: grey[100],
      secondary: grey[200],
    },

    background: {
      default: grey[700],
      paper: deepPurple["300"],
    },
  },
});

export { dark };
