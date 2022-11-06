import {
  amber,
  blue,
  deepPurple,
  green,
  grey,
  orange,
  pink,
  red,
} from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const light = createTheme({
  palette: {
    primary: { main: deepPurple[400], dark: deepPurple[500] },

    text: {
      primary: grey[300],
      secondary: grey[400],
    },

    background: {
      default: grey[800],
      paper: deepPurple[400],
    },
  },
});
