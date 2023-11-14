import React from "react";

function artistDropdown() {
  return (
    <div className="modal-card mx-auto profile py-5 px-5">
      <h3 className="mb-1">Become a Creator</h3>
      <p>Please, fill in the form below to become a Creator</p>
      <div className="my-4">
        <select className="form-select" aria-label="Default select example">
          <option selected>Genre</option>
          <option value="1">Romance</option>
          <option value="2">Sex</option>
          <option value="3">Drama</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          id="validationDefault01"
          value=""
          placeholder="Other Genre (specify)"
          required
        />
      </div>
      <div className="mb-4">
        <select className="form-select" aria-label="Default select example">
          <option selected>How many chapters per volume</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="d-flex align-content-center ">
        <input type="checkbox" name="" id="" className='mt-1' />
        <p className='terms'>
          I have read, understood and agreed to the{" "}
          <span>terms and conditions </span>
        </p>
      </div>
      <div className="text-center mt-4">
        <button className="btn  rounded-pill font-weight-bold">Submit</button>
      </div>
    </div>
  );
}

export default artistDropdown;
