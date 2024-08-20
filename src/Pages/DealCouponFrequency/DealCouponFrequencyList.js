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
import { onGetDealCouponFreq, onUpdateDealCouponFreq, onUpdateDealCouponFreqReset } from "../../Store/Slices/dealCouponFreqSlice";

const DealCouponFrequencyList = () => {
  const dispatch = useDispatch();
  const [dealCouponFreq, setDealCouponFreq] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const getDealCouponFeq = useSelector((state) => state.dealCouponFreqReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
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

  // to handle pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to filter getDealCoupon
  const filteredData = getDealCouponFeq?.getDealCouponFreqData
  // ?.filter((data) => {
  //   const dealCoupounId = data.dealCoupounId?.toLowerCase() || '';
  //   return dealCoupounId.includes(searchQuery?.toLowerCase());
  // });
  console.log(filteredData)
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
    dispatch(onGetDealCouponFreq());
  }, []);
  useEffect(() => {
    if (getDealCouponFeq?.update_status_code == "204") {
      toast.success(getDealCouponFeq?.updateMessage);
      dispatch(onGetDealCouponFreq());
      dispatch(onUpdateDealCouponFreqReset());
    }
  }, [getDealCouponFeq]);
  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess && <DealCouponFrequencyForm />}
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Deal Coupon Frequency List"}</h4>
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
                                <th>{"Deal Coupon"}</th>
                                <th>{"Valid From"}</th>
                                <th>{"Valid UpTo"}</th>
                                <th>{"Status"}</th>
                                {getRoleAccess[0]?.editAccess && (
                                  <th>{"Action"}</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                .slice(startIndex, endIndex)
                                .map((dealfreq, index) => (
                                  <tr key={index}>
                                    <td>{dealfreq?.dealCoupounId}</td>
                                    <td>
                                      {dealfreq?.validFrom}
                                    </td>
                                    <td>{dealfreq?.validUpto}</td>
                                    <td>{dealfreq?.enabed}</td>
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
                                            onClick={() =>
                                              showAlert(dealfreq)
                                            }
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
