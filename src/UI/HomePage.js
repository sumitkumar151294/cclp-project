import React from "react";
import Header from "./NewUI/Header/Header";
import RewardsBanner from "./NewUI/RewardsBanner/RewardsBanner";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <RewardsBanner />
    </div>
  );
};

export default HomePage;
