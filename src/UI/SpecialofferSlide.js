import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/SpecialofferSlide.scss";
import slide1 from '../Assets/imgNewUI/slide-offer1.png';
import slide2 from '../Assets/imgNewUI/slide-offer2.png';
import slide3 from '../Assets/imgNewUI/slide-offer3.png';
import tag1 from '../Assets/imgNewUI/tag1.png';
import tag2 from '../Assets/imgNewUI/tag2.png';
import tag3 from '../Assets/imgNewUI/tag3.png';
import cardarrow from '../Assets/imgNewUI/card-arrow.png';

const SpecialofferSlide = () => {
    const slideSetting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
    
      };
  return (
    <>
    <div className="slider-container special_offer_slider_wrapper">
        <div className='slider_header_title'>
            <h3>Unlock specials for you</h3>
        </div>
        <Slider {...slideSetting}>
            <div className="card">
              <div className="card-body">
                <div className='left_card_body'>
                    <h5 className="card-title">Welcome Bonus </h5>
                    <h4 className="card-text">
                    5000 points
                    </h4>
                    <a href="#" className="btn_link">
                    Book Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                    </a>
                </div>
                <div className='right_card_body'>

                </div>
              </div>
            </div>
          <div>
            <div className="card">
              <img src={slide2} className="card-img-top" alt="slide_image2" />
              <div className="card-body">
                <img src={tag2} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">A Shopping Spree With Points.</h5>
                <p className="card-text">
                Earn Points, Pay with Points​
                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide3} className="card-img-top" alt="slide_image3" />
              <div className="card-body">
                <img src={tag3} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Best Deals on Top brands</h5>
                <p className="card-text">
                with Your IDFC First Bank Credit Card
                with Your IDFC First Bank Credit Card

                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default SpecialofferSlide;