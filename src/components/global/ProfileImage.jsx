import { API_URL } from "config/constants";
import { AccountContext } from "providers/AccountContext";
import React, { useContext } from "react";
import { EditButton } from "./EditButton";
import defaultProfileImage from "assets/images/profile-picture.png";
import Spinner from "./Spinner";

export const ProfileImage = ({ url }) => {
  const noEdit = !!url;
  const [dPLoading, setDPLoading] = React.useState(false);
  const { user, updateUser } = useContext(AccountContext);
  const imageUrl =
    url === undefined
      ? user.profile_picture && `${API_URL}/file/${user.profile_picture}`
      : url;
  const handleFileChange = (name) => async (event) => {
    const value = event.target.files[0];
    let fieldName;
    switch (name) {
      case "dp":
        setDPLoading(true);
        fieldName = "profile_picture";
        break;
      default:
        break;
    }
    await updateUser({ [fieldName]: value }).catch((error) => {
      console.error(error);
    });
    setDPLoading(false);
  };
  return (
    <div className={`profile__details__image  ${dPLoading ? "loading" : ""}`}>
      {dPLoading && (
        <div className='spinner' style={{ borderRadius: "50%" }}>
          <Spinner />
        </div>
      )}
      <img src={imageUrl || defaultProfileImage} alt='profile' />
      {!noEdit && (
        <EditButton
          parentClassName='profile__details__image'
          isInput={true}
          onChange={handleFileChange("dp")}
        />
      )}
    </div>
  );
};
