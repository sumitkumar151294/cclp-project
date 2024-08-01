import React from "react";
import Header from "../../Header/Header";
import "../top-offer-component/TopOfferPage.scss";
import cartBag from "../../../Assets/imgNewUI/topoffer/cartBag.png";
import bag from "../../../Assets/imgNewUI/topoffer/bag.png";
import food from "../../../Assets/imgNewUI/topoffer/food.png";
import health from "../../../Assets/imgNewUI/topoffer/health.png";
import kid from "../../../Assets/imgNewUI/topoffer/kids.png";
import shopping from "../../../Assets/imgNewUI/topoffer/shopping.png";
import beauty from "../../../Assets/imgNewUI/topoffer/beauty.png";
import cardarrow from '../../../Assets/imgNewUI/card-arrow.png';
import image1 from '../../../Assets/imgNewUI/topoffer/Rectangle.png';
import image2 from '../../../Assets/imgNewUI/topoffer/Rectangle2.png';
import image3 from '../../../Assets/imgNewUI/topoffer/Rectangle3.png';

const TopOfferPage = () => {
  return (
    <>
      <Header />
      <div className="container top_offer_main_wrapper_container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 filtr_option_wrapper">
            <div className="filter_switch_btn">
              <div className="switch_btn">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
              <div className="switch_btn_label">
                <h4>View Offers Valid for Today</h4>
              </div>
            </div>
            <div className="filter_box_wrapper">
              <h3>Filters</h3>
              <div className="filer_content_menu">
                <h4>Shop by category</h4>
                <ul>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Shopping</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Wellness</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Dining</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Travel</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Fashion</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Kids</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Beauty</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Valid only Today</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Valid on Weekdays</span>
                  </li>
                  <li>
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <span>Valid on Weekends</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-12 top_offer_content_wrapper">
            <div className="offer_title">
              <h3>Top Offers</h3>
            </div>
            <div className="top_offer_menu_tab">
              <div className="sub_menu">
                <span>
                  <img src={cartBag} alt="icon" />
                </span>
                <p>Shopping</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={bag} alt="icon" />
                </span>
                <p>Travel</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={food} alt="icon" />
                </span>
                <p>Dining</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={health} alt="icon" />
                </span>
                <p>Wellness</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={kid} alt="icon" />
                </span>
                <p>Kids</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={bag} alt="icon" />
                </span>
                <p>Travel</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={shopping} alt="icon" />
                </span>
                <p>Fashion</p>
              </div>
              <div className="sub_menu">
                <span>
                  <img src={beauty} alt="icon" />
                </span>
                <p>Beauty</p>
              </div>
            </div>
            <div className="top_offer_card_container">
              <div className="offer_card">
                <img className="top_image" src={image1} alt="image1" />
                <div className="card_title">
                  <h4>Zomato</h4>
                </div>
                <div className="card_content">
                  <p>
                    Avail 10% Instant discount up to Rs 300 on a minimum order
                    Rs.1750
                  </p>
                </div>
                <div className="card_footer">
                  <a href="#">
                    Claim
                    <img src={cardarrow} alt="arrow" />
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image2} alt="image1" />
                <div className="card_title">
                  <h4>Nike</h4>
                </div>
                <div className="card_content">
                  <p>75% off on a minimum Order of ₹499</p>
                </div>
                <div className="card_footer">
                  <a href="#">
                    Click Here
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image2} alt="image1" />
                <div className="card_title">
                  <h4>Nike</h4>
                </div>
                <div className="card_content">
                  <p>75% off on a minimum Order of ₹499</p>
                </div>
                <div className="card_footer">
                  <a href="#">
                    Click Here
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
              <div className="offer_card">
                <img className="top_image" src={image3} alt="image1" />
                <div className="card_title">
                  <h4>Faasos</h4>
                </div>
                <div className="card_content">
                  <p>Get Flat INR 120 off on orders above INR 249</p>
                </div>
                <div className="card_footer clp">
                  <a href="#">
                    T&C
                    {/* <img src={cardarrow} alt='arrow'/> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopOfferPage;
