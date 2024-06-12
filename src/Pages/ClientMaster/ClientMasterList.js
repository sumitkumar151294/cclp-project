import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import ClientMaster from "./ClientMasterForm";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";

const ClientMasterList = () => {
  const dispatch = useDispatch();
  const clientListData = useSelector((state) => state.clientMasterReducer?.clientData);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // to handle search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(onClientMasterSubmit());
  }, [dispatch]);
// filter the customerSegment data based on the search query
const filteredClientData = Array.isArray(clientListData) &&
    clientListData.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.number && item.number.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof item.status === "boolean" && (item.status ? "active" : "non-active").includes(searchQuery.toLowerCase()))
    );
  const headers = [
    { label: "Client Id", key: "clientID" },
    { label: "Contact Name", key: "contactName" },
    { label: "Contact Number", key: "contactNumber" },
    { label: "Contact Email", key: "contactEmail" },
    { label: "Status", key: "status" },
  ];

  // excel data to print
  const excelData = filteredClientData.map((data) => ({
        contactName: data.name,
        contactNumber: data.number,
        contactEmail: data.email,
        clientID: data.id,
        status: data.status ? "Active" : "Non-Active",
      }));

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return (
    <div>
      <ClientMaster />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Client List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder="search here...."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <CSVLink
                      data={excelData}
                      headers={headers}
                      filename={"ClientMaster.csv"}
                    >
                      <Button
                        className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                        text="Export"
                        icons={"fa fa-file-excel me-2"}
                      />
                    </CSVLink>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {clientListData?.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    <div className="table-responsive scroll-Table-x">
                      <>
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Contact Name</th>
                              <th>Contact Number</th>
                              <th>Contact Email</th>
                              <th>Client ID</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredClientData
                              .slice(startIndex, endIndex)
                              .map((data, index) => (
                                <tr key={index}>
                                  <td>{data.name}</td>
                                  <td>{data.number}</td>
                                  <td>
                                    <span className="text-muted">{data.email}</span>
                                  </td>
                                  <td>{data.id}</td>
                                  <td>
                                    <span className={`badge ${data.status ? "badge-success" : "badge-danger"}`}>
                                      {data.status ? "Active" : "Non-Active"}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <Button
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        icon={"fas fa-pencil-alt"}
                                        onClick=""
                                      />
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        icon={"fa fa-trash"}
                                        onClick=""
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {filteredClientData.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={">"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(filteredClientData.length / rowsPerPage)}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1}
                            />
                          </div>
                        )}
                      </>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
