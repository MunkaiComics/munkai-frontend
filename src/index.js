import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeContextWrapper from "./theme/contextWrapper";

const _JSXStyle = require("styled-jsx/style").default;
if (typeof global !== "undefined") {
  Object.assign(global, { _JSXStyle });
}

ReactDOM.render(
  <ThemeContextWrapper>
    <App />
    <div id="modals-container"></div>
  </ThemeContextWrapper>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
