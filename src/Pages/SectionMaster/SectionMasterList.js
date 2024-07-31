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
import {
  onGetsectionMaster,
  onUpdatesectionMaster,
  onUpdatesectionMasterReset,
} from "../../Store/Slices/sectionMasterSlice";
import { toast } from "react-toastify";

const SectionMasterList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const [sectionData, setSectionData] = useState("")
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const SectionMasterData = useSelector(
    (state) => state?.sectionMasterReducer?.getsectionMasterData
  );
  const SectionMaster = useSelector((state) => state?.sectionMasterReducer);

  const handleSumbit = (sectionData, isEdit) => {
    debugger;
    const sectionMasterData = {
      id: sectionData?.id,
      enabled: sectionData?.enabled,
      deleted: true,
      createdBy: 0,
      updatedBy: 0,
      clientId: 4,
      text: sectionData?.text,
      displayOrder: sectionData?.displayOrder,
      sectionType: sectionData?.sectionType,
      displayLimit: sectionData?.displayLimit,
      sectionName: sectionData?.sectionName,
      claimLimit: sectionData?.claimLimit,
      pointToClaim: sectionData?.pointToClaim,
      noOfPointsToClaim: sectionData?.noOfPointsToClaim,
      segmentId: sectionData?.segmentId,
    };
    if (isEdit) {
      setSectionData(sectionMasterData)
    } else {
      dispatch(onUpdatesectionMaster(sectionMasterData));
    }
  };
  useEffect(() => {
    dispatch(onGetsectionMaster());
  }, []);
  useEffect(() => {
    if (SectionMaster?.update_status_code == "204") {
      toast.success(SectionMaster?.updateMessage);
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
  });
  return (
    <>
      <ScrollToTop />
      <SectionMasterForm sectionData={sectionData} />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Section Master List"}</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={"Search here..."}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {SectionMaster?.isgetLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : SectionMasterData?.length ? (
                  <div className="table-responsive scroll-Table-x">
                    <>
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{"Section Name"}</th>
                            <th>{"Section Type"}</th>
                            <th>{"Display Order"}</th>
                            {/* <th>{"Text"}</th> */}
                            {/* <th>{"Points To Claim"}</th> */}
                            <th>{"Status"}</th>
                            <th>{"Action"}</th>
                            <th>{"Section Data"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SectionMasterData.slice(startIndex, endIndex).map(
                            (SectionMasterData, index) => (
                              <tr key={index}>
                                <td>{SectionMasterData?.sectionName}</td>
                                <td>{SectionMasterData?.sectionType}</td>
                                <td>{SectionMasterData?.displayOrder}</td>

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

                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      icon={"fas fa-pencil-alt"}
                                      onClick={() =>
                                        handleSumbit(SectionMasterData, {
                                          isEdit: true,
                                        })
                                      }
                                    />
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      icon={"fa fa-trash"}
                                      onClick={() =>
                                        handleSumbit(SectionMasterData)
                                      }
                                    />
                                  </div>
                                </td>

                                <td>
                                  <Link
                                    to="/sectionContentMaster"
                                    state={{
                                      sectionType:
                                        SectionMasterData.sectionType,
                                    }}
                                    className="btn btn-primary btn-sm float-right client_Btn"
                                  >
                                    <i className="fa fa-eye"></i>&nbsp;
                                    {"Update"}
                                  </Link>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      {SectionMasterData.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              SectionMasterData.length / rowsPerPage
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
