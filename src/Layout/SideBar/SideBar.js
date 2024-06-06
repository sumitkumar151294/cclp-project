import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { Link } from "react-router-dom";
const SideBar = () => {
  const dispatch = useDispatch();
  const getModuleData = useSelector((state) => state?.moduleReducer?.data);
  // to call onGetModule
  useEffect(() => {
    dispatch(onGetModule());
  }, []);
  // to get icon dynamically
  const iconDynamic = (icon) => {
    try {
      return require(`../../Assets/icon/${icon}.png`);
    } catch (err) {
      console.error(`Cannot find module './${icon}.png'`);
    }
  };
  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        <ul className="metismenu mm-show" id="menu">
          {getModuleData.length &&
            getModuleData?.map((item, index) => (
              <li key={index} className="nav-icn">
                <Link className="ai-icon" to={item.routePath} aria-expanded="false">
                  <img
                    className="w-20px"
                    src={iconDynamic(item.icon)}
                    alt={item.icon}
                  />
                  <span className="nav-text ps-1">{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
