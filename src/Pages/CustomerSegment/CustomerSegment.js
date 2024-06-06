import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { onGetCustomerSegement } from "../../Store/Slices/customerSegementSlice";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";

const CustomerSegment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  //to get customer segment data from redux store
  const getCustomerData = useSelector((state) => state?.customerSegmentReducer);
  const customerSegData = getCustomerData?.data;

  useEffect(() => {
    dispatch(onGetCustomerSegement());
  }, []);

  // filter the customerSegment data based on the search query
  const filteredcustomerData =
    Array.isArray(customerSegData) &&
    customerSegData.filter(
      (item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (item.segmentName &&
          item.segmentName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const namesArray = filteredcustomerData.map((data) => ({
    id: data.id,
    segementName: data.segmentName,
    currentStatus: data.currentStatus,
    date: data.date,
  }));

  const headers = [
    { label: "Id", key: "id" },
    { label: "Segment Name", key: "segmentName" },
    { label: "Current Status", key: "currentStatus" },
    { label: "Date", key: "date" },
  ];

  // for Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // to handle page chnages
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

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
                        <i className="fa fa-search"></i>
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
              {getCustomerData.isLoading ? (
                <div style={{ height: "400px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : Array.isArray(filteredcustomerData) &&
                filteredcustomerData.length > 0 ? (
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
                        {Array.isArray(filteredcustomerData) &&
                          filteredcustomerData
                            .slice(startIndex, endIndex)
                            .map((data, index) => (
                              <tr key={index}>
                                <td>{data.id}</td>
                                <td>
                                  {data.segmentName}
                                  <a href=""></a>
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      data.currentStatus === "active"
                                        ? "badge-success"
                                        : "badge-danger"
                                    }`}
                                  >
                                    {data.currentStatus}
                                  </span>
                                </td>
                                <td>{data.date}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    {filteredcustomerData.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            filteredcustomerData.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 1 ? "disabled_Text" : ""}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <NoRecord />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegment;
