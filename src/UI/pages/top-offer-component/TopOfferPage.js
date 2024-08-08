import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "../top-offer-component/TopOfferPage.scss";
import cartBag from "../../../Assets/imgNewUI/topoffer/cartBag.png";
import cardarrow from "../../../Assets/imgNewUI/card-arrow.png";
import image1 from "../../../Assets/imgNewUI/topoffer/Rectangle.png";
import { useDispatch, useSelector } from "react-redux";
import { onGetDealCategory } from "../../../Store/Slices/dealCategorySlice";
import { onGetDeal } from "../../../Store/Slices/dealSlice";
import bag from "../../../Assets/imgNewUI/topoffer/bag.png";
import food from "../../../Assets/imgNewUI/topoffer/food.png";
import health from "../../../Assets/imgNewUI/topoffer/health.png";
import kid from "../../../Assets/imgNewUI/topoffer/kids.png";
import shopping from "../../../Assets/imgNewUI/topoffer/shopping.png";
import beauty from "../../../Assets/imgNewUI/topoffer/beauty.png";
import cardarrow from '../../../Assets/imgNewUI/card-arrow.png';
import upArrow from '../../../Assets/imgNewUI/Arrow 21.png';
import downArrow from '../../../Assets/imgNewUI/Arrow 22.png';
import image1 from '../../../Assets/imgNewUI/topoffer/Rectangle.png';
import image2 from '../../../Assets/imgNewUI/topoffer/Rectangle2.png';
import image3 from '../../../Assets/imgNewUI/topoffer/Rectangle3.png';


const TopOfferPage = () => {
  const dispatch = useDispatch();
  const getDealCategories = useSelector((state) => state?.dealCategoryReducer);
  const getDeal = useSelector((state) => state?.dealReducer);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showAll, setShowAll] = useState(false);

  console.log(
    getDealCategories?.getDealCategoryData,
    "getDeal",
    getDeal?.getDealData,
    "getDealCategories"
  );

  useEffect(() => {
    dispatch(onGetDealCategory());
    dispatch(onGetDeal());
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const filteredDeals = selectedCategories?.length
    ? getDeal?.getDealData?.filter((deal) =>
        selectedCategories.includes(deal?.category)
      )
    : getDeal?.getDealData;

  const openFilter = () => {
    if (isMobile) {
      setShowFilter((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const items = [
    { src: cartBag, text: 'Shopping' },
    { src: bag, text: 'Travel' },
    { src: food, text: 'Dining' },
    { src: health, text: 'Wellness' },
    { src: kid, text: 'Kids' },
    { src: bag, text: 'Travel' },
    { src: shopping, text: 'Fashion' },
    { src: beauty, text: 'Beauty' },
  ];

  const itemsToShow = isMobile ? (showAll ? items : items.slice(0, 4)) : items;

  const handleToggle = () => {
    setShowAll(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container top_offer_main_wrapper_container">
        <div className="row forMob">
          <div
            className={`col-lg-4 col-md-4 col-sm-4 col-12 filtr_option_wrapper`}
          >
            <div className="filter_switch_btn">
              <div className="switch_btn">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="switch_btn_label">
                <h4>View Offers Valid for Today</h4>
              </div>
            </div>
            <div
              className={`filter_box_wrapper ${
                isMobile && !showFilter ? "hide" : "show"
              }`}
            >
              <h3>Filters</h3>
              <div className="filer_content_menu">
                <h4>Shop by category</h4>
                <ul>
                  {getDealCategories?.getDealCategoryData?.map((category) => (
                    <li key={category?.id}>
                      <input
                        className="form-check-input checkbox"
                        type="checkbox"
                        id={`category-${category?.id}`}
                        onChange={() => handleCategoryChange(category?.id)}
                      />
                      <span>{category?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filter_actions buttons_none">
                <button
                  className="btn cancel_btn"
                  onClick={() => setShowFilter(false)}
                >
                  Cancel
                </button>
                <button className="btn apply_btn">Apply</button>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-8 col-sm-8 col-12 top_offer_content_wrapper">
            <div className="offer_title mobile_heading">
              <h3 className="hide_desktop">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </h3>
              <h3>Top Offers</h3>
              <h3 className="hide_desktop" onClick={openFilter}>
                <i className="fa fa-filter" aria-hidden="true"></i>
              </h3>
            </div>
            <div className="top_offer_menu_tab">

//               {getDealCategories?.getDealCategoryData?.map((category) => (
//                 <div className="sub_menu" key={category?.id}>
//                   <span>
//                     <img src={cartBag} alt="icon" />
//                   </span>
//                   <p>{category?.name}</p>
//                 </div>
//               ))}

              {itemsToShow.map((item, index) => (
                <div key={index} className="sub_menu">
                  <span>
                    <img src={item.src} alt={item.text} />
                  </span>
                  <p>{item.text}</p>
                </div>
              ))}
              {/* Conditionally render button based on screen size */}
              {isMobile && (
                <button onClick={handleToggle} className="toggle-button">
                  {showAll ?  <div className="sub_menu">
                  <span>
                 <img src={upArrow} alt="less" />
                  </span>
                  <p className="less">Less</p>
                </div> :  <div className="sub_menu">
                  <span>
                    <img src={downArrow} alt="more" />
                    <i class="fa-solid fa-angle-up"></i>
                  </span>
                  <p className="more">More</p>
                </div>}
                </button>
              )}

            </div>
            <div className="top_offer_card_container">
              {filteredDeals?.map((deal) => (
                <div className="offer_card" key={deal?.id}>
                  <img className="top_image" src={image1} alt="image1" />
                  <div className="card_title">
                    <h4>{deal?.name}</h4>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopOfferPage;
