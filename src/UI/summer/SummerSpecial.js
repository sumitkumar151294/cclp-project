import React from 'react';
import "../summer/SummerSpecial.scss";
import image1 from '../../Assets/imgNewUI/special/special1.png';
import image2 from '../../Assets/imgNewUI/special/special2.png';
import image3 from '../../Assets/imgNewUI/special/special3.png';
import image4 from '../../Assets/imgNewUI/special/special4.png';


const SummerSpecial = () => {
  return (
    <div className='summer_special_container'>
        <div className='special_card_title'>
            <h3>Summer Specials</h3>
        </div>
        <div className='summer_card_grid'>
            <img src={image1} alt='special_card_image' />
            <img src={image2} alt='special_card_image' />
            <img src={image3} alt='special_card_image' />
            <img src={image4} alt='special_card_image' />
        </div>
    </div>
  )
}

export default SummerSpecial;