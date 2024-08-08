import React, { useEffect } from "react";
import "../UI/HomePage.scss";
import "../UI/responsive.scss";
import Header from "./Header/Header";
import HeroSection from "./HeroSection";
import SpecialofferSlide from "./SpecialofferSlide";
import TabBar from "./tab-component/TabBar";
import SmartReward from "./smartReward/SmartReward";
import BestSeller from "./bestSeller/BestSeller";
import TopOffer from "./Topoffer/TopOffer";
import GiftCard from "./giftCard-Component/GiftCard";
import PointBanner from "./pointBanner/PointBanner";
import SummerSpecial from "./summer/SummerSpecial";
import BestSellergift from "./bestSeller/BestSellergift";
import { useDispatch } from "react-redux";
import { onGetsectionMaster } from "../Store/Slices/sectionMasterSlice";
import { onGetSectionContentMaster } from "../Store/Slices/sectionContentMasterSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetsectionMaster());
    dispatch(onGetSectionContentMaster());
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <HeroSection />
        <SpecialofferSlide />
        <TabBar />
        <SmartReward />
        <BestSeller />
        <TopOffer />
        <BestSellergift />
        <GiftCard />
        <PointBanner />
        <SummerSpecial />
      </div>
    </>
  );
};

export default HomePage;
