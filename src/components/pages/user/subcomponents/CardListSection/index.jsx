import React, { useState } from "react";
import ComicsCard from "components/global/comicsCard.jsx";
import Button from "components/global/Button";
import "./cardListSection.scss";
import "react-alice-carousel/lib/alice-carousel.css";

import AliceCarousel from "react-alice-carousel";

function CardListSection({ header, comics, headerButton }) {
  const settings = {
    infinite: false,
    speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 6,
    centerMode: false,
    // renderPrevButton: (disabled) => (
    //   <Button iconButton className="float-right">
    //     <i className='fa fa-chevron-left' style={{ fontSize: ".5rem" }} />
    //   </Button>
    // ),
    // renderNextButton: (disabled) => (
    //   <Button
    //     iconButton

    //     rightIcon={
    //       <i className='fa fa-chevron-right' style={{ fontSize: ".5rem" }} />
    //     }></Button>
    // ),

    autoWidth: true,
    disableDotsControls: true,
  };

  return (
    <div className="card-list-section">
      <div className="card-list-section__header">
        <h2 className="card-list-section__title">{header}</h2>
        {headerButton || null}
      </div>

      {(!comics || comics.length === 0) && <div>Nothing here yet</div>}

      {comics && comics.length !== 0 && (
        <AliceCarousel {...settings} className="card-list-section__slider">
          {comics.map((comic, index) => {
            return (
              <div style={{ width: 270 }}>
                <ComicsCard key={index} {...comic} className="" />
              </div>
            );
          })}
        </AliceCarousel>
      )}
    </div>
  );
}

export default CardListSection;
