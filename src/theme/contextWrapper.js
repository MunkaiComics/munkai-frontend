import React, { useState, useEffect } from "react";
import { Context, themes } from "./context";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState("");

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    const currentTheme = localStorage["monkai-app-theme"];

    if (!currentTheme) localStorage["monkai-app-theme"] = "light";

    setTheme(localStorage["monkai-app-theme"]);
  }, []);

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        document.body.classList.remove("dark-content");

        var item = document.getElementsByClassName("theme");
        for (var i = 0; i < item.length; i++) {
          item[i].classList.remove("dark");
        }

        localStorage["monkai-app-theme"] = "light";
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        document.body.classList.add("dark-content");

        var item = document.getElementsByClassName("theme");
        for (var i = 0; i < item.length; i++) {
          item[i].classList.add("dark");
        }

        localStorage["monkai-app-theme"] = "dark";
    }
  }, [theme]);

  return (
    <Context.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </Context.Provider>
  );
}
