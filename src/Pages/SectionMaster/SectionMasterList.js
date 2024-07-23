import React, { useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import SectionMasterForm from "./SectionMasterForm";
import InputField from "../../Components/InputField/InputField";

const SectionMasterList = () => {
  const SectionMasterData = [
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },{
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      displayOrder: "3",
      text: "i am offer master",
      enabled:true
    },


  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return (
    <>
      <SectionMasterForm />
      <ScrollToTop />
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
                        // value={searchQuery}
                        // onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                  {/* <div className="d-flex align-items-center flex-wrap">
                        {clientList?.clientData &&
                          clientList?.clientData?.length > 0 && (
                            <CSVLink
                              data={excelData}
                              headers={headers}
                              filename={"ClientMaster.csv"}
                            >
                              {filteredClientList.length > 0 && (
                                <Button
                                  className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                  text={exportLabel}
                                  icons={"fa fa-file-excel me-2"}
                                />
                              )}
                            </CSVLink>
                          )}
                      </div> */}
                </div>
              </div>
              <div className="card-body">
                {SectionMasterData?.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {SectionMasterData.length ? (
                      <div className="table-responsive scroll-Table-x">
                        <>
                          <table className="table header-border table-responsive-sm">
                            <thead>
                              <tr>
                                <th>{"Section Name"}</th>
                                <th>{"Section Type"}</th>
                                <th>{"Display Order"}</th>
                                <th>{"Text"}</th>
                                <th>{"Status"}</th>
                                <th>{"Action"}</th>
                                <th>{"Section Data"}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {SectionMasterData.slice(
                                startIndex,
                                endIndex
                              ).map((SectionMasterData, index) => (
                                <tr key={index}>
                                  <td>{SectionMasterData.sectionName}</td>
                                  <td>{SectionMasterData.sectionType}</td>
                                  <td>{SectionMasterData.displayOrder}</td>
                                  <td>{SectionMasterData.text}</td>
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
                                        // onClick={() =>
                                        //   handleEdit(
                                        //     data,
                                        //     clientPayData
                                        //   )
                                        // }
                                      />
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        icon={"fa fa-trash"}
                                        // onClick={() =>
                                        //   handleDelete(data)
                                        // }
                                      />
                                    </div>
                                  </td>

                                  <td>
                                    <Link
                                      to="/sectionContentMaster"
                                      // state={{ id: data.id }}
                                      className="btn btn-primary btn-sm float-right client_Btn"
                                    >
                                      <i className="fa fa-eye"></i>&nbsp;
                                      {"Update"}
                                    </Link>
                                  </td>

                                </tr>
                              ))}
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

export default SectionMasterList;
