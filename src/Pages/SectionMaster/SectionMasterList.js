import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import SectionMasterForm from "./SectionMasterForm";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetsectionMaster,
  onUpdatesectionMaster,
  onUpdatesectionMasterReset,
} from "../../Store/Slices/sectionMasterSlice";
import { toast } from "react-toastify";
import PageError from "../../Components/PageError/PageError";
import Swal from "sweetalert2";

const SectionMasterList = () => {
  // to get column heading name from translation
  const section_name = GetTranslationData("UIMasterAdmin", "section_name");
  const section_type = GetTranslationData("UIMasterAdmin", "section_type");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const section_data = GetTranslationData("UIMasterAdmin", "section_data");
  const section_master_list = GetTranslationData(
    "UIMasterAdmin",
    "section_master_list"
  );
  const display_limit = GetTranslationData("UIMasterAdmin", "display_limit");
  const claim_limit = GetTranslationData("UIMasterAdmin", "claim_limit");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const points_to_claim_label = GetTranslationData(
    "UIMasterAdmin",
    "points_to_claim_label"
  );
  // to get module filtered data from redux
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  // to handle pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const [sectionData, setSectionData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const showError = false;
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const SectionMasterData = useSelector(
    (state) => state?.sectionMasterReducer?.getsectionMasterData
  );
  const SectionMaster = useSelector((state) => state?.sectionMasterReducer);
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
      setSectionData(sectionMasterData);
    } else {
      dispatch(onUpdatesectionMaster(sectionMasterData));
    }
  };

  const filteredData = SectionMasterData?.filter(
    (data) =>
      data.sectionName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      data.sectionType?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(onGetsectionMaster());
  }, []);
  useEffect(() => {
    if (SectionMaster?.update_status_code == "204") {
      toast.success(SectionMaster?.updateMessage);
      dispatch(onGetsectionMaster());
      dispatch(onUpdatesectionMasterReset());
    } else if (SectionMaster?.update_status_code == "205") {
      toast.success(SectionMaster?.updateMessage);
      setSectionData(null);
      dispatch(onGetsectionMaster());
      dispatch(onUpdatesectionMasterReset());
    } else if (SectionMaster?.update_status_code) {
      toast.error(SectionMaster?.updateMessage);
      dispatch(onUpdatesectionMasterReset());
    }
  }, [SectionMaster]);
  useEffect(() => {
    if (SectionMasterData) {
      const totalItems = SectionMasterData.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [SectionMasterData]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [window.location.href]);
  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess && (
        <SectionMasterForm sectionData={sectionData} />
      )}
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{section_master_list}</h4>
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
                {SectionMaster?.isgetLoading ||
                SectionMaster?.isUpdateLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : filteredData?.length ? (
                  <div className="table-responsive scroll-Table-x">
                    <>
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{section_name}</th>
                            <th>{section_type}</th>
                            <th>{display_order}</th>
                            <th>{display_limit}</th>
                            <th>{claim_limit}</th>
                            <th>{points_to_claim_label}</th>
                            <th>{status_label}</th>
                            {getRoleAccess[0]?.editAccess && (
                              <th>{action_label}</th>
                            )}
                            <th>{section_data}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            .map((SectionMasterData, index) => (
                              <tr key={index}>
                                <td>{SectionMasterData?.sectionName}</td>
                                <td>
                                  {[
                                    "UnlockStaticCard",
                                    "CustomerBenefits",
                                    "SpecialSection",
                                    "SupportingBanner",
                                  ].includes(SectionMasterData?.sectionType)
                                    ? SectionMasterData?.sectionType.replace(
                                        /([a-z])([A-Z])/g,
                                        "$1 $2"
                                      )
                                    : SectionMasterData?.sectionType}
                                </td>
                                <td>{SectionMasterData?.displayOrder}</td>
                                <td>{SectionMasterData?.displayLimit}</td>
                                <td>
                                  {SectionMasterData?.claimLimit || (
                                    <span className="hyphen"> -</span>
                                  )}
                                </td>
                                <td>
                                  {SectionMasterData?.noOfPointsToClaim || (
                                    <span className="hyphen"> -</span>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={
                                      SectionMasterData.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {SectionMasterData.enabled
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
                                          handleSubmit(SectionMasterData, {
                                            isEdit: true,
                                          })
                                        }
                                      />
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        end_icon={"fa fa-trash"}
                                        onClick={() =>
                                          showAlert(SectionMasterData)
                                        }
                                      />
                                    </div>
                                  </td>
                                )}
                                <td>
                                  <Link
                                    to="/sectionContentMaster"
                                    state={{
                                      sectionType:
                                        SectionMasterData.sectionType,
                                      sectionId: SectionMasterData.id,
                                      sectionLimit:
                                        SectionMasterData.displayLimit,
                                      sectionName:
                                        SectionMasterData.sectionName,
                                    }}
                                  >
                                    <Button
                                      disabled={!SectionMasterData?.enabled}
                                      text={"Update"}
                                      end_icon={"fa fa-eye"}
                                      className="btn btn-primary btn-sm float-right client_Btn"
                                    />
                                  </Link>
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

export default SectionMasterList;
