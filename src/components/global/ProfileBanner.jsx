import { API_URL } from "config/constants";
import { AccountContext } from "providers/AccountContext";
import React, { useContext } from "react";
import { EditButton } from "./EditButton";
import Spinner from "./Spinner";

export const ProfileBanner = ({ url }) => {
  const noEdit = !!url;
  const [bannerLoading, setBannerLoading] = React.useState(false);

  const { user, updateUser } = useContext(AccountContext);
  const imageUrl =
    url === undefined
      ? user.banner_picture && `${API_URL}/file/${user.banner_picture}`
      : url;
  const handleFileChange = (name) => async (event) => {
    const value = event.target.files[0];
    let fieldName;
    switch (name) {
      case "banner":
        setBannerLoading(true);
        fieldName = "banner_picture";
        break;
      default:
        break;
    }
    await updateUser({ [fieldName]: value }).catch((error) => {
      console.error(error);
    });
    setBannerLoading(false);
  };
  return (
    <div className={"profile__banner " + (bannerLoading ? "loading" : "")}>
      {bannerLoading && (
        <div className='spinner'>
          <Spinner />
        </div>
      )}
      {imageUrl && <img src={imageUrl} alt='banner' />}
      {!noEdit && (
        <EditButton
          parentClassName='profile__banner'
          isInput={true}
          onChange={handleFileChange("banner")}
        />
      )}
    </div>
  );
};
