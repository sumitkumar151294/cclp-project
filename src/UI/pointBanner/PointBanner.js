import React from 'react';
import "..//pointBanner/PointBanner.scss";
import banner1 from '../../Assets/imgNewUI/bonusBanner1.png';
import banner2 from '../../Assets/imgNewUI/bonusBanner2.png';
import banner3 from '../../Assets/imgNewUI/bonusBanner3.png';
import star1 from '../../Assets/imgNewUI/Star 62.png';
import star2 from '../../Assets/imgNewUI/Star 63.png';


const PointBanner = () => {
  return (
    <div className='bonus_banner_wrapper_container'>
        <div className='banner_title'>
            <h3>Bonus Points, No Hidden Charges</h3>
        </div>
        <div className='banner_grid'>
            <img src={banner1} alt='banner'/>
            <img src={banner2} alt='banner'/>
        </div>
        <div className='bottom_banner_grid'>
            <img src={star1} alt='icon'/>
            <img src={banner3} alt='icon'/>
            <img src={star2} alt='icon'/>
        </div>
    </div>
  )
}

export default PointBanner;