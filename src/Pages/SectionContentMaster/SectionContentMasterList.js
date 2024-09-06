import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import SectionContentMasterForm from "./SectionContentMasterForm";
import { Link, useLocation } from "react-router-dom";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSectionContentMaster,
  onPostSectionContentMaster,
} from "../../Store/Slices/sectionContentMasterSlice";
import Button from "../../Components/Button/Button";
import { onGetProductContent } from "../../Store/Slices/productContentSlice";
import { onGetDeal } from "../../Store/Slices/dealSlice";

const SectionContentMasterList = () => {
  const [sectionContentData, setSectionContentData] = useState("");

  // to get column heading name from translation
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const mobile_image = GetTranslationData("UIMasterAdmin", "mobile_image");
  const web_image = GetTranslationData("UIMasterAdmin", "web_image");
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
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
  const sectionType = location?.state?.sectionType;

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
    dispatch(onGetProductContent());
    dispatch(onGetDeal());
  }, []);
  const handleSumbit = (sectionContent, isEdit) => {
    const sectionMasterData = {
      ...sectionContent,
      deleted: true,
    };
    if (isEdit) {
      setSectionContentData(sectionMasterData);
    } else {
      dispatch(onPostSectionContentMaster(sectionMasterData));
    }
  };

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
      <SectionContentMasterForm
        sectionContentData={sectionContentData}
        setSectionContentData={setSectionContentData}
      />
      <ScrollToTop />
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
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
                {getSectionContenMasterData?.isgetLoading ||
                  getSectionContenMasterData?.isUpdateLoading ||
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
                                {sectionType !== "Promo Message" && (
                                  <th>{mobile_image}</th>
                                )}
                                {sectionType !== "Promo Message" && (
                                  <th>{web_image}</th>
                                )}
                                {(sectionType === "Special Section" ||
                                  sectionType === "Unlock Deals") && (
                                    <>
                                      <th>{"Content Source Type"}</th>
                                      <th>{"Linked Data"}</th>
                                      <th>{"Over-ride Data"}</th>
                                    </>
                                  )}
                                {(sectionType === "Promo Message"  ||
                                  sectionType === "Customer Menu") && (
                                    <th>{text_label}</th>
                                  )}
                                <th>{"Call To Action"}</th>
                                {sectionType !== "Promo Message" && (
                                  <th>{"Display Order"}</th>
                                )}

                                {sectionType === "Customer Menu" && (
                                  <th>{"Text Element"}</th>
                                )}
                                {sectionType === "Customer Menu" && (
                                  <th>{"Text Color"}</th>
                                )}
                                {sectionType === "Customer Menu" && (
                                  <th>{"Text BGColor"}</th>
                                )}
                                {sectionType === "Customer Menu" && (
                                  <th>{"Element Status"}</th>
                                )}{" "}
                                {sectionType === "Customer Menu" && (
                                  <th>{"Element Image"}</th>
                                )}

                                {(sectionType === "SpecialSection" ||
                                  sectionType === "Unlock Deals") && (
                                    <th>{segment_label}</th>
                                  )}
                                <th>{"Status"}</th>
                                {sectionType === "SpecialSection" && (
                                  <th>{"Over-Ride Data"}</th>
                                )}
                                <th>{action_label}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData
                                ?.slice(startIndex, endIndex)
                                ?.map((sectionContent, index) => (
                                  <tr key={index}>
                                    {sectionType !== "Promo Message" && (
                                      <td>
                                        {sectionContent.mobImage ? (
                                          <img
                                            src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${sectionContent.mobImage}`}
                                            style={{ width: "50px" }}
                                            alt="mobImage"
                                          />
                                        ) : (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType !== "Promo Message" && (
                                      <td>
                                        {sectionContent.webImage ? (
                                          <img
                                            src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${sectionContent.webImage}`}
                                            style={{ width: "50px" }}
                                            alt="webImage"
                                          />
                                        ) : (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {(sectionType === "Unlock Deals" ||
                                      sectionType === "Special Section") && (
                                        <>
                                          <td>
                                            {sectionContent.contentSourceType}
                                          </td>
                                          <td>
                                            {sectionContent.linkedMasterId}
                                          </td>
                                          <td>
                                            {sectionContent.isOverrideMetadata ?
                                           <Link to="/metaData">
                                             <Button
                                              text={"Customize"}
                                              end_icon={"fa fa-eye"}
                                              className="btn btn-primary btn-sm float-right client_Btn"
                                            /> </Link>: "Not Allowed"}
                                          </td>
                                        </>

                                      )}

                                    {sectionType !== "Promo Message" && (
                                      <td>
                                        {sectionContent.cta.substring(0, 18) +
                                          "..."}
                                      </td>
                                    )}
                                    {sectionType === "SpecialSection" && (
                                      <td>
                                        {sectionContent?.contentSourceType || (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType === "SpecialSection" && (
                                      <td>
                                        {sectionContent?.segmentId || (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {( sectionType === "Promo Message" ||
                                      sectionType === "Customer Menu") && (
                                        <td>
                                          {sectionContent?.text ? (
                                            sectionContent?.text.substring(
                                              0,
                                              10
                                            ) + "..."
                                          ) : (
                                            <span className="hyphen">-</span>
                                          )}
                                        </td>
                                      )}
                                    <td>{sectionContent.displayOrder}</td>
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textElementFlag
                                          ? "Yes"
                                          : "No"}
                                      </td>
                                    )}
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textForElement || (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textColor || (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textbgColor || (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textElementFlag ? (
                                          <span
                                            className={
                                              sectionContent.textElementStatus
                                                ? "badge badge-success"
                                                : "badge badge-danger"
                                            }
                                          >
                                            {sectionContent.textElementStatus
                                              ? "Active"
                                              : "Non Active"}
                                          </span>
                                        ) : (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    {sectionType === "Customer Menu" && (
                                      <td>
                                        {sectionContent?.textElementFlag ? (
                                          <img
                                            src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${sectionContent.textIcon}`}
                                            style={{ width: "50px" }}
                                            alt="webImage"
                                          />
                                        ) : (
                                          <span className="hyphen"> -</span>
                                        )}
                                      </td>
                                    )}
                                    <td>
                                      <span
                                        className={
                                          sectionContent.enabled
                                            ? "badge badge-success"
                                            : "badge badge-danger"
                                        }
                                      >
                                        {sectionContent.enabled
                                          ? "Active"
                                          : "Non Active"}
                                      </span>
                                    </td>
                                    {sectionType === "SpecialSection" && (
                                      <td>
                                        {sectionContent?.isOverrideMetadata ? (
                                          <Button
                                            text={"Edit Data"}
                                            className="btn btn-primary btn-sm float-right client_Btn"
                                          />
                                        ) : (
                                          "Not Allowed"
                                        )}
                                      </td>
                                    )}
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
