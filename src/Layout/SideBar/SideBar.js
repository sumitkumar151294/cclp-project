import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allowModules,
  onGetModule,
  resetAllowModules,
} from "../../Store/Slices/moduleSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Logout from "../../Assets/icon/logout.png";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onLogout } from "../../Store/Slices/loginSlice";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
import axiosInstanceAdmin from "../../Common/Axios/axiosInstanceAdmin";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

const SideBar = () => {
  const [sideBarModules, setIsSideBarModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useLocation();
  // to get label from API
  const logout = GetTranslationData("UIMasterAdmin", "logout");
  // to get user role module access data from the Redux store
  const userRoleModuleAccess = useSelector(
    (state) => state?.userRoleModuleAccessReducer?.data
  );
  // to get the current user's role ID from the Redux store
  const userRoleID = useSelector(
    (state) => state.loginReducer?.data?.[0]?.clientRoleId
  );
  //to get loginAuthData from redux store
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  //to get login Data from redux store
  const loginDetails = useSelector((state) => state.loginReducer);
  // to get module data from the Redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  // fetch module and user role module access data when the component mounts
  useEffect(() => {
    axiosInstanceAdmin.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
    axiosInstanceClient.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
    axiosInstanceAdmin.defaults.headers["partner-code"] =
      loginDetails?.partner_Key;
    axiosInstanceClient.defaults.headers["partner-code"] =
      loginDetails?.partner_Key;
    axiosInstanceClient.defaults.headers["client-code"] =
      loginAuthData?.data?.[0]?.clientId;
    axiosInstanceAdmin.defaults.headers["client-code"] =
      loginAuthData?.data?.[0]?.clientId;
    if (!getModuleData?.data?.length) {
      dispatch(onGetModule());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(resetAllowModules());
    }
  }, []);
  // to reset the redux store (logout the user)
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    sessionStorage.clear();
    navigate("/");
  };

  // to add an active class to the clicked navigation item
  const hanleClick = (e, moduleId) => {
    document.querySelectorAll(".mm-active").forEach((e) => {
      e.classList.remove("mm-active");
    });
    e.target.closest(".nav-icn").classList.add("mm-active");
    setSelectedModuleId(moduleId);
    dispatch(resetAllowModules());
  };
  // filter and set sidebar modules based on user role access
  useEffect(() => {
    if (!getModule?.isLoading && userRoleModuleAccess?.length) {
      let tempideModules = JSON.parse(JSON.stringify(getModuleData));
  
      // Filter the userRoleModuleAccess data based on role ID and access permissions
      const filterData = userRoleModuleAccess?.filter((item) => {
        return (
          item.roleId === userRoleID &&
          (item.addAccess || item.editAccess || item.viewAccess)
        );
      });
  
      const filterModules = [];
      for (let i = 0; i < tempideModules.length; i++) {
        for (let j = 0; j < filterData?.length; j++) {
          // Check if the module ID matches and the module is enabled
          if (tempideModules[i].id === filterData[j].moduleId && tempideModules[i].enabled) {
            tempideModules[i].moduleId = filterData[j].moduleId;
            filterModules.push(tempideModules[i]);
          }
        }
      }
  
      // Sort the filtered modules based on display_order
      filterModules.sort((a, b) => a.displayOrder - b.displayOrder);
  
      setIsSideBarModules(filterModules);
    }
  }, [getModule, userRoleModuleAccess]);



  // to filter module access data
  const getModuleDataAccess = userRoleModuleAccess.filter((item) => {
    return (
      item.roleId === userRoleID &&
      (item.addAccess || item.editAccess || item.viewAccess)
    );
  });
  useEffect(() => {
    if (
      getModuleDataAccess &&
      selectedModuleId !== null &&
      !getModule?.filteredData?.length
    ) {
      const roleAcessValues = getModuleDataAccess.filter(
        (item) => item.moduleId === selectedModuleId
      );
      dispatch(allowModules(roleAcessValues));
    } else if (
      getModuleDataAccess &&
      selectedModuleId === null &&
      !getModule?.filteredData?.length
    ) {
      const data = sideBarModules.find(
        (item) =>
          item.routePath.toLowerCase() === currentUrl.pathname.toLowerCase()
      );
      const roleAcessValues = getModuleDataAccess.filter(
        (item) => item.moduleId === data?.moduleId
      );
      dispatch(allowModules(roleAcessValues));
    }
  }, [userRoleModuleAccess, selectedModuleId, sideBarModules]);
  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        {getModule?.isLoading ? (
          <div style={{ height: "400px" }}>
            <Loader classType={"absoluteLoader"} />
          </div>
        ) : (
          <ul className="metismenu mm-show" id="menu">
            {sideBarModules &&
              sideBarModules?.map((sideBar, index) => (
                <li
                  key={index}
                  className={`nav-icn ${
                    sideBar.routePath === currentUrl.pathname ? "mm-active" : ""
                  }`}
                  onClick={(e) => hanleClick(e, sideBar.id)}
                >
                  <Link
                    className="ai-icon"
                    to={sideBar.routePath}
                    aria-expanded="false"
                  >
                    <img
                      src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${sideBar.icon}`}
                      style={{ width: "18px" }}
                      alt="mobImage"
                    />
                    <span className="nav-text ps-1">{sideBar.name}</span>
                  </Link>
                </li>
              ))}
            <li className="p-b-3">
              <Link
                className="ai-icon"
                onClick={handleLogout}
                aria-expanded="false"
              >
                <img className="w-20px" src={Logout} alt="file not exist" />
                <span className="nav-text ps-1 "> {logout}</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
