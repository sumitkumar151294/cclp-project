import React, { useState } from "react";
import bank_logo from "../Assets/imgNewUI/bank_logo.svg";
import navicon from '../Assets/imgNewUI/navicon.svg';
import plane from '../Assets/imgNewUI/plane.svg';
import bag from '../Assets/imgNewUI/bag.svg';
import carrow from '../Assets/imgNewUI/circle-arrow.svg';
import gift from '../Assets/imgNewUI/gift.svg';
import help from '../Assets/imgNewUI/help.svg';
import larrow from '../Assets/imgNewUI/left-arrow.svg';
import rarrow from '../Assets/imgNewUI/right-arrow.svg';
import offerTag from '../Assets/imgNewUI/offerTag.svg';
import "../UI/HomePage.scss";
import "../UI/responsive.scss";

import HeroSection from "./HeroSection";
import SpecialofferSlide from "./SpecialofferSlide";
import TabBar from "./tab-component/TabBar";
import SmartReward from "./smartReward/SmartReward";
import BestSeller from "./bestSeller/BestSeller";
import TopOffer from "./Topoffer/TopOffer";
import GiftCard from "./giftCard-Component/GiftCard";
import PointBanner from "./pointBanner/PointBanner";
import SummerSpecial from "./summer/SummerSpecial";

const HomePage = () => {
  const [active, setActive] = useState(false);

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
          <div className="login_wrapper_btn">
            <button className="btn btn_login">Login</button>
          </div>
        </nav>   
        </div>
        {/* Sidebar-menu */}
        <nav className={`sidebar ${!active ? "active" : ""}`}>
          <div className="sidebar_menu_header d-flex align-items-center">
            <img src={larrow} alt="left-arrow"  onClick={handleClick}/>
            <h3>Menu</h3>
          </div>  
          <div className="sidebar_subMenu">
            {/* top_menu */}
            <ul>
                <li>
                    <span>
                        <span className="menu_icon">
                        <img src={plane} alt="plane-icon" />
                        </span>
                        <p>Tripstacc</p>
                    </span>
                    <span>
                        <img src={rarrow} alt="right-arrow"/>
                    </span>
                </li>
                <li>
                    <span>
                        <span className="menu_icon">
                        <img src={bag} alt="plane-icon" />
                        </span>
                        <p>Shopstacc</p>
                    </span>
                    <span>
                        <img src={rarrow} alt="right-arrow"/>
                    </span>
                </li>
                <li>
                    <span>
                        <span className="menu_icon">
                        <img src={gift} alt="plane-icon" />
                        </span>
                        <p>Giftstacc</p>
                    </span>
                    <span>
                        <img src={rarrow} alt="right-arrow"/>
                    </span>
                </li>
                <li>
                    <span>
                        <span className="menu_icon">
                        <img src={offerTag} alt="plane-icon" />
                        </span>
                        <p>Offers</p>
                    </span>
                    <span>
                        <img src={rarrow} alt="right-arrow"/>
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
                        <img src={rarrow} alt="right-arrow"/>
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
                        <img src={rarrow} alt="right-arrow"/>
                    </span>
                </li>
            </ul>
            {/* bottom_menu end */}
          </div>
        </nav>
        {/* Sidebar-menu-end */}
      </header>
      <div className="container">
      <HeroSection/>
      <SpecialofferSlide/>
      <TabBar/>
      <SmartReward/>
      <BestSeller/>
      <TopOffer/>
      <GiftCard/>
      <PointBanner/>
      <SummerSpecial/>
      </div>
    </>
  );
};

export default HomePage;
