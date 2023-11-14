import { Web3Context } from ".";
import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {
  BUSD_TOKEN_CONTRACT_ADDRESS,
  CHAPTER_MINT_CONTRACT_ADDRESS,
  INFURA_ID,
  MUNK_TOKEN_CONTRACT_ADDRESS,
} from "config/constants";
import toast from "react-hot-toast";
import MunkaiChapters from "assets/abi/MunkaiChapters.json";
import ERC20Token from "assets/abi/ERC20Token.json";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: INFURA_ID,
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions, // required
});

const Web3ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [, setLibrary] = useState();
  const [loading, setLoading] = useState(!!web3Modal.cachedProvider);

  const connectWallet = async () => {
    try {
      const lib = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(lib);
      setProvider(provider);
      setLibrary(lib);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Could not connect to wallet");
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      web3Modal.clearCachedProvider();
      setProvider(null);
      setLibrary(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // hook to automatically connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider && !provider) {
      connectWallet();
    }
  });

  const munkTokenContract =
    provider &&
    new ethers.Contract(
      MUNK_TOKEN_CONTRACT_ADDRESS,
      ERC20Token,
      provider.getSigner()
    );
  const bUSDTokenContract =
    provider &&
    new ethers.Contract(
      BUSD_TOKEN_CONTRACT_ADDRESS,
      ERC20Token,
      provider.getSigner()
    );
  const chaptersContract =
    provider &&
    new ethers.Contract(
      CHAPTER_MINT_CONTRACT_ADDRESS,
      MunkaiChapters,
      provider.getSigner()
    );

  return (
    <Web3Context.Provider
      value={{
        provider,
        connectWallet,
        disconnectWallet,
        loading,
        chaptersContract,
        bUSDTokenContract,
        munkTokenContract,
      }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
