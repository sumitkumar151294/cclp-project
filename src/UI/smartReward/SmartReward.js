import React from 'react';
import "../smartReward/SmartReward.scss";
import smartbanner from '../../Assets/imgNewUI/smart-reward-banner.png';


const SmartReward = () => {
  return (
    <div className='smart_reward_wrapper'>
        <h3>Smart Phones, <span>Smarter Rewards</span></h3>
        <img src={smartbanner} alt='smartbanner'/>
    </div>
  )
}

export default SmartReward;