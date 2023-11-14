import "./info.css";
import Finance from "../../../../assets/vectors/finance.svg";
import Send from "../../../../assets/vectors/send.svg";
import Bag from "../../../../assets/vectors/bag.svg";

const Info = () => {
  return (
    <div className="info">
      <div className="info-container">
        <div className="info__cards">
          <div className="info__card">
            <div className="info__image">
              <img src={Finance} alt="book" />
            </div>
            <h6>Read To Earn (R2E)</h6>
            <div className="info__text">
              <p>
                Munkai is the first read-to-earn comic platform on the
                blockchain. As a reader, you will earn the Munkai token from
                paying to read comics on the platform there by becoming a $MUNK
                holder.
              </p>
            </div>
          </div>
          <div className="info__card">
            <div className="info__image">
              <img src={Send} alt="send" />
            </div>
            <h6>Publish To Earn (P2E)</h6>
            <div className="info__text">
              <p>
                Artists/creators can upload and publish their comics on the
                platform and make money from readers when they pay to access and
                read their work.
              </p>
            </div>
          </div>
          <div className="info__card">
            <div className="info__image">
              <img src={Bag} alt="bag" />
            </div>
            <h6>NFT Marketplace</h6>
            <div className="info__text">
              <p>
                We are developing an NFT Marketplace where the characters from
                the comics can be minted and sold as NFTs. Creating a platform
                that easily onboard artists to join the NFT revolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
