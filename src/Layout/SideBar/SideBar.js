import React from 'react';
import { useSelector } from 'react-redux';

const SideBar = () => {
    //const getModuleData = useSelector((state) => state.moduleReducer);

  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        <ul className="metismenu mm-show" id="menu">
            <li className="nav-icn">
                <a className="ai-icon" href="index.html" aria-expanded="false">
                    <img className="w-20px" src="img/dashboard.png"/>
                    <span className="nav-text">Dashbaord</span>
                </a>

            </li>
            <li className="nav-icn">
                <a className="ai-icon" href="customerlist.html" aria-expanded="false">
                    <img className="w-20px" src="img/segment.png"/>
                    <span className="nav-text">Customer Segment</span>
                </a>

            </li>
            <li className="nav-icn">
                <a href="productlist.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/content.png"/>
                    <span className="nav-text">Product Content </span>
                </a>
            </li>

            <li className="nav-icn">
                <a href="productsection.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/section.png"/>
                    <span className="nav-text">Product Section</span>
                </a>
            </li>



            <li className="nav-icn">
                <a className="ai-icon" href="addcoupon.html" aria-expanded="false">
                    <img className="w-20px" src="img/Add.png"/>
                    <span className="nav-text">Add Coupon</span>
                </a>

            </li>
            <li className="nav-icn">
                <a className="ai-icon" href="bulkcoupon.html" aria-expanded="false">
                    <img className="w-20px" src="img/bulk.png"/>
                    <span className="nav-text">Add bulk coupon</span>
                </a>

            </li>

            <li className="nav-icn">
                <a href="dynamic.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/Dynamic.png"/>
                    <span className="nav-text">Dynamic coupon</span>
                </a>
            </li>
            <li className="nav-icn">
                <a href="coupon.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/list.png"/>
                    <span className="nav-text">Coupon List</span>
                </a>
            </li>

            <li className="nav-icn">
                <a href="category.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/2Category.png"/>
                    <span className="nav-text">Category Master</span>
                </a>
            </li>

            <li className="nav-icn">
                <a href="deal.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/Deal.png"/>
                    <span className="nav-text">Deal Management</span>
                </a>
            </li>

            <li className="nav-icn">
                <a href="deallist.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/Deal.png"/>
                    <span className="nav-text">Deal List</span>
                </a>
            </li>

            <li className="nav-icn">
                <a href="dealto.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/customer2.png"/>
                    <span className="nav-text">Deal To Segment</span>
                </a>
            </li>


            <li className="nav-icn">
                <a href="pointclaim.html" className="ai-icon" aria-expanded="false">
                    <img className="w-20px" src="img/master.png"/>
                    <span className="nav-text ps-1">
                        Campaign Master
                    </span>
                </a>
            </li>
        </ul>

    </div>
   </div>
  )
}

export default SideBar;
