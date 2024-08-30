import React, { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../Store/Slices/loginSlice";

const Layout = (props) => {
  const { Component } = props;
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (!sessionStorage.getItem("login")) {
  //     dispatch(onLogout());
  //     sessionStorage.clear();
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div
      id="main-wrapper"
      className={showSideBar ? "show menu-toggle" : "show"}
    >
      <Header setSideBar={setShowSideBar} sidebar={showSideBar} />
      <SideBar />
      <div className="content-body">
        <Component />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
