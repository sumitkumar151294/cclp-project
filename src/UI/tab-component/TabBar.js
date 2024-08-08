import React from "react";
import "../tab-component/TabBar.scss";
import planeIcon from "../../Assets/imgNewUI/tab-icon/Plane_icon1.png";
import { useSelector } from "react-redux";

const TabBar = () => {
  // To get the data from redux
  const sectionMasterData = useSelector(
    (state) => state?.sectionMasterReducer?.getsectionMasterData
  );
  const sectionMasterContentData = useSelector(
    (state) => state?.sectionContentMasterReducer?.getSectionContentMasterData
  );

  // TO find and filter the data according to the section
  const customerbenefitsId = sectionMasterData?.find(
    (section) => section?.sectionName === "TabBar"
  )?.id;
  const customerbenefitsIdContent = sectionMasterContentData?.filter(
    (content) => content?.sectionMasterId === customerbenefitsId
  );

  return (
    <div className="tab_bar_wrapper">
      <div className="tab_bar_menu d-flex align-item-center justify-content-between">
        {customerbenefitsIdContent?.map((data) => (
          <div className="sub_menu_bar_wrapper" key={data?.id}>
            <div className="menu_bar">
              <img src={planeIcon} alt="plane_icon" />
              {/* <picture>
                <source media="(max-width: 768px)" srcSet={data?.mobImage} />
                <source media="(min-width: 769px)" srcSet={data?.webImage} />
                <img src={data?.webImage} alt="web-image" />
              </picture> */}
            </div>
            <span dangerouslySetInnerHTML={{ __html: data?.text }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
