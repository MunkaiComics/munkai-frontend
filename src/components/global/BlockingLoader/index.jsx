import React from "react";
import Loader from "assets/images/loader.gif";
import LoaderDark from "assets/images/loader-dark.gif";
import { Context } from "theme/context";
import "./blockingLoader.scss";

function BlockingLoader() {
  return (
    <div className="blocking-loader">
      <Context.Consumer>
        {({ theme }) => <img alt="Loader" src={theme === "dark" ? LoaderDark : Loader} />}
      </Context.Consumer>
    </div>
  );
}

export default BlockingLoader;
