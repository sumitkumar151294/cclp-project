import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import CustomerSegment from "../Pages/CustomerSegment/CustomerSegment";
import ProductContentList from "../Pages/ProductContentList/ProductContentList";
import AddCoupon from "../Pages/AddCoupon/AddCoupon";
import AddBulkCoupon from "../Pages/AddBulkCoupon/AddBulkCoupon";
import DynamicCoupon from "../Pages/DynamicCoupon/DynamicCoupon";
import CouponList from "../Pages/CouponList/CouponList";
import CategoryMaster from "../Pages/CategoryMaster/CategoryMaster";
import DealManagement from "../Pages/DealManagement/DealManagement";
import DealList from "../Pages/DealList/DealList";
import DealToSegment from "../Pages/DealToSegment/DealToSegment";
import CompaignMaster from "../Pages/CompaignMaster/CompaignMaster";
import AllocateProduct from "../Pages/ProductSection/AllocateProduct";
import ProductSection from "../Pages/ProductSection/ProductSection";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import ClientMasterList from "../Pages/ClientMaster/ClientMasterList";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import ProuductContent from "../Pages/Admin/ProductContent/ProuductContent";
import ProuductSection from "../Pages/Admin/ProductSection/ProuductSection";
import AddCouponAdmin from "../Pages/Admin/AddCouponAdmin/AddCouponAdmin";
import DynamicCouponAdmin from "../Pages/Admin/DynamicCouponAdmin/DynamicCouponAdmin";
import CategoryMasterAdmin from "../Pages/Admin/CategoryMasterAdmin/CategoryMasterAdmin";


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
        {/* admin routes */}
        <Route path="/lc-admin/customerSegment" element={<Layout Component={CustomerSegment} />}/>
         <Route path="/lc-admin/productContent" element={<Layout Component={ProuductContent} />}/>
         <Route path="/lc-admin/productSection" element={<Layout Component={ProuductSection} />}/>
         <Route path="/lc-admin/addCoupon" element={<Layout Component={AddCouponAdmin} />}/>
         <Route path="/lc-admin/addBulkCoupon" element={<Layout Component={AddBulkCoupon} />}/>
         <Route path="/lc-admin/dynamicCoupon" element={<Layout Component={DynamicCouponAdmin} />}/>
         <Route path="/lc-admin/categoryMaster" element={<Layout Component={CategoryMasterAdmin} />}/>
         <Route path="/lc-admin/dealManagement" element={<Layout Component={deal} />}/>
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
