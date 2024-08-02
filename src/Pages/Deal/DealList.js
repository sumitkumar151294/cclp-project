import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealForm from "./DealForm";
import { useDispatch, useSelector } from "react-redux";
import { onGetDeal } from "../../Store/Slices/dealSlice";

const DealList = () => {
  const dispatch=useDispatch();
  // to fetch deal data from redux store
  const getDealData=useSelector((state)=>state.dealReducer);
  // to get module filtered data from redux
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  useEffect(()=>{
    dispatch(onGetDeal());
  },[]);
  // to handle pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess && (<DealForm />)}
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Deal List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={"Search here..."}
                        // value={searchQuery}
                        // onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body ">
                {getDealData?.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {getDealData?.getDealData?.length ? (
                      <div className="table-responsive scroll-Table-x ">
                        <>
                          <table className="table header-border table-responsive-sm">
                            <thead>
                              <tr>
                                <th>{"Category Name"}</th>
                                <th>{"Display Name"}</th>
                                <th>{"Mobile Image"}</th>
                                <th>{"Web Image "}</th>
                                {getRoleAccess[0]?.editAccess && (<th>{"Action"}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {getDealData?.getDealData?.slice(startIndex, endIndex)
                                .map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>{item.displayOrder}</td>
                                    <td>{item.mobImage}</td>
                                    <td>{item.webImage}</td>
                                    {getRoleAccess[0]?.editAccess && (
                                    <td>
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-primary shadow btn-xs sharp me-1"
                                          icon={"fas fa-pencil-alt"}
                                          // onClick={() =>
                                          //   handleEdit(
                                          //     data,
                                          //     clientPayData
                                          //   )
                                          // }
                                        />
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          icon={"fa fa-trash"}
                                          // onClick={() =>
                                          //   handleDelete(data)
                                          // }
                                        />
                                      </div>
                                    </td>
                                    )}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          {getDealData?.getDealData?.length > 5 && (
                            <div className="pagination-container">
                              <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(
                                  getDealData?.getDealData?.length / rowsPerPage
                                )}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={page === 1 && "active"}
                                initialPage={page - 1}
                                previousClassName={
                                  page === 1 ? "disabled_Text" : ""
                                }
                              />
                            </div>
                          )}
                        </>
                      </div>
                    ) : (
                      <NoRecord />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealList;
