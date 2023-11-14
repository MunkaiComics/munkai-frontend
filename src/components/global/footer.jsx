import { Link } from "react-router-dom";
import MunkaiLogo from "../../assets/images/munkai-logo.png";
import MunkaiLogoDark from "../../assets/images/monkai-logo-white.png";
import litepaper from "../../assets/documents/Munkai Litepaper.pdf";
import { Context as ThemeContext } from "../../theme/context";
import "./style.css";
import { useContext } from "react";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${theme === "dark" ? "footer__dark" : "footer"}`}>
      <div className="footer__inner">
        <div className="brand">
          <img
            src={theme === "dark" ? MunkaiLogo : MunkaiLogoDark}
            alt="Munkai"
          />
          <div className="brand__text">
            <p>
              Creating a Read-to-Earn (R2E) platform on the blockchain for
              readers, crypto enthusiasts and creators.
            </p>
          </div>
        </div>
        <div className="contacts">
          <div className="mail">
            <p className="us raleway">CONTACT US</p>
            <p>
              <a href="mailto:hello@munkai.art">hello@munkai.art</a>
            </p>
          </div>
          <div className="legal">
            <p className="legal__text raleway">LEGAL</p>
            <Link
              style={{ textDecoration: "none" }}
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Terms and conditions</p>
            </Link>
            <p>
              <a
                href={litepaper}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Litepaper
              </a>
            </p>
            <p>
            <a
                href="https://github.com/cyberscope-io/audits/blob/main/munk/audit.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Audit Report
              </a>
            </p>
          </div>
        </div>
        <div className="share">
          <p className="raleway">Follow us</p>
          <a
            href="https://t.me/munkaiArt"
            target="_blank"
            rel="noreferrer"
            className="fab fa-telegram steelblue"
          ></a>
          <a
            href="https://twitter.com/munkaiart?t=UkGK2f-YT799rXXMfvIyuQ&s=09"
            target="_blank"
            rel="noreferrer"
            className="fab fa-twitter blue"
          ></a>
          <a
            href="https://instagram.com/munkaiart?utm_medium=copy_link"
            target="_blank"
            rel="noreferrer"
            className="fab fa-instagram red"
          ></a>
          <a
            href="https://youtube.com/channel/UCgpv6rt9FQwOhXa8A0ij-_A"
            target="_blank"
            rel="noreferrer"
            className="fab fa-youtube red"
          ></a>
          <Link
            to="/contact"
            rel="noreferrer"
            className="fas fa-envelope blue"
          ></Link>
        </div>
      </div>
      <div className="credit">
        <hr />
        <p>
          &copy;
          {new Date().getFullYear()} <span>Munkai</span>. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
