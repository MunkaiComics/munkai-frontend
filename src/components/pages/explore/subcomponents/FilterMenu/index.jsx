import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { ReactComponent as FilterIcon } from "assets/vectors/filter.svg";
import { ReactComponent as FilterIconLight } from "assets/vectors/filter-light.svg";
import { Context } from "theme/context";
import "./filterMenu.scss";

function FilterMenu({ filter, updateFilter }) {
  const filterMenuIcon = (
    <Context.Consumer>
      {({ theme }) => (
        <span
          className={theme === "light" ? "filter-menu__item__icon--light" : ""}
        >
          {theme === "dark" ? <FilterIcon /> : <FilterIconLight />}
        </span>
      )}
    </Context.Consumer>
  );

  return (
    <FormControl fullWidth>
      <Select
        id="filter"
        value={filter}
        label="Filter"
        className="filter-menu"
        onChange={e => {
          updateFilter(e.target.value);
        }}
      >
        <MenuItem value="comic" className="filter-menu__item">
          {filterMenuIcon}
          Comics
        </MenuItem>
        <MenuItem value="book" className="filter-menu__item">
          {filterMenuIcon}
          Books
        </MenuItem>
        <MenuItem value="article" className="filter-menu__item">
          {filterMenuIcon}
          Articles
        </MenuItem>
        <MenuItem value="poem" className="filter-menu__item">
          {filterMenuIcon}
          Poems
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterMenu;
