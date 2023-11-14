import "./started.scss";
import Connect from "../../../../assets/vectors/connect.svg";
import Fund from "../../../../assets/vectors/fund.svg";
import Explore from "../../../../assets/vectors/explore.svg";
import Carousel from "react-elastic-carousel";
import { useState } from "react";
import { useEffect } from "react";

const Started = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  return (
    <div className="started">
      <div className="started__container">
        <div className="started__inner">
          <h1>GETTING STARTED</h1>

          {viewportWidth < 768 ? (
            <div className="started__cards">
              <Carousel itemsToShow={1} showArrows={false}>
                <div className="started__card">
                  <img src={Fund} alt="" />
                  <div className="started__card-text">
                    <h6>Connect Wallet / Create Profile</h6>
                  </div>
                </div>
                <div className="started__card">
                  <img src={Connect} alt="" />
                  <div className="started__card-text">
                    <h6>Fund Wallet</h6>
                  </div>
                </div>
                <div className="started__card">
                  <div className="started__card-explore">
                    <img src={Explore} alt="" />
                  </div>
                  <div className="started__card-text">
                    <h6>Explore Comics</h6>
                  </div>
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="started__cards">
              <div className="started__card">
                <img src={Fund} alt="" />
                <div className="started__card-text">
                  <h6>Connect Wallet / Create Profile</h6>
                </div>
              </div>
              <div className="started__card">
                <img src={Connect} alt="" />
                <div className="started__card-text">
                  <h6>Fund Wallet</h6>
                </div>
              </div>
              <div className="started__card">
                <div className="started__card-explore">
                  <img src={Explore} alt="" />
                </div>
                <div className="started__card-text">
                  <h6>Explore Comics</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Started;
