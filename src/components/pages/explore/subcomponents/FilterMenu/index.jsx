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
        <MenuItem value="all" className="filter-menu__item">
          {filterMenuIcon}
          All
        </MenuItem>
        <MenuItem value="trending" className="filter-menu__item">
          {filterMenuIcon}
          Trending
        </MenuItem>
        <MenuItem value="new" className="filter-menu__item">
          {filterMenuIcon}
          New Arrivals
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterMenu;
