import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { ReactComponent as SortIcon } from "assets/vectors/sort.svg";
import { ReactComponent as SortIconLight } from "assets/vectors/sort-light.svg";
import { Context } from "theme/context";
import "./sortMenu.scss";

function SortMenu({ filter, updateFilter }) {
  const sortMenuIcon = (
    <Context.Consumer>
      {({ theme }) => (
        <span className={theme === "dark" ? "sort-menu__item__icon--dark" : ""}>
          {theme === "dark" ? <SortIcon /> : <SortIconLight />}
        </span>
      )}
    </Context.Consumer>
  );

  return (
    <FormControl>
      <Select
        id="filter"
        value={filter}
        label="Filter"
        className="filter-menu sort-menu"
        onChange={(e) => {
          updateFilter(e.target.value);
        }}
      >
        <MenuItem
          value="ascending"
          className="filter-menu__item sort-menu__item"
        >
          {sortMenuIcon}
          Ascending
        </MenuItem>
        <MenuItem
          value="descending"
          className="filter-menu__item sort-menu__item"
        >
          {sortMenuIcon}
          Descending
        </MenuItem>
        <MenuItem value="random" className="filter-menu__item sort-menu__item">
          {sortMenuIcon}
          Random
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortMenu;
