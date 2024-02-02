import { MenuItem, MenuList } from "@material-ui/core";
import CreepyGhost from "assets/images/creepy-ghost.png";
import Logout from "assets/images/logout.png";
import { AccountContext } from "providers/AccountContext";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./profileMenu.scss";
import { Web3Context } from "providers/Web3Context";
import { getFileUrl } from "utils/file";
import MLogo from "assets/vectors/Mlogo.svg";
import Binance from "assets/vectors/binance.svg";
import { Context as ThemeContext } from "theme/context";

function ProfileMenu({ closeMenu }) {
  const history = useHistory();

  const { theme } = useContext(ThemeContext);
  const { setUser, user } = useContext(AccountContext);
  const { address, username } = user ?? {};

  const { connectWallet, disconnectWallet } = useContext(Web3Context);

  const signin = useCallback(async () => {
    closeMenu();
    await connectWallet();
  }, [closeMenu, connectWallet]);

  const openProfile = () => {
    closeMenu();
    history.push(
      (user.role === "artist" ? "/creator/" : "/user/") + user.username
    );
  };

  const logout = () => {
    closeMenu();
    setUser(null);
    disconnectWallet();
  };

  const connectedWalletItems = [
    <MenuItem key="profile-menu-company">
      <div className="profile-menu__company">
        <p>{username}</p>
        <p style={{ color: "#47a5d8" }}>
          {address.slice(0, 6)}...{address.slice(39)}
        </p>
      </div>
    </MenuItem>,
    // <MenuItem key="profile-menu__munkai">
    //   <div className="profile-menu__munkai">
    //     <img className="munk" src={MLogo} alt="M" />
    //     <div>
    //       <p className="mbalance">Balance</p>
    //       <p className="mvalue">302907</p>
    //     </div>
    //   </div>
    // </MenuItem>,
    // <MenuItem key="profile-menu__binance">
    //   <div className="profile-menu__binance">
    //     <img src={Binance} alt="B" />
    //     <div style={{ marginLeft: "5px" }}>
    //       <p className="mbalance">Balance</p>
    //       <p className="mvalue">302907</p>
    //     </div>
    //   </div>
    // </MenuItem>,
    // <MenuItem
    //   key="profile_menu_item"
    //   onClick={openProfile}
    //   className="profile-menu__item"
    // >
    //   <button className="profile-menu__funds">Add Funds</button>
    // </MenuItem>,
    <MenuItem
      key="profile-menu__text1"
      className="profile-menu__texts"
      onClick={openProfile}
    >
      Profile
    </MenuItem>,
    <MenuItem
      key="logout_menu__text2"
      className="profile-menu__texts"
      onClick={logout}
      style={{ marginBottom: "8px" }}
    >
      Logout
    </MenuItem>,
  ];

  return <MenuList className="profile-menu">{connectedWalletItems}</MenuList>;
}

export default ProfileMenu;
