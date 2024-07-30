import React, { useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Loader from "../../Components/Loader/Loader";
import SectionContentMasterForm from "./SectionContentMasterForm";

const SectionContentMasterList = () => {
  const SectionMasterData = [
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
    },
    {
      sectionName: "TopOffers",
      sectionType: "Top Offers",
      contentSourceType:"deal",
      segment:"zomato",
      displayOrder: "3",
      text: "i am offer master",
      enabled: true,
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
      <SectionContentMasterForm />
      <ScrollToTop />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Section Content Master List"}</h4>
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
                                <th>{"Content Source Type"}</th>
                                <th>{"Segment"}</th>
                                <th>{"Display Order"}</th>
                                <th>{"Text"}</th>


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
                                  <td>{SectionMasterData.contentSourceType}</td>
                                  <td>{SectionMasterData.segment}</td>
                                  <td>{SectionMasterData.displayOrder}</td>
                                  <td>{SectionMasterData.text}</td>
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

export default SectionContentMasterList;
