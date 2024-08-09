import React, { useEffect, useState } from "react";
import bank_logo from "../../Assets/imgNewUI/bank_logo.svg";
import navicon from "../../Assets/imgNewUI/navicon.svg";
import plane from "../../Assets/imgNewUI/plane.svg";
import carrow from "../../Assets/imgNewUI/circle-arrow.svg";
import help from "../../Assets/imgNewUI/help.svg";
import larrow from "../../Assets/imgNewUI/left-arrow.svg";
import rarrow from "../../Assets/imgNewUI/right-arrow.svg";
import offerTag from "../../Assets/imgNewUI/offerTag.svg";
import starIcon from "../../Assets/imgNewUI/Star.png";

import "../Header/Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { onGetNavConfigure } from "../../Store/Slices/NavConfigurationSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  useEffect(() => {
    dispatch(onGetNavConfigure());
  }, []);
  const getNavConfiguration = useSelector(
    (state) => state?.navConfigurationReducer?.getNavConfigureData
  );
  const handleClick = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <>
      <header className="header_main_wrapper">
        <div className="container ">
          <nav className="d-flex align-item-center justify-content-between">
            <div className="nav_menu ">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn_toggle"
                onClick={handleClick}
              >
                <img src={navicon} alt="nav_icon" />
              </button>
              <a className="navbar-brand" href="#">
                <img src={bank_logo} alt="bank_logo" />
              </a>
            </div>
            <div className="login_wrapper_btn d-none">
              <button className="btn btn_login">Login</button>
            </div>
            <div className="login_wrapper_btn user_header d-flex align-item-center justify-content-between">
              <span className="label">
                <span>HP</span>
              </span>
              <span className="label_right">
                <img src={starIcon} alt="icon" /> 11,297
              </span>
            </div>
          </nav>
        </div>
        {/* Sidebar-menu */}
        <nav className={`sidebar ${!active ? "active" : ""}`}>
          <div className="sidebar_menu_header d-flex align-items-center">
            <img src={larrow} alt="left-arrow" onClick={handleClick} />
            <h3>Menu</h3>
          </div>
          <div className="sidebar_subMenu">
            {/* top_menu */}
            <ul>
              {getNavConfiguration?.map((navconfig) => (
                <li key={navconfig?.id}>
                  <span>
                    <span className="menu_icon">
                      <img src={plane} alt="plane-icon" />
                    </span>
                    <Link to={navconfig?.navigationMenuName}>
                      <p>{navconfig?.cta}</p>
                    </Link>
                  </span>
                  <span>
                    <img src={rarrow} alt="right-arrow" />
                  </span>
                </li>
              ))}
              <li>
                <span>
                  <span className="menu_icon">
                    <img src={offerTag} alt="plane-icon" />
                  </span>
                  <p>Offers</p>
                </span>
                <span>
                  <img src={rarrow} alt="right-arrow" />
                </span>
              </li>
            </ul>
            {/* top_menu-end */}

            {/* bottom_menu */}
            <ul>
              <li>
                <span>
                  <span className="menu_icon">
                    <img src={help} alt="plane-icon" />
                  </span>
                  <div>
                    <span className="sub_text">Need Help</span>
                    <p>Contact Us</p>
                  </div>
                </span>
                <span>
                  <img src={rarrow} alt="right-arrow" />
                </span>
              </li>
              <li className="m-0">
                <span>
                  <span className="menu_icon">
                    <img src={carrow} alt="plane-icon" />
                  </span>
                  <p>Logout</p>
                </span>
                <span>
                  <img src={rarrow} alt="right-arrow" />
                </span>
              </li>
            </ul>
            {/* bottom_menu end */}
          </div>
        </nav>
        {/* Sidebar-menu-end */}
      </header>
    </>
  );
};

export default Header;
