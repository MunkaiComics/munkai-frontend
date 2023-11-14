import React from "react";
import Button from "components/global/Button";
import { useHistory } from "react-router";

const Error404 = () => {
  const history = useHistory();

  return (
    <div
      className="modal-card mx-auto not-found px-5 pb-1"
      style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
    >
      <h1
        style={{
          fontSize: 200,
          fontFamily: "Iceland",
          color: "rgba(35, 59, 73, 0.4)",
        }}
      >
        404
      </h1>
      <h6
        style={{
          fontSize: 30,
          fontFamily: "Raleway",
          fontWeight: 900,
          color: "#233B49",
        }}
      >
        Oops! Looks like you got lost
      </h6>
      <Button
        style={{
          width: "unset",
          padding: "0 32px",
          margin: "30px auto 24px auto",
          fontSize: 16,
          borderRadius: 30,
        }}
        onClick={() => history.push("/")}
      >
        Back to Homepage
      </Button>
    </div>
  );
};

export default Error404;
