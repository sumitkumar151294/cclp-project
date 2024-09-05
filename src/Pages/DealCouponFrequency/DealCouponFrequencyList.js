import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { toast } from "react-toastify";
import DealCouponFrequencyForm from "./DealCouponFrequencyForm";
import {
  onGetDealCouponFreq,
  onUpdateDealCouponFreq,
  onUpdateDealCouponFreqReset,
} from "../../Store/Slices/dealCouponFreqSlice";

const DealCouponFrequencyList = () => {
  const dispatch = useDispatch();
  const [dealCouponFreq, setDealCouponFreq] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  // to get coulumn heading from translation
  const deal_coupon_frequency_list = GetTranslationData(
    "UIMasterAdmin",
    "deal_coupon_frequency_list"
  );
  const deal_coupon = GetTranslationData("UIMasterAdmin", "deal_coupon");
  const valid_from = GetTranslationData("UIMasterAdmin", "valid_from");
  const valid_to = GetTranslationData("UIMasterAdmin", "valid_to");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
  // Get deal coupon data from Redux store
  const getDealCouponFeq = useSelector((state) => state.dealCouponFreqReducer);
  const getDealCouponData = useSelector(
    (state) => state?.dealCouponReducer?.getDealCouponData
  );
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  // Create a mapping of coupon ID to label
  const couponLabelMap = getDealCouponData?.reduce((map, coupon) => {
    map[coupon.id] = coupon.title; // Assuming `title` is the label
    return map;
  }, {});
  // modal for delete warning
  const showAlert = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this row.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result?.value) {
        handleSubmit(data);
      }
    });
  };
  //to handle edit and delete
  const handleSubmit = (dealCouponFreq, isEdit) => {
    const dealCouponfreqData = {
      ...dealCouponFreq,
      deleted: true,
    };
    if (isEdit) {
      setDealCouponFreq(dealCouponfreqData);
    } else {
      dispatch(onUpdateDealCouponFreq(dealCouponfreqData));
    }
  };
  // Function to format dates
  const formatDate = (datetime) => {
    if (!datetime) return "";
    return datetime.split("T")[0]; // Extract the date part only
  };
  // to handle pagination
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to filter getDealCoupon
  const filteredData = getDealCouponFeq?.getDealCouponFreqData?.filter(
    (data) => {
      const dealCoupounId =
        couponLabelMap[data.dealCoupounId]?.toLowerCase() || "";
      return dealCoupounId.includes(searchQuery?.toLowerCase());
    }
  );
  // to search data
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
  // to fetch data on mount
  useEffect(() => {
    dispatch(onGetDealCouponFreq());
  }, []);
  // to show snackbar based on delete status code
  useEffect(() => {
    if (getDealCouponFeq?.update_status_code == "200") {
      toast.success(getDealCouponFeq?.updateMessage);
      dispatch(onGetDealCouponFreq());
      dispatch(onUpdateDealCouponFreqReset());
    }
  }, [getDealCouponFeq]);
  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess && (
        <DealCouponFrequencyForm
          dealCouponFreq={dealCouponFreq}
          setDealCouponFreq={setDealCouponFreq}
        />
      )}
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">
                      {"Deal Coupon Frequency List"}
                    </h4>
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
                {getDealCouponFeq?.isgetLoading ? (
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
                                <th>{deal_coupon}</th>
                                <th>{valid_from}</th>
                                <th>{valid_to}</th>
                                <th>{status_label}</th>
                                {getRoleAccess[0]?.editAccess && (
                                  <th>{action_label}</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                ?.slice(startIndex, endIndex)
                                ?.map((dealfreq, index) => (
                                  <tr key={index}>
                                    <td>
                                      {couponLabelMap[
                                        dealfreq?.dealCoupounId
                                      ] || "Unknown"}
                                    </td>
                                    <td>{formatDate(dealfreq.validFrom)}</td>
                                    <td>{formatDate(dealfreq.validUpto)}</td>
                                    <td>
                                      {" "}
                                      <span
                                        className={
                                          dealfreq?.enabled
                                            ? "badge badge-success"
                                            : "badge badge-danger"
                                        }
                                      >
                                        {dealfreq?.enabled
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
                                            onClick={() =>
                                              handleSubmit(dealfreq, {
                                                isEdit: true,
                                              })
                                            }
                                          />
                                          <Button
                                            className="btn btn-danger shadow btn-xs sharp"
                                            end_icon={"fa fa-trash"}
                                            onClick={() => showAlert(dealfreq)}
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

export default DealCouponFrequencyList;
