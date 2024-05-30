import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Layout from "../Layout/Layout";


function RouteConfiq() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout Component={HomePage} />} 
        />
      
      </Routes>
    </Router>
  );
}
export default RouteConfiq;
