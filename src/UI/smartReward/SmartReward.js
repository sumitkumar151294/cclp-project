import React from "react";
import "../smartReward/SmartReward.scss";
import smartbanner from "../../Assets/imgNewUI/smart-reward-banner.png";
import { useSelector } from "react-redux";

const SmartReward = () => {
  // To get the data from redux
  const sectionMasterData = useSelector(
    (state) => state?.sectionMasterReducer?.getsectionMasterData
  );
  const sectionMasterContentData = useSelector(
    (state) => state?.sectionContentMasterReducer?.getSectionContentMasterData
  );

  // TO find and filter the data according to the section
  const supportingBannerId = sectionMasterData?.find(
    (section) => section?.sectionName === "SmartReward"
  )?.id;
  const supportingBannerContent = sectionMasterContentData?.filter(
    (content) => content?.sectionMasterId === supportingBannerId
  );

  return (
    <>
      {supportingBannerContent?.map((bannerData) => (
        <div className="smart_reward_wrapper" key={bannerData?.id}>
          <h3 dangerouslySetInnerHTML={{ __html: bannerData?.text }}></h3>
          <img src={smartbanner} alt="smartbanner" />
          {/* <picture>
                <source media="(max-width: 768px)" srcSet={bannerData?.mobImage} />
                <source media="(min-width: 769px)" srcSet={bannerData?.webImage} />
                <img src={bannerData?.webImage} alt="web-image" />
              </picture> */}
        </div>
      ))}
    </>
  );
};

export default SmartReward;
