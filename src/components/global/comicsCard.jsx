import { useContext } from "react";
import { Link } from "react-router-dom";
import Heart from "assets/vectors/heart.svg";
import HeartFilled from "assets/vectors/heart-filled.svg";
import Button from "./Button";
import "./style.css";
import { getFileUrl } from "utils/file";
import { AccountContext } from "providers/AccountContext";

function Card(props) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useContext(AccountContext);
  const liked = isFavourite(props.id);

  const toggleFavourite = () => {
    if (liked) {
      removeFromFavourites(props.id);
    } else {
      addToFavourites(props.id, props);
    }
  };

  return (
    <div className={"cover-card " + (props.className || "")}>
      <Link
        to={{
          pathname: "/view-comic",
          state: { comic: props },
        }}>
        <div className='card br bs'>
          <div className='image card-img-top zoom-on-hover'>
            <img
              src={getFileUrl(props.cover || props.img)}
              className=''
              alt='cover'
            />
          </div>
          <div className='card-body content pa-3'>
            <h5
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}>
              {props.title}
            </h5>
            <div className='username'>
              <div className='icon'>
                <p className='raleway'>
                  {props.chapterCount}{" "}
                  <span className='iceland pl'>CHAPTERS</span>
                </p>
              </div>
              <p className='raleway'>
                {props.likes ? <span>{props.likes}</span> : null}
                <Button
                  iconButton
                  variant='transparent'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavourite();
                  }}>
                  <img
                    alt={liked ? "favourite" : "not favourite"}
                    src={liked ? HeartFilled : Heart}
                  />
                </Button>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
