import React from "react";
import Nav from "../../global/nav";
import Error404 from "../../global/404";
import BackButton from "components/global/BackButton";

const ErrorPage404 = () => {
  return (
    <div>
      <Nav />
      <BackButton />
      <Error404 />
    </div>
  );
};

export default ErrorPage404;
