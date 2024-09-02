import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealCouponForm from "./DealCouponForm";
import { useDispatch, useSelector } from "react-redux";
import { onGetDeal } from "../../Store/Slices/dealSlice";
import {
  onGetDealCoupon,
  onPostDealCoupon,
} from "../../Store/Slices/dealCouponSlice";
import Swal from "sweetalert2";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetDealCouponFreq,
  onPostDealCouponFreq,
} from "../../Store/Slices/dealCouponFreqSlice";
import { onGetCustomerSegment } from "../../Store/Slices/customerSegmentSlice";
import { Link } from "react-router-dom";

const DealCouponList = () => {
  const dispatch = useDispatch();
  const [dealCouponDatas, setDealCouponDatas] = useState("");
  const [edit, setEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const getDealCoupon = useSelector((state) => state.dealCouponReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const getDealData = useSelector((state) => state.dealReducer?.getDealData);
  const getDealCouponFeq = useSelector((state) => state.dealCouponFreqReducer);
  const getCustometSegemtData = useSelector(
    (state) => state.customerSegmentReducer?.data
  );
  const mergeDeals = (arr1, arr2) => {
    return arr1?.map((a) => {
      const matchingB = arr2?.find((b) => b.dealId === a.dealId);

      return {
        ...a,
        weekDayId: matchingB ? matchingB?.weekDayId : null,
        validFrom: matchingB ? matchingB?.validFrom : null,
        validUpto: matchingB ? matchingB?.validUpto : null,
        frequency_id: matchingB ? matchingB?.id : null,
      };
    });
  };
  const merged = mergeDeals(
    getDealCoupon?.getDealCouponData,
    getDealCouponFeq?.getDealCouponFreqData
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
  const handleSubmit = (dealCouponDatas, isEdit) => {
    const dealCouponData = {
      ...dealCouponDatas,
      deleted: true,
    };
    const dealCouponFreqData = {
      ...dealCouponDatas,
      dealCoupounId: dealCouponDatas?.id,
      id: dealCouponDatas?.frequency_id,
      deleted: true,
    };
    if (isEdit) {
      setDealCouponDatas(dealCouponData);
    } else {
      setEdit(true);
      dispatch(onPostDealCoupon(dealCouponData));
      dispatch(onPostDealCouponFreq(dealCouponFreqData));
    }
  };

  // to handle pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to filter getDealCoupon
  const filteredData = merged?.filter((data) => {
    const couponCodeLower = data.coupounCode?.toLowerCase() || "";
    return couponCodeLower.includes(searchQuery?.toLowerCase());
  });
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
    dispatch(onGetDealCoupon());
    dispatch(onGetDealCouponFreq());
    dispatch(onGetCustomerSegment());
  }, []);

  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess &&
      <DealCouponForm
        dealCouponDatas={dealCouponDatas}
        setDealCouponDatas={setDealCouponDatas}
        edit={edit}
        setEdit={setEdit}
      />
      }
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Deal Coupon List"}</h4>
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
                {getDealCoupon?.isgetLoading ||
                (edit && getDealCoupon?.isPostLoading) ||
                getDealCouponFeq?.isPostLoading ? (
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
                                <th>{"Title "}</th>
                                <th>{"Coupoun Type"}</th>
                                <th>{"Coupoun Code"}</th>
                                <th>{"Offer Type"}</th>
                                <th>{"Offer Sub Value"}</th>
                                <th>{"Offer Type Value"}</th>
                                <th>{"Segment "}</th>
                                <th>{"Deal"}</th>
                                <th>{"Source"}</th>
                                <th>{"Offer Id"}</th>
                                <th>{"Call To Action"}</th>
                                <th>{"Image "}</th>
                                <th>{"Description "}</th>
                                <th>{"Terms and Condtions "}</th>
                                <th>{"Valid-From "}</th>
                                <th>{"Valid-To "}</th>
                                {getRoleAccess[0]?.editAccess &&   <th>Access Code</th>}
                                <th>{"Status "}</th>
                                {getRoleAccess[0]?.editAccess &&      <th>{"Action"}</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                ?.slice(startIndex, endIndex)
                                ?.map((dealcoupoun, index) => (
                                  <tr key={index}>
                                    <td>{dealcoupoun.title}</td>
                                    <td>{dealcoupoun.typeOfCoupoun}</td>
                                    <td>
                                      {dealcoupoun.coupounCode || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>{dealcoupoun.offerType}</td>
                                    <td>{dealcoupoun.offerSubType}</td>
                                    <td>
                                      {" "}
                                      {dealcoupoun.offerTypeValue || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>
                                      <td>
                                        {getCustometSegemtData
                                          ?.filter(
                                            (segementData) =>
                                              segementData.id ===
                                              parseInt(dealcoupoun.segmentId)
                                          )
                                          ?.map((segementData) => (
                                            <span key={segementData.id}>
                                              {segementData.name}
                                            </span>
                                          ))}
                                      </td>
                                    </td>
                                    <td>
                                      {getDealData
                                        ?.filter(
                                          (deal) =>
                                            deal.id ===
                                            parseInt(dealcoupoun.dealId)
                                        )
                                        ?.map((filteredDeal) => (
                                          <span key={filteredDeal.id}>
                                            {filteredDeal.name}
                                          </span>
                                        ))}
                                    </td>
                                    <td>{dealcoupoun.source}</td>
                                    <td>{dealcoupoun.offerId}</td>
                                    <td>{dealcoupoun.cta}</td>
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
                                    <td>
                                      {dealcoupoun.description || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>{dealcoupoun.terms}</td>
                                    <td>
                                      {new Date(
                                        dealcoupoun.validFrom
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>
                                      {new Date(
                                        dealcoupoun.validUpto
                                      ).toLocaleDateString()}
                                    </td>
                                    {getRoleAccess[0]?.editAccess &&
                                    <td>
                                      {(dealcoupoun.typeOfCoupoun ===
                                        "Membership" ||
                                      dealcoupoun.typeOfCoupoun ===
                                        "Dynamic") ? (
                                       <Link to="/dealCouponCode">
                                        <Button
                                          disabled={!dealcoupoun?.enabled}
                                          text={"Customize"}
                                          end_icon={"fa fa-eye"}
                                          className="btn btn-primary btn-sm float-right client_Btn"
                                        /></Link>
                                      ) : (
                                        "Not Allowed"
                                      )}
                                    </td>}
                                    <td>
                                      <span
                                        className={
                                          dealcoupoun.enabled
                                            ? "badge badge-success"
                                            : "badge badge-danger"
                                        }
                                      >
                                        {dealcoupoun.enabled
                                          ? "Active"
                                          : "Non Active"}
                                      </span>
                                    </td>
                                    {getRoleAccess[0]?.editAccess &&
                                    <td>
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-primary shadow btn-xs sharp me-1"
                                          end_icon={"fas fa-pencil-alt"}
                                          onClick={() =>
                                            handleSubmit(dealcoupoun, {
                                              isEdit: true,
                                            })
                                          }
                                        />
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          end_icon={"fa fa-trash"}
                                          onClick={() => showAlert(dealcoupoun)}
                                        />
                                      </div>
                                    </td>}
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
