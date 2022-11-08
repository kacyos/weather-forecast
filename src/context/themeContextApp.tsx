import { ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useEffect, useState } from "react";
import { light } from "../css/theme/light";
import { dark } from "../css/theme/dark";

interface IThemeProviderApp {
  children: ReactNode;
}

export const ThemeContextApp = createContext({
  theme: { name: "" },
  handleTheme: () => {},
});

export const ThemeProviderApp = ({
  children,
}: IThemeProviderApp): JSX.Element => {
  const currentTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState({
    name: currentTheme || "",
    select: light,
  });

  useEffect(() => {
    handleTheme();
  }, []);

  const handleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      setTheme({ name: "dark", select: dark });
      localStorage.setItem("theme", "dark");
    } else {
      setTheme({ name: "light", select: light });
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContextApp.Provider value={{ handleTheme, theme }}>
      <ThemeProvider theme={theme.select}> {children}</ThemeProvider>
    </ThemeContextApp.Provider>
  );
};
