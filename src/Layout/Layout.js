import React, { useState } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar';

const Layout = (props) => {
  const { Component } = props;
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div
    id="main-wrapper"
    className={showSideBar ? "show menu-toggle" : "show"}
  >
    <Header setSideBar={setShowSideBar} sidebar={showSideBar} />
      <SideBar/>
      <div className="content-body">
        <Component />
      </div>
      <Footer />
    </div>
  )
}

export default Layout;