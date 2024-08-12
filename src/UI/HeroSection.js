import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../UI/HeroSection.scss";
import slide1 from "../Assets/imgNewUI/Frame 1707479114.png";
import slide2 from "../Assets/imgNewUI/Frame 1707479114.png";
import slide3 from "../Assets/imgNewUI/Frame 1707479114.png";

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          className: "slider variable-width",
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          className: "slider variable-width",
          adaptiveHeight: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="slider-container hero_carousel_offer_wrapper">
        <Slider {...settings}>
          <div>
            <div className="card">
              <img src={slide1} className="card-img-top" alt="slide_image1" />   
            </div>
          </div>
 
        </Slider>
      </div>
    </>
  );
};

export default HeroSection;
