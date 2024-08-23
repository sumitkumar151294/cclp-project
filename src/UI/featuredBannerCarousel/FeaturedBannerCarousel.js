import React from 'react';
import Slider from 'react-slick';
import SliderImg from "../../Assets/imgNewUI/featured.png"

const FeaturedBannerCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div className="carousel-dots">
                <ul> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="dot"></div>
        )
    };
    return (
        <>
            <h2 className='featured-heading'>Featured for you</h2>
            <div className="banner-carousel">
                <Slider {...settings}>
                    <div className="banner-slide">
                        <img src={SliderImg} alt="Slide 1" className="banner-image" />
                    </div>
                    <div className="banner-slide">
                        <img src={SliderImg} alt="Slide 1" className="banner-image" />
                    </div>
                    <div className="banner-slide">
                        <img src={SliderImg} alt="Slide 1" className="banner-image" />
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default FeaturedBannerCarousel