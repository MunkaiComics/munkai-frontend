import React, { useState, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import TermsAndConditions from "./TermsAndConditions";
import { SIGN_IN_MESSAGE } from "config/constants";
import axios from "axios";
import { AccountContext } from "providers/AccountContext";
import { Web3Context } from "providers/Web3Context";
import toast from "react-hot-toast";

function Profile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { setUser } = useContext(AccountContext);
  const history = useHistory();

  const { provider } = useContext(Web3Context);

  const signup = async address => {
    const signer = provider.getSigner();
    const signature = await signer.signMessage(SIGN_IN_MESSAGE);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        { email, username, address, signature }
      );
      setUser(response.data.data);
      history.replace("/");
    } catch (error) {
      // Check if error is axios error
      if (error.response) {
        toast.error(error.response.data.message.join("\n"));
        throw error;
      } else {
        throw error;
      }
    }
  };

  const createAccount = async e => {
    e.preventDefault();
    const accounts = await provider.send("eth_requestAccounts", []);
    signup(accounts[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={createAccount}>
        <div className="modal-card mx-auto py-5 px-5">
          <h3 className="mb-1">Create Profile</h3>
          <p className="mb-4 artist-form-action">
            Please, fill in the form below to create a profile
          </p>

          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <input
            type="email"
            className="form-control mb-4"
            id="validationDefault01"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <TermsAndConditions />

          <div className="text-center mt-4">
            <Button
              style={{
                width: "fit-content",
                margin: "0 auto",
                padding: "0 28px",
                borderRadius: 30,
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
