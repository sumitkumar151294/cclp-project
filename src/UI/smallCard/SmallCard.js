import React from 'react'
import FirstWealth from "../../Assets/imgNewUI/firstwealth.png"
import Vector from "../../Assets/imgNewUI/Vector.png"
import Star from "../../Assets/imgNewUI/Star 61.png"

const SmallCard = () => {
  return (
    <div className="small-card-wrapper">
    <div className="card-container">
      <div className="card card-left">
        <div className="card-content">
          <img src={FirstWealth} alt='img' width="46px" height="24px" />
          <img src={Vector} alt='img' width="20px" height="20px" />
        </div>
        <div className="other-cards">+2 Other Cards <i className="fa-solid fa-angle-down"></i></div>
      </div>
      <div className="card card-right">
        <div className="card-content">
          <div className="card-points">20,000</div>
          <img src={Star} alt='img' width="20px" height="20px" />
        </div>
        <div className="redeemable-points">Redeemable Points</div>
      </div>
    </div>
  </div>
  );
};

export default SmallCard