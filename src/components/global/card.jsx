import { Link } from "react-router-dom";
import { formatNumberCompact } from "utils/format";
import "./style.css";

function card({ chapterId, img, title, chapter, amount, username }) {
  return (
    <div className="cover-card">
      <Link to={"/chapters/" + chapterId}>
        <div className="card br bs">
          <div className="image zoom-on-hover">
            <img src={img} className="card-img-top" alt="cover" />
          </div>
          <div className="card-body content pa-3">
            <h5
              className="mb-0"
              style={{
                overflowX: "clip",
                whiteSpace: "nowrap",
                overflowWrap: "normal",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h5>
            <p className="iceland pb-2">{chapter}</p>
            <div className="username">
              <div className="icon">
                <p className="fas fa-eye"></p>
                <p className="raleway pl">{formatNumberCompact(amount ?? 0)}</p>
              </div>
              <Link
                to={`/creator/${username}`}
                style={{
                  color: "inherit",
                }}
              >
                <p className="iceland">{username}</p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default card;
