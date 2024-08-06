import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/HeroSection.scss";
import slide1 from '../Assets/imgNewUI/Frame 1707479114.png';
import slide2 from '../Assets/imgNewUI/Frame 1707479114.png';
import slide3 from '../Assets/imgNewUI/Frame 1707479114.png';
// import slide2 from '../Assets/imgNewUI/slide-offer2.png';
// import slide3 from '../Assets/imgNewUI/slide-offer3.png';
import tag1 from '../Assets/imgNewUI/tag1.png';
import tag2 from '../Assets/imgNewUI/tag2.png';
import tag3 from '../Assets/imgNewUI/tag3.png';
import cardarrow from '../Assets/imgNewUI/card-arrow.png';


const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          className: "slider variable-width",
          adaptiveHeight: true

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          className: "slider variable-width",
          adaptiveHeight: true



        }
      }
    ]
  };
  return (
    <>
      <div className="slider-container hero_carousel_offer_wrapper">
        <Slider {...settings}>
          <div>
            <div className="card">
              <img src={slide1} className="card-img-top" alt="slide_image1" />
              {/* <div className="card-body">
                <img src={tag1} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Bonus Offers on Travel</h5>
                <p className="card-text">
                20 Bonus Points For Every ₹100 Spent on Hotels. Zero Convenience fee on flights
                </p>
                <a href="#" className="btn_link">
                  Book Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide2} className="card-img-top" alt="slide_image2" />
              {/* <div className="card-body">
                <img src={tag2} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">A Shopping Spree With Points.</h5>
                <p className="card-text">
                Earn Points, Pay with Points​
                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide3} className="card-img-top" alt="slide_image3" />
              {/* <div className="card-body">
                <img src={tag3} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Best Deals on Top brands</h5>
                <p className="card-text">
                with Your IDFC First Bank Credit Card
                with Your IDFC First Bank Credit Card

                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide1} className="card-img-top" alt="slide_image1" />
              {/* <div className="card-body">
                <img src={tag1} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Bonus Offers on Travel</h5>
                <p className="card-text">
                20 Bonus Points For Every ₹100 Spent on Hotels. Zero Convenience fee on flights
                </p>
                <a href="#" className="btn_link">
                  Book Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide2} className="card-img-top" alt="slide_image2" />
              {/* <div className="card-body">
                <img src={tag2} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">A Shopping Spree With Points.</h5>
                <p className="card-text">
                Earn Points, Pay with Points​
                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide3} className="card-img-top" alt="slide_image3" />
              {/* <div className="card-body">
                <img src={tag3} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Best Deals on Top brands</h5>
                <p className="card-text">
                with Your IDFC First Bank Credit Card
                with Your IDFC First Bank Credit Card

                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide1} className="card-img-top" alt="slide_image1" />
              {/* <div className="card-body">
                <img src={tag1} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Bonus Offers on Travel</h5>
                <p className="card-text">
                20 Bonus Points For Every ₹100 Spent on Hotels. Zero Convenience fee on flights
                </p>
                <a href="#" className="btn_link">
                  Book Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide2} className="card-img-top" alt="slide_image2" />
              {/* <div className="card-body">
                <img src={tag2} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">A Shopping Spree With Points.</h5>
                <p className="card-text">
                Earn Points, Pay with Points​
                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
          <div>
            <div className="card">
              <img src={slide3} className="card-img-top" alt="slide_image3" />
              {/* <div className="card-body">
                <img src={tag3} className="offer_tag" alt="offer_tag"/>
                <h5 className="card-title">Best Deals on Top brands</h5>
                <p className="card-text">
                with Your IDFC First Bank Credit Card
                with Your IDFC First Bank Credit Card

                </p>
                <a href="#" className="btn_link">
                  Shop Now <span> <img src={cardarrow} alt="btn arrow icon"/></span>
                </a>
              </div> */}
            </div>
          </div>
         
        </Slider>
      </div>
    </>
  );
};

export default HeroSection;
