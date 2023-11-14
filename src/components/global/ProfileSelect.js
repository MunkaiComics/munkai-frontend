import { useContext } from "react";
import "../pages/artist/profile/profile.scss";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { Context as ThemeContext } from "../../theme/context";
import { MenuItem } from "@material-ui/core";

const ProfileSelect = ({ options, selectedName, setSelectedName }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <FormControl
      style={{ border: "none" }}
      className="select__box"
      variant="outlined"
    >
      <Select
        style={{
          backgroundColor: theme === "dark" ? "#424355" : "#F0EDED",
          color: theme === "dark" ? "#F0EDED" : "#000000",
        }}
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
        id="demo-simple-select-outlined"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProfileSelect;
