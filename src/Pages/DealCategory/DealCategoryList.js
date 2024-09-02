import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import DealCategoryForm from "./DealCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetDealCategory,
  onUpdateDealCategory,
  onUpdateDealCategoryReset,
} from "../../Store/Slices/dealCategorySlice";
import { toast } from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const DealCategoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [dealCategory, setdealCategory] = useState("");
  const dispatch = useDispatch();
  // to get data from translation
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const deal_category_list = GetTranslationData(
    "UIMasterAdmin",
    "deal_category_list"
  );
  const name_label = GetTranslationData("UIMasterAdmin", "name_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const mobile_image = GetTranslationData("UIMasterAdmin", "mobile_image");
  const web_image = GetTranslationData("UIMasterAdmin", "web_image");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const dealCategoryData = useSelector((state) => state.dealCategoryReducer);
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter data based on deal category name
  const filteredData = dealCategoryData?.getDealCategoryData?.filter((data) =>
    data.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  // to handle page change
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to handle submit
  const handleSumbit = (dealCategory, isEdit) => {
    const dealCategoryData = {
      ...dealCategory,
      deleted: true,
    };
    if (isEdit) {
      setdealCategory(dealCategoryData);
    } else {
      dispatch(onUpdateDealCategory(dealCategoryData));
    }
  };
  // to handle toast notifications based on post and update status code
  useEffect(() => {
    if (dealCategoryData?.update_status_code == "204") {
      toast.success(dealCategoryData?.updateMessage);
      dispatch(onGetDealCategory());
      dispatch(onUpdateDealCategoryReset());
    } else if (dealCategoryData?.update_status_code == "205") {
      setdealCategory("");
      toast.success(dealCategoryData?.updateMessage);
      dispatch(onGetDealCategory());
      dispatch(onUpdateDealCategoryReset());
    } else if (dealCategoryData?.update_status_code) {
      toast.error(dealCategoryData?.updateMessage);
      dispatch(onUpdateDealCategoryReset());
    }
  }, [dealCategoryData]);
  // to handle pagination
  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [filteredData]);
  // to fetch deal category data on mount
  useEffect(() => {
    dispatch(onGetDealCategory());
  }, []);
  return (
    <>
      {getRoleAccess[0]?.addAccess && (
        <DealCategoryForm
          setdealCategory={setdealCategory}
          dealCategory={dealCategory}
        />
            )}
      <ScrollToTop />
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{deal_category_list}</h4>
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
                {dealCategoryData?.isgetLoading ||
                dealCategoryData?.isUpdateLoading ? (
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
                                <th>{name_label}</th>
                                <th>{display_order}</th>
                                <th>{mobile_image}</th>
                                <th>{web_image}</th>
                                <th>{status_label}</th>
                                {getRoleAccess[0]?.addAccess && (
                                  <th>{action_label}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                .slice(startIndex, endIndex)
                                .map((dealCategoryData, index) => (
                                  <tr key={index}>
                                    <td>{dealCategoryData.name}</td>
                                    <td>{dealCategoryData.displayOrder}</td>
                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${dealCategoryData.mobImage}`}
                                        style={{ width: "50px" }}
                                        alt="mobImage"
                                      />
                                    </td>
                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${dealCategoryData.webImage}`}
                                        style={{ width: "50px" }}
                                        alt="webImage"
                                      />
                                    </td>

                                    <td>
//                                       <span
//                                         className={
//                                           dealCategoryData.enabled
//                                             ? "badge badge-success"
//                                             : "badge badge-danger"
//                                         }
//                                       >
//                                         {dealCategoryData.enabled
//                                           ? "Active"
//                                           : "Non Active"}
//                                       </span>
//                                     </td>

//                                     <td>
//                                       <div className="d-flex">
//                                         <Button
//                                           className="btn btn-primary shadow btn-xs sharp me-1"
//                                           end_icon={"fas fa-pencil-alt"}
//                                           onClick={() =>
//                                             handleSumbit(dealCategoryData, {
//                                               isEdit: true,
//                                             })
//                                           }
//                                         />
//                                         <Button
//                                           className="btn btn-danger shadow btn-xs sharp"
//                                           end_icon={"fa fa-trash"}
//                                           onClick={() =>
//                                             handleSumbit(dealCategoryData)
//                                           }
//                                         />
//                                       </div>
//                                     </td>
                                  <span
                                    className={
                                      dealCategoryData.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {dealCategoryData.enabled
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
                                              handleSumbit(dealCategoryData, {
                                                isEdit: true,
                                              })
                                            }
                                          />
                                          <Button
                                            className="btn btn-danger shadow btn-xs sharp"
                                            end_icon={"fa fa-trash"}
                                            onClick={() =>
                                              handleSumbit(dealCategoryData)
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

export default DealCategoryList;
