import React from "react";
import { Link } from "react-router-dom";

const Footer = ({isLogin}) => {
  return (
    <div className={`footer ${!isLogin && "pl15"}`}>
      <div className="copyright">
        <p>
          Copyright © LC Reward Dev &amp; Developed by
          <Link
            to="https://www.way2webworld.com/"
            target="_blank"
            className="footer-link"
          >
            {" "}
            Way2web World
          </Link>{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
