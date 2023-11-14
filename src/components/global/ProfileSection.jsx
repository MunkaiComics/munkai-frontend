import "../pages/artist/profile/profile.scss";
import { Context as ThemeContext } from "../../theme/context";
import { useContext } from "react";

const ProfileSection = ({ section, selected, handleSelected }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className="section__button"
      style={{
        backgroundColor:
          selected === section
            ? theme === "dark"
              ? "#4fa5d8"
              : "#4fa5d8"
            : theme === "dark"
            ? "#424355"
            : "#F0EDED",
        color:
          selected === section
            ? theme === "dark"
              ? "#F0EDED"
              : "#F0EDED"
            : theme === "dark"
            ? "#F0EDED"
            : "#000000",
      }}
      onClick={handleSelected}
    >
      {section}
    </button>
  );
};

export default ProfileSection;
