import { createContext } from "react";

export const themes = {
  dark: "dark",
  light: "light",
};

export const Context = createContext({
  theme: themes.dark,
  changeTheme: () => {},
});
