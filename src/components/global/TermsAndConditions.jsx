import React from "react";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  return (
    <div className="form-control__checkbox">
      <input type="checkbox" id="terms" required />
      <label htmlFor="terms" className="form-control__label">
        I have read, understood and agreed to the{" "}
        <Link to="/terms" target="_blank">terms and conditions</Link>
      </label>
    </div>
  );
}

export default TermsAndConditions;
