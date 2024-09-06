import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MetaDataForm from "./MetaDataForm";
import {
  onGetMetaData,
  onUpdateMetaData,
  onUpdateMetaDataReset,
} from "../../Store/Slices/metaDataSlice";

const MetaDataList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [metaData, setMetaData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // to get column heading name from translation
  const meta_data_list = GetTranslationData("UIMasterAdmin", "meta_data_list");
  const price_label = GetTranslationData("UIMasterAdmin", "price_label");
  const MRP_label = GetTranslationData("UIMasterAdmin", "MRP_label");
  const earn_points = GetTranslationData("UIMasterAdmin", "earn_points");
  const burn_points = GetTranslationData("UIMasterAdmin", "burn_points");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  //to get meta data from redux store
  const getMetaData = useSelector((state) => state.metaDataReducer);
  const getLinkedMetaData = getMetaData?.getMetaData;
  // to handle pagination
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to filter tha data based on search query
  const filteredData = getLinkedMetaData?.filter((data) =>
    data.price.toString().includes(searchQuery)
  );
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
  const handleSubmit = (sectionData, isEdit) => {
    const sectionMasterData = {
      ...sectionData,
      deleted: true,
    };
    if (isEdit) {
      setMetaData(sectionMasterData);
    } else {
      dispatch(onUpdateMetaData(sectionMasterData));
    }
  };
  // to handle searchbar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  //to fetch data on mount
  useEffect(() => {
    dispatch(onGetMetaData());
  }, []);
  // to show the snackbar based on status_code
  useEffect(() => {
    if (getMetaData?.update_status_code == "204") {
      toast.success(getMetaData?.updateMessage);
      dispatch(onGetMetaData());
      dispatch(onUpdateMetaDataReset());
    }
  }, [getMetaData]);
  //for pagination
  useEffect(() => {
    if (getLinkedMetaData) {
      const totalItems = getLinkedMetaData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [getLinkedMetaData]);
  return (
    <>
      <ScrollToTop />

        <MetaDataForm metaData={metaData} setMetaData={setMetaData} />

      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{meta_data_list}</h4>
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
              <div className="card-body">
                {getMetaData?.isgetLoading || getMetaData?.isUpdateLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : filteredData?.length ? (
                  <div className="table-responsive scroll-Table-x">
                    <>
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{price_label}</th>
                            <th>{MRP_label}</th>
                            <th>{earn_points}</th>
                            <th>{burn_points}</th>
                            <th>{status_label}</th>
                            {getRoleAccess[0]?.editAccess && (
                              <th>{action_label}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            .map((metaData, index) => (
                              <tr key={index}>
                                <td>{metaData?.price}</td>
                                <td>{metaData?.mrp}</td>
                                <td>{metaData?.earnPoints}</td>
                                <td>{metaData?.burnPoints}</td>
                                <td>
                                  <span
                                    className={
                                      metaData.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {metaData.enabled ? "Active" : "Non Active"}
                                  </span>
                                </td>

                                  <td>
                                    <div className="d-flex">
                                      <Button
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        end_icon={"fas fa-pencil-alt"}
                                        onClick={() =>
                                          handleSubmit(metaData, {
                                            isEdit: true,
                                          })
                                        }
                                      />
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        end_icon={"fa fa-trash"}
                                        onClick={() => showAlert(metaData)}
                                      />
                                    </div>
                                  </td>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaDataList;
