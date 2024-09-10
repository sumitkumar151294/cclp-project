import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import DealList from "../Pages/Deal/DealList";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import SectionMasterList from "../Pages/SectionMaster/SectionMasterList";
import SectionContentMasterList from "../Pages/SectionContentMaster/SectionContentMasterList";
import ModuleMasterList from "../Pages/ModuleMaster/ModuleMasterList";
import DealCategoryList from "../Pages/DealCategory/DealCategoryList";
import DealCouponList from "../Pages/DealCoupon/DealCouponList";
import DealCouponCodeList from "../Pages/DealCouponCode/DealCouponCodeList";
import NavConfigurationList from "../Pages/NavConfiguration/NavConfigurationList";
import PageError from "../Components/PageError/PageError";
import DealCouponFrequencyList from "../Pages/DealCouponFrequency/DealCouponFrequencyList";
import MetaDataList from "../Pages/MetaData/MetaDataList";
import BulkUploadingList from "../Pages/BulkUploading/BulkUploadingList";

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />} />

        <Route
          path="/roleMaster"
          element={<Layout Component={RoleMasterList} />}
        />

        <Route
          path="/userMaster"
          element={<Layout Component={UserMasterList} />}
        />
        <Route
          path="/sectionMaster"
          element={<Layout Component={SectionMasterList} />}
        />
        <Route
          path="/sectionContentMaster"
          element={<Layout Component={SectionContentMasterList} />}
        />
        <Route
          path="/moduleMaster"
          element={<Layout Component={ModuleMasterList} />}
        />
        <Route
          path="/dealCategory"
          element={<Layout Component={DealCategoryList} />}
        />
        <Route path="/deal" element={<Layout Component={DealList} />} />
        <Route
          path="/dealCoupon"
          element={<Layout Component={DealCouponList} />}
        />
        <Route
          path="/dealCouponCode"
          element={<Layout Component={DealCouponCodeList} />}
        />
        <Route
          path="/dealCouponFreq"
          element={<Layout Component={DealCouponFrequencyList} />}
        />
          <Route
          path="/navConfiguration"
          element={<Layout Component={NavConfigurationList} />}
        />
        <Route
          path="/metaData"
          element={<Layout Component={MetaDataList} />}
        />

<Route
          path="/bulkUploading"
          element={<Layout Component={BulkUploadingList} />}
        />
        <Route
          path="*"
          element={
            <PageError
              pageError={{
                StatusCode: "404",
                ErrorName: "Route not found",
                ErrorDesription: "The page you were looking for is not found!",
                url: "/",
                buttonText: "Back to home",
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
