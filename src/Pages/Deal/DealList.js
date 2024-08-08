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
import { onGetDeal, onUpdateDeal, onUpdateDealReset } from "../../Store/Slices/dealSlice";
import { toast } from "react-toastify";
import { onGetDealCategory } from "../../Store/Slices/dealCategorySlice";

const DealList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  // to fetch deal data from redux store
  const dealCategoryData = useSelector((state) => state.dealCategoryReducer?.getDealCategoryData);
  const getDealData = useSelector((state) => state.dealReducer);
  // to get module filtered data from redux
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const filteredData =
  getDealData?.getDealData?.filter(
    (data) =>
      (data.name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
        data.dealType
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase()))
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSumbit = (dealData, isEdit) => {
    const dealDataInfo = {
      id: dealData?.id,
      enabled: dealData?.enabled,
      deleted: true,
      createdBy: 0,
      updatedBy: 0,
      clientId: dealData?.clientId,
      displayOrder: dealData?.displayOrder,
      dealType:dealData?.dealType,
      endDate:dealData?.endDate,
      startDate:dealData?.startDate,
      category:dealData?.category,
      webImage:dealData?.webImage,
      mobImage:dealData?.mobImage,
      name:dealData?.name
    };
    if (isEdit) {
      // setdealData(sectionMasterData);
    } else {
      dispatch(onUpdateDeal(dealDataInfo));
    }
  };
  useEffect(() => {
    if (getDealData?.update_status_code == "204") {
      toast.success(getDealData?.updateMessage);
      dispatch(onGetDeal());
      dispatch(onUpdateDealReset());
    } else if (getDealData?.update_status_code == "205") {
      toast.success(getDealData?.updateMessage);
      dispatch(onGetDeal());
      dispatch(onUpdateDealReset());
    } else if (getDealData?.update_status_code) {
      toast.error(getDealData?.updateMessage);
      dispatch(onUpdateDealReset());
    }
  }, [getDealData]);
  useEffect(() => {
    dispatch(onGetDeal());
    dispatch(onGetDealCategory());
    

  }, []);

  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [filteredData]);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

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
                {getDealData?.isgetLoading || getDealData?.isUpdateLoading  ? (
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
                                <th>{"Deal Name"}</th>
                                <th>{"Deal Category"}</th>
                                <th>{"Deal Type"}</th>
                                <th>{"Display Order"}</th>
                                <th>{"Start Date"}</th>
                                <th>{"End Date"}</th>
                                <th>{"Web Image "}</th>
                                <th>{"Mobile Image"}</th>
                                {getRoleAccess[0]?.editAccess && (<th>{"Action"}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.slice(startIndex, endIndex)
                                .map((dealData, index) => (
                                  <tr key={index}>
                                    <td>{dealData.name}</td>
                                    <td>
                                      {dealCategoryData
                                        ?.filter(dealCategory => dealCategory.id === dealData.category)
                                        .map(dealCategory => dealCategory.name)
                                      }
                                    </td>
                                    <td>{dealData.dealType}</td>
                                    <td>{dealData.displayOrder}</td>
                                    <td>{new Date(dealData.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(dealData.endDate).toLocaleDateString()}</td>

                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_API_URL}${dealData.webImage}`}
                                        style={{ width: "50px" }}
                                        alt="webImage"
                                      />
                                    </td>
                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_API_URL}${dealData.mobImage}`}
                                        style={{ width: "50px" }}
                                        alt="mobImage"
                                      />
                                    </td>
                                    {getRoleAccess[0]?.editAccess && (
                                      <td>
                                        <div className="d-flex">
                                          <Button
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                            end_icon={"fas fa-pencil-alt"}
                                            onClick={() =>
                                              handleSumbit(dealData, {
                                                isEdit: true,
                                              })
                                            }
                                          />
                                          <Button
                                            className="btn btn-danger shadow btn-xs sharp"
                                            end_icon={"fa fa-trash"}
                                            onClick={() =>
                                              handleSumbit(dealData)
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

export default DealList;
