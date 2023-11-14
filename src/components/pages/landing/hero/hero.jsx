import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Image1 from "../../../../assets/images/img1.png";
import Image2 from "../../../../assets/images/img2.png";
import Image3 from "../../../../assets/images/img3.png";
import Image4 from "../../../../assets/images/imag4.png";
import { Context as ThemeContext } from "../../../../theme/context";
import "../landing.css";
import "./hero.scss";

function Hero() {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const [imageIndex, setImageIndex] = useState(0);
  const background_images = [Image4, Image2, Image3, Image1];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setImageIndex((prev) => {
        if (prev === 3) {
          return 0;
        }
        return prev + 1;
      });
    }, 10000);

    return () => clearTimeout(timeout);
  }, [imageIndex]);

  return (
    <section
      className={`${theme === "dark" ? "hero__dark" : "hero"}`}
      style={{
        backgroundImage: `linear-gradient(
        rgba(0,0,0,0.60),
        rgba(0,0,0,0.60)
      ), url(${background_images[imageIndex]})`,
      }}
    >
      <div className="background-text">
        {/* <h6>MUNKAI MARKETPLACE</h6> */}
        <h1>Discover Rare Digital literature & Collect NFTs</h1>
        <p>
          Munkai is a Read-to-Earn platform on the blockchain,
          empowering creators and fans with a free market for everyone
        </p>
        <button onClick={() => history.push("/explore")}>EXPLORE</button>
      </div>
    </section>
  );
}

export default Hero;
