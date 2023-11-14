import React from "react";
import { useHistory } from "react-router-dom";
import "./backButton.scss";

function BackButton({ className, formVariant }) {
  const history = useHistory();

  return (
    <button
      className={`btn back-btn back-button ${className} ${
        formVariant ? "back-button--form" : ""
      }`}
      onClick={() => {
        history.goBack();
      }}
    >
      <span className="back-button__arrow-container">
        <i className="fa fa-chevron-left back-icon" />
      </span>
      BACK
    </button>
  );
}

export default BackButton;
