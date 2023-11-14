import React from "react";

export const AccountContext = React.createContext({
  user: {
    username: "",
    address: "",
    bio: "",
    profile_picture: "",
    banner_picture: "",
    role: "",
    id: "",
    authSignature: "",
    favourites: [],
  },
  setUser: (value) => {},
  updateUser: async ({ bio, profile_picture, banner_picture }) => {},
  addToFavourites: async (id, comic) => {},
  removeFromFavourites: async (id) => {},
  isFavourite: (id) => false,
});
