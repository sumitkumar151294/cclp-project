import React, { useState } from 'react';

const RewardsNotification = () => {
  const [isShowing, setIsShowing] = useState(true);

  const handleClose = () => {
    setIsShowing(false);
  };

  return (
    <div
      className={`rewards-notification ${isShowing ? 'show' : 'hide'}`}
    >
      <div className="content">
        <div className="title">
          Welcome to a new rewards experience.
        </div>
        <div className="body">
          Now, unlocking amazing deals on travel, shopping
          and gift cards with your credit cards is
          easier than ever
        </div>
      </div>
      <button className="close" onClick={handleClose}>
        X
      </button>
    </div>
  );
};

export default RewardsNotification;