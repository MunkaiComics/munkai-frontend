import { ethers } from "ethers";
import React from "react";

export const Web3Context = React.createContext({
  provider: ethers.getDefaultProvider(),
  connectWallet: async () => {},
  disconnectWallet: () => {},
  loading: false,
  /** @type { import("ethers").Contract | null } */
  chaptersContract: null,
  /** @type { import("ethers").Contract | null } */
  bUSDTokenContract: null,
});
