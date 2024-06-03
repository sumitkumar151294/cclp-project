import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import CustomerSegment from "../Pages/CustomerSegment/CustomerSegment";
import ProductContentList from "../Pages/ProductContentList/ProductContentList";
import ProductSection from "../Pages/ProductSection/Productsection";


function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route path="data" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Layout Component={Dashboard} />}/> 
        <Route path="/customerSegment" element={<Layout Component={CustomerSegment} />}/> 
        <Route path="/productContentList" element={<Layout Component={ProductContentList} />}/> 
        <Route path="/productSection" element={<Layout Component={ProductSection} />}/> 
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
