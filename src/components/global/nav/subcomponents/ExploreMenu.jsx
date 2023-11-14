import { MenuItem, MenuList } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./exploreMenu.scss";

const ExploreMenu = ({ handleCloseExplore }) => {
  const menuItems = [
    { name: "Comics", page: "/explore" },
    { name: "Books", page: "/" },
    { name: "Poems", page: "/" },
    { name: "Articles", page: "/" },
    { name: "NFTs", page: "/" },
  ];

  return (
    <MenuList>
      {menuItems.slice(0, menuItems.length - 1).map((item) => (
        <MenuItem
          key={item.name}
          style={{
            borderBottom: "0.5px solid #dddddd",
            fontSize: "14px",
            margin: "5px 0px 10px 0px",
            backgroundColor: "transparent",
          }}
          onClick={handleCloseExplore}
        >
          <Link className="explore__link" to={item.page}>
            {item.name}
          </Link>
        </MenuItem>
      ))}
      <MenuItem
        key={menuItems[menuItems.length - 1].name}
        style={{
          fontSize: "14px",
          margin: "0px 0px 0px 0px",
          backgroundColor: "transparent",
        }}
        onClick={handleCloseExplore}
      >
        <Link className="explore__link">
          {menuItems[menuItems.length - 1].name}
        </Link>
      </MenuItem>
    </MenuList>
  );
};

export default ExploreMenu;
