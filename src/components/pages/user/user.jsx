import React, { useContext, useEffect, useState } from "react";
import BackButton from "components/global/BackButton";
import Nav from "components/global/nav";
import { useHistory } from "react-router";
import CardListSection from "./subcomponents/CardListSection";
import Button from "components/global/Button";
import { AccountContext } from "providers/AccountContext";
import "./user.scss";
import { EditButton } from "components/global/EditButton";
import { ProfileImage } from "components/global/ProfileImage";
import { ProfileBanner } from "components/global/ProfileBanner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "config/constants";
import { RouteNotFoundError } from "errors/route.error";
import { getFileUrl } from "utils/file";
import Footer from "components/global/footer";
import ProfileSection from "components/global/ProfileSection";
import ProfileSelect from "components/global/ProfileSelect";

function User() {
  const history = useHistory();
  const { username } = useParams();
  const sections = ["Comics", "Books", "Poems", "Articles"];
  const profileSelect = ["Collections", "Favorites"];
  const [selectedSectionName, setSelectedSectionName] = useState("Collections");
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const { updateUser } = useContext(AccountContext);
  let { user: contextUser } = useContext(AccountContext);
  const isNotCurrentUser = username !== contextUser.username;
  const [user, setExtUser] = useState(
    isNotCurrentUser ? { username } : contextUser
  );
  const profileUser = isNotCurrentUser ? user : { ...user, ...contextUser };
  const [isFound, setIsFound] = useState(!!username);
  if (!isFound) {
    throw new RouteNotFoundError();
  }
  useEffect(() => {
    if (username) {
      axios
        .get(`${API_URL}/user/${username}`)
        .then((res) => {
          if (res.data.data) {
            setExtUser({ ...profileUser, ...res.data.data });
          } else {
            setIsFound(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [username, isNotCurrentUser]);

  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [bio, setBio] = React.useState(profileUser.bio || "");

  const onEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSelectedChange = (index) => {
    setSelectedSection(sections[index]);
  };

  const handleBioEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateUser({ bio }).catch((error) => {
      console.error(error);
    });
    setIsEditingBio(false);
    setLoading(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Nav />
      <ProfileBanner
        url={
          isNotCurrentUser
            ? profileUser.banner_picture
              ? getFileUrl(profileUser.banner_picture)
              : null
            : undefined
        }
        noEdit={isNotCurrentUser}
      />

      <div className="user restricted-width" style={{ overflowX: "clip" }}>
        <BackButton className="profile__back-button" />

        <div className="profile__details">
          <ProfileImage
            url={
              isNotCurrentUser
                ? getFileUrl(profileUser.profile_picture)
                : undefined
            }
            noEdit={isNotCurrentUser}
          />
          <h1 className="profile__details__username">
            {profileUser?.username}
          </h1>
          <div className="profile__details__bio">
            {!isEditingBio && (
              <p contentEditable={isEditingBio}>
                {bio || (username ? "-" : "Tell us something about yourself")}
              </p>
            )}
            {!isEditingBio && !isNotCurrentUser && (
              <EditButton
                parentClassName="profile__details__bio"
                onClick={onEditBio}
              />
            )}
            {isEditingBio && (
              <form
                className="profile__details__bio__edit"
                onSubmit={handleBioEdit}
              >
                <textarea
                  type="text"
                  value={bio}
                  maxLength="130"
                  cols={30}
                  rows={4}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" isDisabled={loading}>
                  Save
                </Button>
              </form>
            )}
          </div>
          {!isNotCurrentUser &&
            (profileUser.role === "user" ? (
              <Button
                onClick={() => history.push("/become-creator")}
                className="user__artist-button"
              >
                Become a Creator
              </Button>
            ) : (
              <Button
                isDisabled
                variant="outline"
                className="user__artist-button"
              >
                Creator Request pending
              </Button>
            ))}
        </div>

        <div className="">
          <div className="profile__select">
            <div className="profile__select__section">
              {sections.map((section, index) => (
                <ProfileSection
                  section={section}
                  selected={selectedSection}
                  handleSelected={() => handleSelectedChange(index)}
                />
              ))}
            </div>
            <ProfileSelect
              options={profileSelect}
              selectedName={selectedSectionName}
              setSelectedName={setSelectedSectionName}
            />
          </div>
          <CardListSection
            header="COLLECTIONS"
            comics={profileUser.comic_collections}
          />
          {!isNotCurrentUser && (
            <CardListSection
              header="FAVOURITES"
              comics={profileUser.favourites}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default User;
