import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../../../global/nav";
import BackButton from "components/global/BackButton";
import CardListSection from "components/pages/user/subcomponents/CardListSection";
import Button from "components/global/Button";
import "./profile.scss";
import axios from "axios";
import { AccountContext } from "providers/AccountContext";
import { API_URL } from "config/constants";
import { ProfileImage } from "components/global/ProfileImage";
import { ProfileBanner } from "components/global/ProfileBanner";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { RouteNotFoundError } from "errors/route.error";
import { getFileUrl } from "utils/file";
import { Context as ThemeContext } from "../../../../theme/context";
import Footer from "components/global/footer";
import Bell from "../../../../assets/vectors/bell1.svg";
import BellDark from "../../../../assets/vectors/belldark1.svg";
import ProfileSection from "components/global/ProfileSection";
import ProfileSelect from "components/global/ProfileSelect";

const ArtistProfile = () => {
  const history = useHistory();
  const { username } = useParams();
  const [comics, setComics] = useState([]);
  const sections = ["Comics", "Books", "Poems", "Articles"];
  const [selectedSectionName, setSelectedSectionName] = useState("Owned");
  const creatorOptions = ["Owned", "Collections", "Favorites"];
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [isFound, setIsFound] = useState(!!username);
  const [comicsLoading, setComicsLoading] = useState(false);
  let { user: contextUser } = useContext(AccountContext);
  const isNotCurrentUser = username !== contextUser.username;
  const [artist, setArtist] = useState(
    isNotCurrentUser ? { username, isExtArtist: true } : contextUser
  );
  const { theme } = useContext(ThemeContext);

  if (!isFound) {
    throw new RouteNotFoundError();
  }

  useEffect(() => {
    if (username) {
      axios
        .get(`${API_URL}/artist/`, { params: { username } })
        .then((res) => {
          setArtist({ ...artist, ...res.data.data.user });
        })
        .catch((err) => {
          console.error(err.statusCode);
          setIsFound(false);
        });
    }
  }, [username, artist]);
  const user = artist;

  const fetchComics = _.debounce((user) => {
    setComicsLoading(true);
    axios
      .get(`${API_URL}/comic/find`, {
        params: { author: user.username },
      })
      .then((res) => {
        setComics(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setComicsLoading(false));
  });

  useEffect(() => {
    if (!comicsLoading && comics.length === 0) {
      fetchComics(user);
    }
  }, [user, comicsLoading, comics]);

  const profile = {
    numOfComics: comics.length,
    numOfChapters: user.artistProfile?.chapterCount ?? 0,
  };

  const handleSelectedChange = (index) => {
    setSelectedSection(sections[index]);
  };

  return (
    <div>
      <Nav />
      <ProfileBanner
        url={
          isNotCurrentUser
            ? user.banner_picture
              ? getFileUrl(user.banner_picture)
              : null
            : undefined
        }
        noEdit={isNotCurrentUser}
      />

      <div className="profile restricted-width" style={{ overflowX: "clip" }}>
        <BackButton className="profile__back-button" />
        <div className="profile__details">
          <ProfileImage
            url={
              isNotCurrentUser ? getFileUrl(user.profile_picture) : undefined
            }
            noEdit={isNotCurrentUser}
          />
          <h1 className="profile__details__username">{user.username}</h1>
          <div className="profile__details__stats">
            <div className="profile__details__stats__section">
              <p>{profile.numOfComics} COMICS</p>
            </div>
            <div className="profile__details__stats__section">
              <p>{`${profile.numOfChapters} CHAPTERS`}</p>
            </div>
            <img src={theme === "dark" ? BellDark : Bell} alt="" />
          </div>
          <p className="profile__details__bio">{user.bio}</p>
        </div>
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
            options={creatorOptions}
            selectedName={selectedSectionName}
            setSelectedName={setSelectedSectionName}
          />
        </div>
        <div className="">
          <CardListSection
            header="COMICS"
            comics={comics}
            headerButton={
              isNotCurrentUser ? null : (
                <Button
                  onClick={() => history.push("/create-comic")}
                  className="user__artist-button"
                >
                  Create
                </Button>
              )
            }
          />
          <CardListSection
            header="COLLECTIONS"
            comics={user.comic_collections}
          />
          {!isNotCurrentUser && (
            <CardListSection header="FAVOURITES" comics={user.favourites} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistProfile;
