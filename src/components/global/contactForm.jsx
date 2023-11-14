import React from "react";
import Button from "./Button";

function ContactForm() {
  return (
    <div className="modal-card mx-auto py-5 px-5">
      <h3 className="mb-1">Contact Munkai Team</h3>
      <p className="artist-form-action">For complaints, please send a mail to hello@munkai.art</p>
      <div className="my-4">
        <input
          type="email"
          className="form-control"
          id="validationDefault01"
          value=""
          placeholder="Email"
          required
        />
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control first-name"
            id="validationDefault01"
            value=""
            placeholder="Firstname"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            value=""
            placeholder="Subject"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <textarea
          class="form-control py-2"
          id="exampleFormControlTextarea1"
          placeholder="Your Message"
          // @ts-ignore
          rows="3"
        ></textarea>
      </div>
      <div className="text-center mt-4">
        <Button
          style={{
            width: "fit-content",
            margin: "0 auto",
            padding: "0 48px",
            borderRadius: 30,
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
