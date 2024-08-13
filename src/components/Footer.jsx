import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/products" className="footer-link">
          Products
        </Link>
        <Link to="/about" className="footer-link">
          About
        </Link>
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
      </div>
      <div className="footer-social">
        <a
          href="https://www.tiktok.com/@lalecorrea"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faTiktok} />
        </a>
        <a
          href="https://www.instagram.com/lalecorrea/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100090851383354"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://wa.me/message/MZOLZMY55HXMC1"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
      <div className="footer-contact">
        <p>Email: support@lalefajas.com</p>
      </div>
    </footer>
  );
};

export default Footer;
