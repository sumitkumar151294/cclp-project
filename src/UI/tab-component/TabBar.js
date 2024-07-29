import React from 'react';
import "../tab-component/TabBar.scss";
import planeIcon from '../../Assets/imgNewUI/tab-icon/Plane_icon.png';
import hotelIcon from '../../Assets/imgNewUI/tab-icon/hotel_icon.png';
import cartIcon from '../../Assets/imgNewUI/tab-icon/cart_icon.png';
import giftIcon from '../../Assets/imgNewUI/tab-icon/gift_icon.png';
import offerIcon from '../../Assets/imgNewUI/tab-icon/offer_icon.png';
import textIcon from '../../Assets/imgNewUI/tab-icon/text_icon.png';


const TabBar = () => {
  return (
    <div className='tab_bar_wrapper'>
        <div className='tab_bar_menu d-flex align-item-center justify-content-between'>
            <div className='sub_menu_bar_wrapper'>
                <div className='menu_bar'>
                    <img src={planeIcon} alt='plane_icon'/>
                    <p>Flights</p>
                </div>
                <span>No convenience Fee</span>
            </div>
            <div className='sub_menu_bar_wrapper'>
                <div className='menu_bar'>
                    <img src={hotelIcon} alt='hotel_icon'/>
                    <p>Hotels</p>
                </div>
                <span>20X Rewards</span>
            </div>
            <div className='sub_menu_bar_wrapper'>
                <div className='menu_bar'>
                    <img src={cartIcon} alt='cart_icon'/>
                    <p>Shop</p>
                </div>
                <span>Earn and Redeem Points</span>
            </div>
            <div className='sub_menu_bar_wrapper'>
                <div className='menu_bar'>
                    <img src={giftIcon} alt='gift_icon'/>
                    <p>Gift Card</p>
                </div>
                <span>Up to 25X Rewards</span>
            </div>
            <div className='sub_menu_bar_wrapper'>
                <div className='menu_bar'>
                    <img src={textIcon} alt='text_icon'/>
                    <p></p>
                </div>
                <span>Shop on EMI Earn Points</span>
            </div>
           
          
        </div>
    </div>
  )
}

export default TabBar;