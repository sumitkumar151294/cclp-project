import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealForm from "./DealForm";
import { useDispatch, useSelector } from "react-redux";
import { onGetDeal, onUpdateDeal, onUpdateDealReset } from "../../Store/Slices/dealSlice";
import { toast } from "react-toastify";
import { onGetDealCategory } from "../../Store/Slices/dealCategorySlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Swal from "sweetalert2";

const DealList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dealsData,setdealData]=useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  // to get labels and placeholders from translation  
  const deal_list = GetTranslationData("UIMasterAdmin","deal_list");
  const search_here_label = GetTranslationData("UIMasterAdmin", "search_here_label");
  const deal_name = GetTranslationData("UIMasterAdmin","deal_name");
  const deal_category = GetTranslationData("UIMasterAdmin", "deal_category");
  const deal_type = GetTranslationData("UIMasterAdmin", "deal_type");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const start_date_label = GetTranslationData("UIMasterAdmin", "start_date_label");
  const end_date_label = GetTranslationData("UIMasterAdmin", "end_date_label");
  const mobile_image = GetTranslationData("UIMasterAdmin", "mobile_image");
  const web_image = GetTranslationData("UIMasterAdmin", "web_image");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
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
  const handleSubmit = (dealData, isEdit) => {
    const dealDataInfo = {
     ...dealData,
      deleted: true
    };
    if (isEdit) {
      setdealData(dealDataInfo);
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
      {getRoleAccess[0]?.addAccess && (<DealForm dealsData={dealsData} />)}
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{deal_list}</h4>
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
                                <th>{deal_name}</th>
                                <th>{deal_category}</th>
                                <th>{deal_type}</th>
                                <th>{"Deal Alias"}</th>
                                <th>{display_order}</th>
                                <th>{start_date_label}</th>
                                <th>{end_date_label}</th>
                                <th>{mobile_image}</th>
                                <th>{web_image}</th>
                                <th>{"Status"}</th>
                                {getRoleAccess[0]?.editAccess && (<th>{action_label}</th>)}
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
                                    <td>{dealData.alias}</td>
                                    <td>{dealData.displayOrder}</td>
                                    <td>{new Date(dealData.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(dealData.endDate).toLocaleDateString()}</td>

                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${dealData.webImage}`}
                                        style={{ width: "50px" }}
                                        alt="webImage"
                                      />
                                    </td>
                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${dealData.mobImage}`}
                                        style={{ width: "50px" }}
                                        alt="mobImage"
                                      />
                                    </td>
                                    <td>
                                  <span
                                    className={
                                      dealData.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {dealData.enabled
                                      ? "Active"
                                      : "Non Active"}
                                  </span>
                                </td>
                                    {getRoleAccess[0]?.editAccess && (
                                      <td>
                                        <div className="d-flex">
                                          <Button
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                            end_icon={"fas fa-pencil-alt"}
                                            onClick={() =>
                                              handleSubmit(dealData, {
                                                isEdit: true,
                                              })
                                            }
                                          />
                                          <Button
                                            className="btn btn-danger shadow btn-xs sharp"
                                            end_icon={"fa fa-trash"}
                                            onClick={() =>
                                              showAlert(dealData)
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
