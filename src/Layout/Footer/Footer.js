import React from 'react'
import FooterLogo from '../../Assets/footer-logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="footer new-ft">
                <div className="top-footer">
                    <div className="container-fluid">
                        <div className="row justify-content-between">
                            <div className="col-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="footlist">
                                    <div className="footsocial">
                                        <img className="kok" src={FooterLogo} />
                                        <ul>
                                            <li className="d-none"><a target="_blank" ><i className="lab la-facebook-f"></i></a></li>
                                            <li className="d-none"><a target="_blank" ><i className="lab la-instagram"></i></a></li>
                                        </ul>
                                        <div className="footlist">
                                            <a href="tel:+91 9999999999" className="clr-white fnt-13"><i className="las la-phone-alt" style={{transform:'rotate(-85deg)'}}
                                            // style="transform: rotate(-85deg);"
                                            ></i>&nbsp;+91 9999999999</a>
                                            <br />
                                            <a href="mailto:support@cc.giftstacc.com" className="clr-white fnt-13"><i className="las la-envelope"></i>&nbsp;support@cc.giftstacc.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="footlist">
                                    <h4>About</h4>
                                    <ul className="footul">
                                        <li><a href="#">Our Story</a></li>
                                        <li><a href="#">Vendor Panel</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><Link to = "/faq">Faq</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="footlist">
                                    <h4>Help</h4>
                                    <ul className="footul">
                                        <li><a href="#">Contact us</a></li>
                                        <li><a href="#">Terms and Conditions</a></li>
                                        <li><a href="#">Cancellation &amp; Returns Policy</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 col-xl-3">
                                <div className="footlist">
                                    <h4>My Account</h4>
                                    <ul className="footul">
                                        <li><a href="#">My Orders</a></li>
                                        <li><a href="#">My Addresses</a></li>
                                        <li><a href="#">Signup</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footlogos d-none">
                            <div className="row justify-content-center">
                                <div className="col-xl-12 col-md-12 col-12">
                                    <div className="copytextbox text-center">
                                        <p>Copyright © 2024 Customer Capital. All Rights Reserved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer