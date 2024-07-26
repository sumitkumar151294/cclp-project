import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import ProductContentList from "../Pages/ProductContentList/ProductContentList";
import AddCoupon from "../Pages/AddCoupon/AddCoupon";
import AddBulkCoupon from "../Pages/AddBulkCoupon/AddBulkCoupon";
import DynamicCoupon from "../Pages/DynamicCoupon/DynamicCoupon";
import CouponList from "../Pages/CouponList/CouponList";
import CategoryMaster from "../Pages/CategoryMaster/CategoryMaster";
import DealManagement from "../Pages/DealManagement/DealManagement";
import DealList from "../Pages/Deal/DealList";
import DealToSegment from "../Pages/DealToSegment/DealToSegment";
import CompaignMaster from "../Pages/CompaignMaster/CompaignMaster";
import AllocateProduct from "../Pages/ProductSection/AllocateProduct";
import ProductSection from "../Pages/ProductSection/Productsection";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import ClientMasterList from "../Pages/ClientMaster/ClientMasterList";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import SectionMasterList from "../Pages/SectionMaster/SectionMasterList";
import SectionContentMasterList from "../Pages/SectionContentMaster/SectionContentMasterList";
import ModuleMasterList from "../Pages/ModuleMaster/ModuleMasterList";
import DealCategoryList from "../Pages/DealCategory/DealCategoryList";
import DealsList from "../Pages/DealList/DealsList";
import DealCouponList from "../Pages/DealCoupon/DealCouponList";
import DealCauponCodeList from "../Pages/DealCouponCode/DealCauponCodeList";
import CustomerSegmentList from "../Pages/CustomerSegment/CustomerSegmentList";


function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />}/>
        <Route path="/customerSegment" element={<Layout Component={CustomerSegmentList} />}/>
        <Route path="/productContentList" element={<Layout Component={ProductContentList} />}/>
        <Route path="/productSection" element={<Layout Component={ProductSection} />}/> 
        <Route path="/addCoupon" element={<Layout Component={AddCoupon} />}/> 
        <Route path="/addBulkCoupon" element={<Layout Component={AddBulkCoupon} />}/> 
        <Route path="/dynamicCoupon" element={<Layout Component={DynamicCoupon} />}/> 
        <Route path="/couponList" element={<Layout Component={CouponList} />}/> 
        <Route path="/categoryMaster" element={<Layout Component={CategoryMaster} />}/> 
        <Route path="/dealManagement" element={<Layout Component={DealManagement} />}/>
        <Route path="/dealList" element={<Layout Component={DealsList} />}/>
        <Route path="/dealToSegment" element={<Layout Component={DealToSegment} />}/>
        <Route path="/compaignMaster" element={<Layout Component={CompaignMaster} />}/> 
        <Route path="/allocateProduct" element={<Layout Component={AllocateProduct} />}/> 
        <Route path="/roleMaster" element={<Layout Component={RoleMasterList} />}/>
        <Route path="/clientMaster" element={<Layout Component={ClientMasterList} />}/>
        <Route path="/userMaster" element={<Layout Component={UserMasterList} />}/>
        <Route path="/sectionMaster" element={<Layout Component={SectionMasterList} />}/>
        <Route path="/sectionContentMaster" element={<Layout Component={SectionContentMasterList} />}/>
        <Route path="/moduleMaster" element={<Layout Component={ModuleMasterList} />}/>
        <Route path="/dealCategory" element={<Layout Component={DealCategoryList} />}/>
        <Route path="/deal" element={<Layout Component={DealList} />}/>
        <Route path="/dealCoupon" element={<Layout Component={DealCouponList} />}/>
        <Route path="/dealCouponCode" element={<Layout Component={DealCauponCodeList} />}/>
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
