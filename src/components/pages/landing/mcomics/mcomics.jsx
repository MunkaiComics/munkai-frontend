import axios from "axios";
import { API_URL, MUNKAI_COMICS_USERNAME } from "config/constants.js";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ComicsCard from "../../../global/comicsCard.jsx";
import Arrow from "../../../../assets/vectors/arrow.svg";
import ArrowBlack from "../../../../assets/vectors/arrow-black.svg";
import Carousel from "react-elastic-carousel";
import "./mcomics.scss";
import { Context } from "theme/context.js";
import { useContext } from "react";

function Mcomics() {
  const history = useHistory();
  const [comicsLoading, setComicsLoading] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const { theme } = useContext(Context);
  const [comics, setComics] = useState([]);
  const username = MUNKAI_COMICS_USERNAME;

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  const fetchComics = _.debounce(() => {
    setComicsLoading(true);
    axios
      .get(`${API_URL}/publication/find`, {
        params: { author: username },
      })
      .then((res) => {
        setComics(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setComicsLoading(false));
  }, 500);

  useEffect(() => {
    if (!comicsLoading && comics.length === 0) {
      fetchComics();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [comics]);

  return (
    <div>
      <section className="munkai-comics restricted-width">
        <div className="munkai__comics__heading">
          <h1>MUNKAI ART</h1>

          <div
            className="munkai-comics__button"
            onClick={() => history.push("/creator/" + username)}
          >
            <p>
              View More
              <img src={theme === "dark" ? Arrow : ArrowBlack} alt="arrow" />
            </p>
          </div>
        </div>

        {viewportWidth < 768 ? (
          <div className="comic__card">
            <Carousel itemsToShow={1} showArrows={false}>
              {comics.slice(0, 4).map((comic) => (
                <ComicsCard key={comic.id} {...comic} />
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="comic__card">
            {comics.slice(0, 4).map((comic) => (
              <ComicsCard key={comic.id} {...comic} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Mcomics;
