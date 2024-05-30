import React, { useEffect } from 'react'
import LetshopHandpick from '../../Components/LetshopHandpick/LetshopHandpick';
import { useDispatch, useSelector } from "react-redux";
import { onGetOfferMaster } from "../../Store/Slices/offerMasterSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const getOfferMasterData = useSelector(
    (state) => state.offerMasterRedcucer.getOfferMaster
  );
  const TopOfferData =
    Array.isArray(getOfferMasterData) &&
    getOfferMasterData.filter((OfferData) => OfferData.placement === "Top");
  const BottomOfferData =
    Array.isArray(getOfferMasterData) &&
    getOfferMasterData.filter((OfferData) => OfferData.placement === "Bottom");
  useEffect(() => {
    dispatch(onGetOfferMaster());
  }, []);
  return (
    <>
      HomePage  
  </>
  );
};

export default HomePage;
