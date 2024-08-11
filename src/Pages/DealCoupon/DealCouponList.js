import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealCouponForm from "./DealCouponForm";
import { useDispatch, useSelector } from "react-redux";
import { onGetDeal } from "../../Store/Slices/dealSlice";
import { onGetDealCoupon } from "../../Store/Slices/dealCouponSlice";

const DealCouponList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const dealCouponData = useSelector((state) => state.dealCouponReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  // to handle pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const filteredData = dealCouponData?.getDealCouponData?.filter(
    (data) =>
      data.coupounCode?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      data.dealId?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [filteredData]);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  useEffect(() => {
    dispatch(onGetDeal());
    dispatch(onGetDealCoupon())
  }, []);
  return (
    <>
    <ScrollToTop />
      {getRoleAccess[0]?.addAccess && (<DealCouponForm />)}
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Deal Coupon List"}</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={"Search here..."}
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body ">
                {dealCouponData?.isgetLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {filteredData?.length ? (
                      <div className="table-responsive scroll-Table-x ">
                        <>
                          <table className="table header-border table-responsive-sm">
                            <thead>
                              <tr>
                                <th>{"Coupoun Type"}</th>
                                <th>{"Coupoun Code"}</th>
                                <th>{"Deal"}</th>
                                <th>{"Call To Action"}</th>

                                <th>{"Title "}</th>
                                <th>{"Terms and Condtions "}</th>
                                <th>{"Description "}</th>
                                <th>{"Segment "}</th>
                                <th>{"Image "}</th>
                                {getRoleAccess[0]?.editAccess && (<th>{"Action"}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                .slice(startIndex, endIndex)
                                .map((dealcoupoun, index) => (
                                  <tr key={index}>
                                    <td>{dealcoupoun.typeOfCoupoun}</td>
                                    <td>{dealcoupoun.coupounCode || (
                                        <span className="hyphen"> -</span>
                                      )}</td>
                                    <td>{dealcoupoun.dealId || (
                                        <span className="hyphen"> -</span>
                                      )}</td>
                                    <td>{dealcoupoun.cta}</td>

                                    <td>{dealcoupoun.title || (
                                        <span className="hyphen"> -</span>
                                      )}</td>
                                    <td>{dealcoupoun.terms}</td>
                                    <td>{dealcoupoun.description || (
                                        <span className="hyphen"> -</span>
                                      )}</td>
                                       <td>{dealcoupoun.segmentId || (
                                        <span className="hyphen"> -</span>
                                      )}</td>
                                            <td>
                                      {dealcoupoun.image ? (
                                        <img
                                          src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${dealcoupoun.image}`}
                                          style={{ width: "50px" }}
                                          alt="Image"
                                        />
                                      ) : (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    {getRoleAccess[0]?.editAccess && (
                                    <td>
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-primary shadow btn-xs sharp me-1"

                                          end_icon={"fas fa-pencil-alt"}
                                          // onClick={() =>
                                          //   handleEdit(
                                          //     data,
                                          //     clientPayData
                                          //   )
                                          // }
                                        />
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          end_icon={"fa fa-trash"}
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
                          {filteredData?.length > 5 && (
                            <div className="pagination-container">
                              <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(
                                  filteredData?.length / rowsPerPage
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

export default DealCouponList;
