import { AccountContext } from ".";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "providers/Web3Context";
import axios from "axios";
import { SIGN_IN_MESSAGE, UPDATE_PROFILE_MESSAGE } from "config/constants";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

const AccountContextProvider = ({ children }) => {
  const initialData = localStorage.getItem("user");
  const initialUser = initialData && JSON.parse(initialData);
  const [, rebuild] = useState({});
  const [user, setUser] = useState(initialUser);
  const {
    provider,
    disconnectWallet,
    loading: providerLoading,
  } = useContext(Web3Context);
  const history = useHistory();

  const changeUser = (value) => {
    // Save user to session
    value
      ? localStorage.setItem("user", JSON.stringify(value))
      : localStorage.removeItem("user");

    value === null
      ? setUser(() => null)
      : setUser((user) => ({ ...(user ?? {}), ...value }));
  };

  useEffect(() => {
    async function getUser() {
      const accounts = await provider.listAccounts();
      const address = accounts[0];
      const signer = provider.getSigner();
      let signature;
      try {
        signature = await signer.signMessage(SIGN_IN_MESSAGE);
      } catch (error) {
        if (error.code === 4001) {
          disconnectWallet();
          changeUser(null);
          toast.error(error.message);
          return;
        } else throw error;
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          {},
          {
            auth: {
              username: address,
              password: signature,
            },
          }
        );
        changeUser({ ...response.data.data, authSignature: signature });
      } catch (error) {
        // Check if error is axios error
        if (error.response && error.response.status === 404) {
          // User doesn't exist so we want to register the user
          history.push("/create-profile");
        } else {
          throw error;
        }
      }
    }
    if (!provider && !providerLoading) {
      changeUser(null);
    }
    if (provider && !user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, user]);

  const getFavourites = () => {
    const key = `favourites-${user?.address}`;
    const favourites = localStorage.getItem(key);
    return favourites ? JSON.parse(favourites) : {};
  };

  const addToFavourites = async (id, comic) => {
    const favourites = getFavourites();
    localStorage.setItem(
      `favourites-${user?.address}`,
      JSON.stringify({ ...favourites, [id]: comic })
    );
    rebuild({});
  };

  const removeFromFavourites = async (id) => {
    const favourites = getFavourites();
    delete favourites[id];
    localStorage.setItem(
      `favourites-${user?.address}`,
      JSON.stringify(favourites)
    );
    rebuild({});
  };

  const isFavourite = (id) => {
    const favourites = getFavourites();
    return !!favourites[id];
  };

  const updateUser = async ({ bio, profile_picture, banner_picture }) => {
    const signer = provider.getSigner();
    const formData = new FormData();
    if (bio) formData.set("bio", bio);
    if (profile_picture) formData.set("profile_picture", profile_picture);
    if (banner_picture) formData.set("banner_picture", banner_picture);
    const signature = await signer.signMessage(UPDATE_PROFILE_MESSAGE);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        formData,
        {
          auth: {
            username: user.address,
            password: signature,
          },
        }
      );
      changeUser(response.data.data);
    } catch (error) {
      toast("An error occured while trying to update your profile");
      throw error;
    }
  };

  return (
    <AccountContext.Provider
      value={{
        user: {
          ...user,
          favourites: Object.values(getFavourites()),
        },
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        setUser: changeUser,
        updateUser,
      }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
