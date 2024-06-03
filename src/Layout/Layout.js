import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar';

const Layout = (props) => {
  const { Component } = props;
  return (
    // <div
    //     id="main-wrapper"
    //     className="show menu-toggle"
    //   >
    <>
      <Header />
      <SideBar/>
      <div className="content-body">
        <Component />
      </div>
      <Footer />
      </>
      // </div>
  )
}

export default Layout;