import { useEffect, useMemo, useState } from "react";
import { ReactComponent as SearchIcon } from "assets/vectors/search.svg";
import Card from "../../global/card";
import Nav from "../../global/nav";
import BackButton from "components/global/BackButton";
import FilterMenu from "./subcomponents/FilterMenu";
import "../landing/landing.css";
import "./explore.scss";
import axios from "axios";
import { API_URL } from "config/constants";
import _ from "lodash";
import { getFileUrl } from "utils/file";
import Footer from "components/global/footer";

function Explore() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [chapters, setChapters] = useState(null);

  const fetchChapters = useMemo(
    () =>
      _.throttle(filter => {
        setChaptersLoading(true);

        axios
          .get(`${API_URL}/publication/find`, {
            params: { author: search, type: filter },
          })
          .then(res => {
            setChapters(res.data.data);
          })

          .catch(console.error)
          .finally(() => setChaptersLoading(false));
      }, 1000),
    [search]
  );

  useEffect(() => {
    if (!chaptersLoading) {
      fetchChapters(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, fetchChapters, search]);

  return (
    <div>
      <div className="restricted-width">
        <Nav />
        <div>
          <BackButton />

          <div className="d-flex justify-content-between explore">
            <h1 className="heading text-start">EXPLORE PUBLICATIONS</h1>
            <div className="explore__filters">
              <div className="explore__search-input-container">
                <SearchIcon />
                <input
                  placeholder="Search creators, titles & genres"
                  className="search explore__search-input"
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="form-group col-auto explore__filter-menu">
                <FilterMenu filter={filter} updateFilter={setFilter} />
              </div>
            </div>
          </div>
          <div className="card__list__container">
            <div className="card-list card-list--explore">
              {chapters?.map((data, index) => (
                <Card
                  key={data.id}
                  img={getFileUrl(data.comic.cover)}
                  title={data.comic.title}
                  chapter={`Chapter ${data.number}`}
                  amount={data.views ?? 0}
                  username={data.comic.author?.username}
                  {...data}
                />
              ))}
              {chapters?.length < 5 &&
                new Array(5 - (chapters?.length ?? 0))
                  .fill(0)
                  .map((_, i) => <div className="explore-space-fill" />)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
