import React from "react";
import Slider from "react-slick";
import { SwipeableButton } from "react-swipeable-button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/SpecialofferSlide.scss";
import offerTag1 from "../Assets/imgNewUI/cardslideimg/offertag1.png";
import offerTag2 from "../Assets/imgNewUI/cardslideimg/offertag2.png";
import offerTag3 from "../Assets/imgNewUI/cardslideimg/offertag3.png";
import offerTag4 from "../Assets/imgNewUI/cardslideimg/offertag4.png";
import offerTag5 from "../Assets/imgNewUI/cardslideimg/offertag5.png";
import offerTag6 from "../Assets/imgNewUI/cardslideimg/offertag6.png";
import lockIcon from "../Assets/imgNewUI/cardslideimg/lockicon.png";
import Arrow from "../Assets/imgNewUI/Arrow.png";
import { useSelector } from "react-redux";

const SpecialofferSlide = () => {
  const cardSlideSetting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const onSuccess = () => {};
  const isLogin = false;
  // TO get the data from redux
  const sectionMasterData = useSelector(
    (state) => state?.sectionMasterReducer?.getsectionMasterData
  );
  const sectionMasterContentData = useSelector(
    (state) => state?.sectionContentMasterReducer?.getSectionContentMasterData
  );

  // TO find and filter the data according to the section
  const specialOfferSlideId = sectionMasterData?.find(
    (section) => section?.sectionName === "SpecialofferSlide"
  )?.id;
  const specialOfferContent = sectionMasterContentData?.filter(
    (content) => content?.sectionMasterId === specialOfferSlideId
  );

  return (
    <>
      <div className="special_offer_slider_wrapper unlock_offer_card">
        {isLogin && (
          <div>
            <div className="unlock_offer_card_title">
              <h3>Unlock specials for you</h3>
            </div>
            <div className="grid">
              <div className="left_card_body slider_card">
                <div className="d-flex">
                  <div className="card_body col-lg-6 col-md-6 col-sm-6 col-6">
                    <h5 className="card-title">Welcome Bonus </h5>
                    <h4 className="card-text">5000 points</h4>
                    <div className="swipe_button">
                      <SwipeableButton
                        onSuccess={onSuccess}
                        text="Swipe to Claim"
                        text_unlocked="Claimed"
                        color=""
                      />
                    </div>
                  </div>
                  <div className="left__offer_slider col-lg-6 col-md-6 col-sm-6 col-6 grid_inner">
                    <div className="card_slider_wrapper">
                      <div className="upper_card_slide">
                        <div className="upper_slide">
                          <img src={offerTag1} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                        <div className="upper_slide bottom_slide">
                          <img src={offerTag2} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card_slider_wrapper">
                      <div className="upper_card_slide">
                        <div className="upper_slide">
                          <img src={offerTag3} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                        <div className="upper_slide bottom_slide">
                          <img src={offerTag4} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card_slider_wrapper">
                      <div className="upper_card_slide">
                        <div className="upper_slide">
                          <img src={offerTag1} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                        <div className="upper_slide bottom_slide">
                          <img src={offerTag2} alt="cardoffertag" />
                          <span className="img_circle">
                            <img src={lockIcon} alt="lockIcon" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right_card_body">
                <div
                  className="cred_card_top_sec d-flex align-item-center justify-content-between
"
                >
                  <p className="m-0">Hi Hrushikesh</p>
                  <span>XXXX 3734</span>
                </div>
                <div className="cred_card_bottom_sec d-flex align-item-center justify-content-between">
                  <div className="left_point_balance">
                    <p className="m-0">11297</p>
                    <span>Point balance </span>
                  </div>
                  <div className="right_card_switch d-flex align-item-center justify-content-between">
                    <div className="switch_loop_left">
                      <p>FIRST</p>
                      <span>Wealth</span>
                    </div>
                    <div className="switch_loop_right">
                      <p>Switch </p>
                      <span>
                        Card <span> </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* unlock_border */}
        <div className="pt-3 pb-3 mb-15">
          {specialOfferContent?.slice(0, 1)?.map((content) => (
            <div className="unlock_brand_tag" key={content?.id}>
              <p dangerouslySetInnerHTML={{ __html: content?.text }}></p>
            </div>
          ))}
        </div>
        {/* unlock_border */}
      </div>
    </>
  );
};

export default SpecialofferSlide;
