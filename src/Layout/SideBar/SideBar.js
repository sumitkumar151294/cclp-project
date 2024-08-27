import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allowModules,
  onGetModule,
  resetAllowModules,
} from "../../Store/Slices/moduleSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import LogoutIcon from "../../Assets/icon/logout.png";
import { onLogout } from "../../Store/Slices/loginSlice";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
import axiosInstanceAdmin from "../../Common/Axios/axiosInstanceAdmin";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const SideBar = () => {
  const [sideBarModules, setSideBarModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = useLocation();

  const logoutLabel = GetTranslationData("UIMasterAdmin", "logout");
  const userRoleModuleAccess = useSelector(
    (state) => state?.userRoleModuleAccessReducer?.data
  );
  const userRoleID = useSelector(
    (state) => state.loginReducer?.data?.[0]?.clientRoleId
  );
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const loginDetails = useSelector((state) => state.loginReducer);
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;

  // Fetch module and user role module access data on mount
  useEffect(() => {
    const token = loginAuthData?.data?.[0]?.token;
    const partnerCode = loginDetails?.partner_Key;
    const clientId = loginAuthData?.data?.[0]?.clientId;

    axiosInstanceAdmin.defaults.headers.Authorization = `Bearer ${token}`;
    axiosInstanceClient.defaults.headers.Authorization = `Bearer ${token}`;
    axiosInstanceAdmin.defaults.headers["partner-code"] = partnerCode;
    axiosInstanceClient.defaults.headers["partner-code"] = partnerCode;
    axiosInstanceClient.defaults.headers["client-code"] = clientId;
    axiosInstanceAdmin.defaults.headers["client-code"] = clientId;

    if (!getModuleData?.length) {
      dispatch(onGetModule());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(resetAllowModules());
    }
  }, [dispatch, getModuleData, loginAuthData, loginDetails]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    sessionStorage.clear();
    navigate("/");
  };

  const handleModuleClick = (e, moduleId) => {
    document.querySelectorAll(".mm-active").forEach((el) => {
      el.classList.remove("mm-active");
    });
    e.currentTarget.classList.add("mm-active");
    setSelectedModuleId(moduleId);
    dispatch(resetAllowModules());
  };

  useEffect(() => {
    if (!getModule?.isLoading && userRoleModuleAccess?.length) {
      const filteredModules = getModuleData
        .filter((module) => {
          return userRoleModuleAccess.some(
            (access) =>
              access.roleId === userRoleID &&
              access.moduleId === module.id &&
              module.enabled &&
              (access.addAccess || access.editAccess || access.viewAccess)
          );
        })
        .sort((a, b) => a.displayOrder - b.displayOrder);

      setSideBarModules(filteredModules);
    }
  }, [getModule, userRoleModuleAccess, userRoleID, getModuleData]);

  useEffect(() => {
    const moduleAccessData = userRoleModuleAccess.filter((item) => {
      return (
        item.roleId === userRoleID &&
        (item.addAccess || item.editAccess || item.viewAccess)
      );
    });

    if (moduleAccessData && !getModule?.filteredData?.length) {
      const roleAccessValues = selectedModuleId
        ? moduleAccessData.filter((item) => item.moduleId === selectedModuleId)
        : moduleAccessData.filter(
            (item) =>
              item.moduleId ===
              sideBarModules.find(
                (module) =>
                  module.routePath.toLowerCase() ===
                  currentUrl.pathname.toLowerCase()
              )?.moduleId
          );

      dispatch(allowModules(roleAccessValues));
    }
  }, [
    dispatch,
    userRoleModuleAccess,
    selectedModuleId,
    sideBarModules,
    currentUrl.pathname,
    getModule?.filteredData?.length,
    userRoleID,
  ]);

  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        {getModule?.isLoading ? (
          <div style={{ height: "400px" }}>
            <Loader classType="absoluteLoader" />
          </div>
        ) : (
          <ul className="metismenu mm-show" id="menu">
            {sideBarModules.map((sideBar) => (
              <li
                key={sideBar.id}
                className={`nav-icn ${
                  sideBar.routePath === currentUrl.pathname ? "mm-active" : ""
                }`}
                onClick={(e) => handleModuleClick(e, sideBar.id)}
              >
                <Link className="ai-icon" to={sideBar.routePath}>
                  <img
                    src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${sideBar.icon}`}
                    style={{ width: "18px" }}
                    alt={sideBar.name}
                  />
                  <span className="nav-text ps-1">{sideBar.name}</span>
                </Link>
              </li>
            ))}
            <li className="p-b-3">
              <Link className="ai-icon" onClick={handleLogout}>
                <img className="w-20px" src={LogoutIcon} alt="Logout" />
                <span className="nav-text ps-1">{logoutLabel}</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
