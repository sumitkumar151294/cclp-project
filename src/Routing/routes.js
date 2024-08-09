import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import RoleMasterList from "../Pages/RoleMaster/RoleMasterList";
import UserMasterList from "../Pages/UserMaster/UserMasterList";
import SectionMasterList from "../Pages/SectionMaster/SectionMasterList";
import SectionContentMasterList from "../Pages/SectionContentMaster/SectionContentMasterList";
import ModuleMasterList from "../Pages/ModuleMaster/ModuleMasterList";
import NavConfigurationList from "../Pages/NavConfiguration/NavConfigurationList";

function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />} />

        {/* New-UI */}
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
          path="/navConfiguration"
          element={<Layout Component={NavConfigurationList} />}
        />
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
