import React from 'react'

const RewardsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 relative">
    <div className="absolute top-0 right-2">
      <button className="text-3xl">×</button>
    </div>
    <div>
      <h1 className="text-xl text-white pb-1">Welcome to a new rewards experience.</h1>
      <p className="text-sm">
        Now, unlocking amazing deals on travel, shopping and gift cards with your credit cards is easier than ever <span>⭐</span>
      </p>
    </div>
  </div>
  )
}

export default RewardsBanner