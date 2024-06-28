import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Logout from "../../Assets/icon/logout.png";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onLogout } from "../../Store/Slices/loginSlice";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
const SideBar = () => {
  const [sideBarModules, setIsSideBarModules] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useLocation();
  // to get label from API
  const logout = GetTranslationData("UIAdmin", "logout");
  // to get user role module access data from the Redux store
  const userRoleModuleAccess = useSelector(
    (state) => state.userRoleModuleAccessReducer?.data
  );
  // to get the current user's role ID from the Redux store
  const userRoleID = useSelector(
    (state) => state.loginReducer?.data?.[0]?.adminRoleId
  );
  // to get module data from the Redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  // fetch module and user role module access data when the component mounts
  useEffect(() => {
    if (!getModule?.data?.length) {
      dispatch(onGetModule());
      dispatch(onGetUserRoleModuleAccess());
    }
  }, []);
  // function to handle logout and navigate to the home page
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    navigate("/");
  };
  // function to dynamically import icons based on the icon name
  const iconDynamic = (icon) => {
    try {
      return require(`../../Assets/icon/${icon}.png`);
    } catch (err) {
      console.error(`Cannot find module './${icon}.png'`);
    }
  };
  // to add an active class to the clicked navigation item
  const hanleClick = (e) => {
    document.querySelectorAll(".mm-active").forEach((e) => {
      e.classList.remove("mm-active");
    });
    e.target.closest(".nav-icn").classList.add("mm-active");
  };
  // filter and set sidebar modules based on user role access
  useEffect(() => {
    if (!getModule.isLoading && userRoleModuleAccess.length > 0) {
      let tempideModules = JSON.parse(JSON.stringify(getModuleData));
      const filterData = userRoleModuleAccess.filter((item) => {
        return (
          item.roleId === userRoleID &&
          (item.addAccess || item.editAccess || item.viewAccess)
        );
      });
      const filterModules = [];
      for (var i = 0; i < tempideModules.length; i++) {
        for (var j = 0; j < filterData?.length; j++) {
          if (tempideModules[i].id === filterData[j].moduleId) {
            //tempideModules[i].moduleId = filterData[j].moduleId;
            filterModules.push(tempideModules[i]);
          }
        }
      }
      setIsSideBarModules(filterModules);
    } else {
    }
  }, [getModuleData, userRoleModuleAccess]);
  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        {getModule?.isLoading && <Loader />}
        <ul className="metismenu mm-show" id="menu">
          {sideBarModules &&
            sideBarModules?.map((item, index) => (
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
          <li>
            <Link
              className="ai-icon "
              onClick={handleLogout}
              aria-expanded="false"
            >
              <img className="w-20px" src={Logout} alt="file not exist" />
              <span className="nav-text ps-1"> {logout}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
