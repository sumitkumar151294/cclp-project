import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'

const Layout = (props) => {
  const { Component } = props;
  return (
    <>
      <Header />
      <Component />
      <Footer />
    </>
  )
}

export default Layout