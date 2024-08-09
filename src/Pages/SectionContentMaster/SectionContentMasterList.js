import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import SectionContentMasterForm from "./SectionContentMasterForm";
import { useLocation } from "react-router-dom";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSectionContentMaster,
  onUpdateSectionContentMaster,
  onUpdateSectionContentMasterReset,
} from "../../Store/Slices/sectionContentMasterSlice";
import Button from "../../Components/Button/Button";
import { toast } from "react-toastify";
import {
  onPostuploadImageReset,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";

const SectionContentMasterList = () => {
  const [sectionContentData, setSectionContentData] = useState("");

  // to get column heading name from translation
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const mobile_image = GetTranslationData("UIMasterAdmin", "mobile_image");
  const web_image = GetTranslationData("UIMasterAdmin", "web_image");
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const search_here_label = GetTranslationData("UIMasterAdmin", "search_here_label");
  const content_source_type = GetTranslationData(
    "UIMasterAdmin",
    "content_source_type"
  );
  const section_content_master_list = GetTranslationData(
    "UIMasterAdmin",
    "section_content_master_list"
  );
  const text_label = GetTranslationData("UIMasterAdmin", "text_label");
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const type = location?.state?.sectionId;

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const dispatch = useDispatch();
  const getSectionContenMasterData = useSelector(
    (state) => state?.sectionContentMasterReducer
  );
  const filteredData =
    getSectionContenMasterData?.getSectionContentMasterData?.filter(
      (data) =>
        (data.contentSourceType
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase()) ||
          data.contentSourceType
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase())) &&
        data.sectionMasterId === type
    );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  useEffect(() => {
    dispatch(onGetSectionContentMaster());
  }, []);
  const handleSumbit = (sectionContent, isEdit) => {
    const sectionMasterData = {
      id: sectionContent.id,
      enabled: sectionContent.enabled,
      deleted: true,
      createdBy: 0,
      updatedBy: 0,
      clientId: 0,
      sectionMasterId: sectionContent?.sectionMasterId,
      webImage: sectionContent?.webImage,
      mobImage: sectionContent?.mobImage,
      cta: sectionContent?.cta,
      text: sectionContent?.text,
      displayOrder: sectionContent?.displayOrder,
      contentSourceType: sectionContent?.contentSourceType,
      linkedMasterId: sectionContent?.linkedMasterId,
      segmentId: sectionContent?.sectionContent,
    };
    if (isEdit) {
      setSectionContentData(sectionMasterData);
    } else {
      dispatch(onUpdateSectionContentMaster(sectionMasterData));
    }
  };
  useEffect(() => {
    if (getSectionContenMasterData?.update_status_code == "204") {
      toast.success(getSectionContenMasterData?.updateMessage);
      dispatch(onGetSectionContentMaster());
      dispatch(onUpdateSectionContentMasterReset());
    } else if (getSectionContenMasterData?.update_status_code == "205") {
      toast.success(getSectionContenMasterData?.updateMessage);
      dispatch(onGetSectionContentMaster());
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onUpdateSectionContentMasterReset());
    } else if (getSectionContenMasterData?.update_status_code) {
      toast.error(getSectionContenMasterData?.updateMessage);
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onUpdateSectionContentMasterReset());
      dispatch(onUpdateSectionContentMasterReset());
    }
  }, [getSectionContenMasterData]);
  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [filteredData]);
  return (
    <>
      <SectionContentMasterForm sectionContentData={sectionContentData} setSectionContentData={setSectionContentData}/>
      <ScrollToTop />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">
                      {section_content_master_list}
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
              <div className="card-body">
                {getSectionContenMasterData?.isgetLoading || getSectionContenMasterData?.isUpdateLoading ||
                (getSectionContenMasterData?.isUpdateLoading &&
                  getSectionContenMasterData?.update_status_code == "205") ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {filteredData?.length ? (
                      <div className="table-responsive scroll-Table-x">
                        <>
                          <table className="table header-border table-responsive-sm">
                            <thead>
                              <tr>
                                <th>{mobile_image}</th>
                                <th>{web_image}</th>
                                <th>{display_order}</th>
                                <th>{call_to_action}</th>
                                <th>{content_source_type}</th>
                                <th>{segment_label}</th>
                                <th>{text_label}</th>
                                <th>{action_label}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                ?.slice(startIndex, endIndex)
                                ?.map((sectionContent, index) => (
                                  <tr key={index}>
                                    <td>
                                      {sectionContent.webImage ?   <img
                                        src={`${process.env.REACT_APP_CLIENT_API_URL}${sectionContent.webImage}`}
                                        style={{ width: "50px" }}
                                        alt="webImage"
                                      /> : (
                                        <span className="hyphen"> -</span>
                                      )}

                                    </td>
                                    <td>
                                      {sectionContent.mobImage ?   <img
                                        src={`${process.env.REACT_APP_CLIENT_API_URL}${sectionContent.mobImage}`}
                                        style={{ width: "50px" }}
                                        alt="webImage"
                                      /> : (
                                        <span className="hyphen"> -</span>
                                      )}

                                    </td>
                                    <td>{sectionContent.displayOrder}</td>
                                    <td>{sectionContent.cta}</td>
                                    <td>
                                      {sectionContent?.contentSourceType || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>
                                      {sectionContent?.segmentId || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>
                                      {sectionContent?.text || (
                                        <span className="hyphen"> -</span>
                                      )}
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-primary shadow btn-xs sharp me-1"
                                          end_icon={"fas fa-pencil-alt"}
                                          onClick={() =>
                                            handleSumbit(sectionContent, {
                                              isEdit: true,
                                            })
                                          }
                                        />
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          end_icon={"fa fa-trash"}
                                          onClick={() =>
                                            handleSumbit(sectionContent)
                                          }
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

export default SectionContentMasterList;
