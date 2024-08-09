import React, { useEffect } from "react";
import "../Topoffer/TopOffer.scss";
import cardarrow from "../../Assets/imgNewUI/card-arrow.png";
import image1 from "../../Assets/imgNewUI/topoffer/Rectangle.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onGetDeal } from "../../Store/Slices/dealSlice";

const BestOffer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetDeal());
  }, []);

  const getDeal = useSelector((state) => state?.dealReducer?.getDealData);

  return (
    <div className="top_offer_wrapper_container">
      <div className="top_offer_header">
        <h3>Top Offer</h3>
        <Link to="/topOffer">
          {" "}
          View All <img src={cardarrow} alt="arrow" />
        </Link>
      </div>
      <div className="top_offer_card_container">
        {getDeal?.slice(0, 6)?.map((deal) => (
          <div className="offer_card" key={deal?.id}>
            <img className="top_image" src={image1} alt="image1" />
            {/* <picture>
                <source media="(max-width: 768px)" srcSet={deal?.mobImage} />
                <source media="(min-width: 769px)" srcSet={deal?.webImage} />
                <img src={deal?.webImage} alt="web-image" />
              </picture> */}
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
  );
};

export default BestOffer;
