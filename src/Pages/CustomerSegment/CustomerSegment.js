import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { onGetCustomerSegement } from "../../Store/Slices/customerSegementSlice";

const CustomerSegment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const customerSegData = useSelector((state) => state.customerSegmentReducer.data);

  useEffect(() => {
    dispatch(onGetCustomerSegement());
  }, [dispatch]);

  // filter the customerSegment data based on the search query
  const filteredcustomerData = Array.isArray(customerSegData) && customerSegData.filter(
    (item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (item.segementName && item.segementName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const namesArray = filteredcustomerData.map((data) => ({
    id:data.id,
    segementName: data.segementName,
    currentStatus: data.currentStatus,
    date: data.supplierBrandIddate,
  }));

  const headers = [
    { label: "Id", key: "id" },
    { label: "Segment Name", key: "segementName" },
    { label: "Current Status", key: "currentStatus" },
    { label: "Date", key: "date" }
  ];

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid pt-0">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Customer Segment</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder="Search here......"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <a href="">
                          <i className="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                  {customerSegData && customerSegData.length > 0 && (
                          <CSVLink
                            data={namesArray}
                            headers={headers}
                            filename={"CustomerSegment.csv"}
                          >
                    {filteredcustomerData.length > 0 && (
                      <Button
                        className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                        text="Export"
                        icons={"fa fa-file-excel"}
                      />
                    )}
                    </CSVLink>
                  )}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>ID </th>
                        <th>Segment Name</th>
                        <th>Current Status </th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filteredcustomerData) && filteredcustomerData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>
                            {data.segementName}<a href=""></a>
                          </td>
                          <td>
                            <span className={`badge ${data.currentStatus === "active" ? "badge-success" : "badge-danger"}`}>
                              {data.currentStatus}
                            </span>
                          </td>
                          <td>{data.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegment;
