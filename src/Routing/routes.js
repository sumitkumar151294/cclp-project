import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import CustomerSegment from "../Pages/Client/CustomerSegment/CustomerSegment";
import ProductContentList from "../Pages/Client/ProductContentList/ProductContentList";
import AddCoupon from "../Pages/Client/AddCoupon/AddCoupon";
import AddBulkCoupon from "../Pages/Client/AddBulkCoupon/AddBulkCoupon";
import DynamicCoupon from "../Pages/Client/DynamicCoupon/DynamicCoupon";
import CouponList from "../Pages/Client/CouponList/CouponList";
import CategoryMaster from "../Pages/Client/CategoryMaster/CategoryMaster";
import DealManagement from "../Pages/Client/DealManagement/DealManagement";
import DealList from "../Pages/Client/DealList/DealList";
import DealToSegment from "../Pages/Client/DealToSegment/DealToSegment";
import CompaignMaster from "../Pages/Client/CompaignMaster/CompaignMaster";
import AllocateProduct from "../Pages/Client/ProductSection/AllocateProduct";
import ProductSection from "../Pages/Client/ProductSection/ProductSection";
import RoleMasterList from "../Pages/Admin/RoleMaster/RoleMasterList";
import ClientMasterList from "../Pages/Admin/ClientMaster/ClientMasterList";
import UserMasterList from "../Pages/Admin/UserMaster/UserMasterList";
import SectionMasterList from "../Pages/Client/SectionMaster/SectionMasterList";
import SectionContentMasterList from "../Pages/Client/SectionContentMaster/SectionContentMasterList";


function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />}/> 
        <Route path="/customerSegment" element={<Layout Component={CustomerSegment} />}/>
        <Route path="/productContentList" element={<Layout Component={ProductContentList} />}/>
        <Route path="/productSection" element={<Layout Component={ProductSection} />}/> 
        <Route path="/addCoupon" element={<Layout Component={AddCoupon} />}/> 
        <Route path="/addBulkCoupon" element={<Layout Component={AddBulkCoupon} />}/> 
        <Route path="/dynamicCoupon" element={<Layout Component={DynamicCoupon} />}/> 
        <Route path="/couponList" element={<Layout Component={CouponList} />}/> 
        <Route path="/categoryMaster" element={<Layout Component={CategoryMaster} />}/> 
        <Route path="/dealManagement" element={<Layout Component={DealManagement} />}/> 
        <Route path="/dealList" element={<Layout Component={DealList} />}/> 
        <Route path="/dealToSegment" element={<Layout Component={DealToSegment} />}/>
        <Route path="/compaignMaster" element={<Layout Component={CompaignMaster} />}/> 
        <Route path="/allocateProduct" element={<Layout Component={AllocateProduct} />}/> 
        <Route path="/roleMaster" element={<Layout Component={RoleMasterList} />}/> 
        <Route path="/clientMaster" element={<Layout Component={ClientMasterList} />}/>
        <Route path="/userMaster" element={<Layout Component={UserMasterList} />}/>
        <Route path="/sectionMaster" element={<Layout Component={SectionMasterList} />}/>
        <Route path="/sectionContentMaster" element={<Layout Component={SectionContentMasterList} />}/>
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
