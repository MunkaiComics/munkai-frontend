import React, { useContext, useEffect, useMemo } from "react";
import { Menu } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ProfileMenu from "./subcomponents/ProfileMenu";
import MunkaiLogo from "assets/images/munkai-logo.png";
import MunkaiLogoLight from "assets/images/monkai-logo-white.png";
import Wallet from "assets/vectors/wallet.svg";
import WalletDark from "assets/vectors/wallet-dark.svg";
import Light from "../../../assets/vectors/sunny.svg";
import Dark from "../../../assets/vectors/sun.svg";
import Bell from "../../../assets/vectors/bell.svg";
import MenuBurger from "../../../assets/vectors/menu-icon.svg";
import MenuDark from "../../../assets/vectors/menu-dark.svg";
import MenuArrow from "../../../assets/vectors/menu-arrow.svg";
import BellDark from "../../../assets/vectors/bell-dark.svg";
import { AccountContext } from "../../../providers/AccountContext";
import { Context as ThemeContext, themes } from "theme/context";
import "../style.css";
import "./nav.scss";
import "./subcomponents/ProfileMenu/profileMenu.scss";
import { useCallback } from "react";
import { Web3Context } from "providers/Web3Context";
import ExploreMenu from "./subcomponents/ExploreMenu";
import useViewport from "hooks/useViewPort";
import ProfilePic from "../../../assets/images/profile-picture.png";
import { getFileUrl } from "utils/file";

function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorExplore, setAnchorExplore] = React.useState(null);
  const [showBlur, setShowBlur] = React.useState(false);
  const [showMobileNav, setShowMobileNav] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const openExplore = Boolean(anchorExplore);
  const { user } = useContext(AccountContext);
  const { address } = user ?? {};
  const { theme, changeTheme } = useContext(ThemeContext);
  const { connectWallet } = useContext(Web3Context);
  const viewPort = useViewport();
  const history = useHistory();
  const menuItems = [
    { name: "Comics", page: "/explore" },
    { name: "Books", page: "/" },
    { name: "Poems", page: "/" },
    { name: "Articles", page: "/" },
    { name: "NFTs", page: "/" },
  ];

  const signin = useCallback(async () => {
    await connectWallet();
  }, [connectWallet]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseExplore = () => {
    setAnchorExplore(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowBlur(true);
      } else {
        setShowBlur(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <div>
        <div className={`navbar ${theme} ${showBlur && "navbar__scroll"}`}>
          <header className="d-xl-block" style={{ width: "100%" }}>
            <div className="header">
              {viewPort < 768 ? (
                <img
                  src={theme === "dark" ? MenuDark : MenuBurger}
                  alt="Menu"
                  onClick={() => setShowMobileNav(prev => !prev)}
                />
              ) : theme === "dark" ? (
                <Link to="/">
                  <img src={MunkaiLogo} alt="logo" className="navbar__logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img
                    src={MunkaiLogoLight}
                    alt="logo"
                    className="navbar__logo__dark"
                  />
                </Link>
              )}

              <div className="links">
                {viewPort > 768 && (
                  <a
                    href="/explore"
                    className="iceland"
                    onClick={event => setAnchorExplore(event.currentTarget)}
                    onMouseOver={event => setAnchorExplore(event.currentTarget)}
                  >
                    <style jsx>{`
                      a {
                        color: #00022b !important;
                      }
                      :global(.dark-content) a {
                        color: #daeaf7 !important;
                      }
                    `}</style>
                    Explore
                  </a>
                )}
                <Menu
                  id="basic-menu"
                  open={openExplore}
                  anchorEl={anchorExplore}
                  style={{ marginTop: "10px" }}
                  onClose={handleCloseExplore}
                  className="explore-menu__root"
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                    onMouseLeave: handleCloseExplore,
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <ExploreMenu handleCloseExplore={handleCloseExplore} />
                </Menu>
                <img
                  src={theme === "dark" ? Light : Dark}
                  className="navbar__mode"
                  alt="Light"
                  onClick={() =>
                    changeTheme(theme === "dark" ? themes.light : themes.dark)
                  }
                />
                <img
                  className="navbar__mode"
                  src={theme === "dark" ? BellDark : Bell}
                  alt="Notification"
                />
                {address ? (
                  viewPort > 768 ? (
                    <img
                      alt=""
                      className="picture"
                      src={
                        user?.profile_picture
                          ? getFileUrl(user.profile_picture)
                          : ProfilePic
                      }
                      onMouseOver={Boolean(viewPort > 768) && handleClick}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    <img
                      alt=""
                      className="picture"
                      src={
                        user?.profile_picture
                          ? getFileUrl(user.profile_picture)
                          : ProfilePic
                      }
                      onClick={Boolean(viewPort < 768) && handleClick}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  )
                ) : (
                  <img
                    src={theme === "dark" ? WalletDark : Wallet}
                    alt="Wallet"
                    onClick={signin}
                  />
                )}
                {address && (
                  <Menu
                    id="basic-menu"
                    className="profile-menu__root"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                      onMouseLeave: handleClose,
                    }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <ProfileMenu closeMenu={handleClose} />
                  </Menu>
                )}
              </div>
            </div>
          </header>
        </div>
        <div className="navbar--outer"></div>
      </div>
      {showMobileNav && viewPort < 768 && (
        <div className="navbar__mobile">
          <div
            className="navbar__mobile-explore"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <p>Explore</p>
            <img src={MenuArrow} alt="" className="navImage" />
          </div>
          {showMobileMenu &&
            viewPort < 768 &&
            menuItems.map(item => (
              <Link
                to={item.page}
                className="inner-list"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.name}
              </Link>
            ))}
          <p style={{ marginTop: "10px" }}>Guides</p>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <img
              src={MunkaiLogoLight}
              alt=""
              className="logo"
              onClick={() => {
                history.push("/");
                setShowMobileMenu(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
