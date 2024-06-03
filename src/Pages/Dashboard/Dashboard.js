import React from "react";
import { Chart } from "./Chart";
import Revenue from "./Revenue";
import Users from "./Users";
// import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
const Dashboard = () => {
  return (
    <div className="container-fluid">
          <div className="row">
            {/* <ScrollToTop /> */}
            <Chart />
            <Revenue />
            <Users />
          </div>
    </div>
  );
};

export default Dashboard;
