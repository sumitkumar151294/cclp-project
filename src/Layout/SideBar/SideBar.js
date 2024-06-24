import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
const SideBar = () => {
  const dispatch = useDispatch();
  const currentUrl = useLocation();
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
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
  // function to add active class on Li
  const hanleClick = (e) => {
    document.querySelectorAll(".mm-active").forEach((e) => {
      e.classList.remove("mm-active");
    });
    e.target.closest(".nav-icn").classList.add("mm-active");
  };

  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        {getModule?.isLoading && <Loader />}
          <ul className="metismenu mm-show" id="menu">
            {getModuleData &&
              getModuleData?.map((item, index) => (
                <li
                  key={index}
                  className={`nav-icn ${
                    item.routePath === currentUrl.pathname ? "mm-active" : ""
                  }`}
                  onClick={(e) => hanleClick(e)}
                >
                  <Link
                    className="ai-icon"
                    to={item.routePath}
                    aria-expanded="false"
                  >
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
