import axios from "axios";
import { API_URL } from "config/constants";
import _ from "lodash";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { getFileUrl } from "utils/file";
import Card from "../../../global/card";
import "../landing.css";
import "./arrivals.scss";

function Arrivals() {
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [chapters, setChapters] = useState(null);

  const fetchChapters = _.debounce(() => {
    setChaptersLoading(true);

    axios
      .get(`${API_URL}/publication/parts/find?`, { params: { type: "new" } })
      .then((res) => {
        setChapters(res.data.data);
      })

      .catch(console.error)
      .finally(() => setChaptersLoading(false));
  });

  useEffect(() => {
    if (!chaptersLoading && !chapters) {
      fetchChapters();
    }
  }, []);

  return (
    <div>
      <section className="restricted-width">
        <div className="arrivals theme">
          <h1 className="heading">New Arrivals</h1>
          <div className="arrivals__slider">
            <AliceCarousel
              infinite={false}
              autoWidth
              disableDotsControls
              className="card-list-section__slider"
            >
              {chapters &&
                chapters.map((data, index) => (
                  <div style={{ width: 270 }}>
                    <Card
                      key={data?._id}
                      img={getFileUrl(data?.comic?.cover)}
                      title={data?.title}
                      chapter={`Chapter ${data?.partCount}`}
                      amount={data?.views}
                      username={data?.username}
                      {...data}
                    />
                  </div>
                ))}
            </AliceCarousel>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Arrivals;
