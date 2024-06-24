import React, { useState } from "react";
import user from "../../Assets/img/user-profile.png";
import image from "../../Assets/img/logo.png";
import { Link } from "react-router-dom/dist";
const Header = ({ setSideBar, sidebar }) => {
  const [hamburgerClass, setHamburgerClass] = useState(false);
  const handleShowSideBar = () => {
    setHamburgerClass(!hamburgerClass);
    setSideBar(!sidebar);
  };

  // For transition of sidebar - Start
  const sidebarView = window.innerWidth;
  const sideMobileview = sidebarView <= 767;
  const sideTabView = sidebarView > 767 && sidebarView < 1024;
  const body = document.querySelector("body");
  if (body) {
    body.setAttribute(
      "data-sidebar-style",
      sideMobileview ? "overlay" : sideTabView ? "mini" : "full"
    );
    body.setAttribute("data-typography", "opensans");
    body.setAttribute("data-layout", "vertical");
    body.setAttribute("data-theme-version", "light");
    body.setAttribute("data-headerbg", "color_1");
    body.setAttribute("data-nav-headerbg", "color_1");
    body.setAttribute("data-sidebar-position", "fixed");
    body.setAttribute("data-sidebarbg", "color_1");
    body.setAttribute("data-container", "wide");
    body.setAttribute("data-header-position", "fixed");
    body.setAttribute("data-primary", "color_1");
    body.setAttribute("direction", "ltr");
  }
  // For transition of sidebar - End

  return (
    <>
      <div className="nav-header">
        <Link className="brand-logo">
          <img className="w-100" src={image} alt={image} />
        </Link>
        <div className="nav-control d-flex">
          <div
            className={`hamburger ${hamburgerClass ? "is-active" : ""}`}
            onClick={handleShowSideBar}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left"></div>
              <ul className="navbar-nav header-right ">
                <li className="nav-item dropdown  header-profile">
                  <Link className="nav-link" data-bs-toggle="dropdown">
                    <img src={user} width="56" alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;