import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealCouponCodeForm from "./DealCouponCodeForm";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onGetDealCouponCode } from "../../Store/Slices/dealCouponCodeSlice";

const DealCouponCodeList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  // to get labels and placeholders from translation
  const deal_coupon_code_list = GetTranslationData(
    "UIMasterAdmin",
    "deal_coupon_code_list"
  );
  const coupon_code = GetTranslationData("UIMasterAdmin", "coupon_code");
  const deal_coupon = GetTranslationData("UIMasterAdmin", "deal_coupon");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
  // to get data from translation
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  // to get deal coupon code data from redux
  const dealCouponCode = useSelector((state) => state?.dealCouponCodeReducer);
  const dealCouponCodeData = dealCouponCode?.getDealCouponCodeData;
  //to fetch data on mount
  useEffect(() => {
    dispatch(onGetDealCouponCode());
  }, []);
  // to filter deal coupon code data
  const filteredData = dealCouponCodeData?.filter(
    (data) =>
      data?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  // Function to format dates
  const formatDate = (datetime) => {
    if (!datetime) return "";
    return datetime.split("T")[0]; // Extract the date part only
  };
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
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
      {/* {!getRoleAccess[0]?.addAccess ? getRoleAccess[0]?.addAcces && (<DealCouponCodeForm />) : ( */}
      <DealCouponCodeForm />
      {/* )} */}
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Deal Coupon Code List"}</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={search_here_label}
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
                {dealCouponCode?.isgetLoading ? (
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
                                <th>{"Coupon Code"}</th>
                                <th>{"Deal Coupon"}</th>
                                <th>{"Coupon Status"}</th>
                                <th>{"Start Date"}</th>
                                <th>{"End Date"}</th>
                                <th>{"Discription"}</th>
                                <th>{status_label}</th>
                                {getRoleAccess[0]?.editAccess && (
                                  <th>{action_label}</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                .slice(startIndex, endIndex)
                                .map((dealCouponCode, index) => (
                                  <tr key={index}>
                                    <td>{dealCouponCode.coupounCode}</td>
                                    <td>{dealCouponCode.dealCoupounId}</td>
                                    <td>{dealCouponCode.status}</td>
                                    <td>
                                      {formatDate(dealCouponCode.startDate)}
                                    </td>
                                    <td>
                                      {formatDate(dealCouponCode.endDate)}
                                    </td>
                                    <td>{dealCouponCode.descriptions}</td>
                                    <td>
                                      <span
                                        className={
                                          dealCouponCode.enabled
                                            ? "badge badge-success"
                                            : "badge badge-danger"
                                        }
                                      >
                                        {dealCouponCode.enabled
                                          ? active_label
                                          : non_active_label}
                                      </span>
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

export default DealCouponCodeList;
