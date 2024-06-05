import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { Link } from "react-router-dom";
const SideBar = () => {
  const dispatch = useDispatch();
  const getModuleData = useSelector((state) => state?.moduleReducer?.data);
  useEffect(() => {
    dispatch(onGetModule());
  }, []);
  // to get icon dynamically
  const importIcon = (icon) => {
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
                <Link className="ai-icon" to="" aria-expanded="false">
                  <img
                    className="w-20px"
                    src={importIcon(item.icon)}
                    alt={item.icon}
                  />
                  <span className="nav-text ps-1">{item.name}</span>
                </Link>
              </li>
            ))}
          {/* <li>
            <Link
              className="ai-icon "
              onClick={handleLogout}
              aria-expanded="false"
            >
              <img className="w-20px" src={Logout} alt="file not exist" />
              <span className="nav-text ps-1"> {logout}</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
