import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Logout from "../../Assets/icon/logout.png";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onLogout } from "../../Store/Slices/loginSlice";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useLocation();
  // to get label from API
  const logout = GetTranslationData("UIAdmin", "logout");
  // to get module data from redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  // to call onGetModule
  useEffect(() => {
    dispatch(onGetModule());
    dispatch(onGetUserRoleModuleAccess());
  }, []);
  // To reset the redux store (logout the user)
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    navigate("/")
  };
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
