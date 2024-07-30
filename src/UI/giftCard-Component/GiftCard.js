import React from 'react';
import "../giftCard-Component/GiftCard.scss";
import brand1 from '../../Assets/imgNewUI/brand1.png';
import brand2 from '../../Assets/imgNewUI/brand2.png';
import starIcon from '../../Assets/imgNewUI/Star.png';



const GiftCard = () => {
  return (
    <div className='gift_card_wrapper_container'>
        <div className='gift_card_header'>
          <h3>More Points with Gift Cards​</h3>
        </div>

        <div className='gift_card_grid'>
          <div className='gift_card'>
              <img src={brand2} alt='brand_image'/>
              <h3>Tanishq Gift Card</h3>
              <div className='price_lable'>
                <h4>Starting ₹100 /  400 Pts</h4>
              </div>
              <div className='point_label'>
                  <span>EARN</span>
                  <span><img src={starIcon} alt=''/></span>
                  <span>219</span>
              </div>
          </div>
          <div className='gift_card'>
              <img src={brand1} alt='brand_image'/>
              <h3>Mynta Gift Card</h3>
              <div className='price_lable'>
                <h4>Starting ₹100 /  400 Pts</h4>
              </div>
              <div className='point_label'>
                  <span>EARN</span>
                  <span><img src={starIcon} alt=''/></span>
                  <span>219</span>
              </div>
          </div>
          <div className='gift_card'>
              <img src={brand1} alt='brand_image'/>
              <h3>Mynta Gift Card</h3>
              <div className='price_lable'>
                <h4>Starting ₹100 /  400 Pts</h4>
              </div>
              <div className='point_label'>
                  <span>EARN</span>
                  <span><img src={starIcon} alt=''/></span>
                  <span>219</span>
              </div>
          </div>
          <div className='gift_card'>
              <img src={brand2} alt='brand_image'/>
              <h3>Tanishq Gift Card</h3>
              <div className='price_lable'>
                <h4>Starting ₹100 /  400 Pts</h4>
              </div>
              <div className='point_label'>
                  <span>EARN</span>
                  <span><img src={starIcon} alt=''/></span>
                  <span>219</span>
              </div>
          </div>
          <div className='gift_card'>
              <img src={brand1} alt='brand_image'/>
              <h3>Mynta Gift Card</h3>
              <div className='price_lable'>
                <h4>Starting ₹100 /  400 Pts</h4>
              </div>
              <div className='point_label'>
                  <span>EARN</span>
                  <span><img src={starIcon} alt=''/></span>
                  <span>219</span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default GiftCard;