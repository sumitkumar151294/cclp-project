import React, { useEffect, useState } from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import NavConfigurationForm from "./NavConfigurationForm";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { onGetNavConfigure } from "../../Store/Slices/NavConfigurationSlice";

const NavConfigurationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  // to get module data from the Redux store
  const navConfigure = useSelector((state) => state?.navConfigurationReducer);
  const navConfigureData = navConfigure?.getNavConfigureData;
  //fetch module master data on mount
  useEffect(() => {
    dispatch(onGetNavConfigure());
  }, []);
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter selected data
  const filteredData = navConfigureData?.filter((data) =>
    data.cta?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || 
    data.navigationMenuName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  // for pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page changes
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  return (
    <>
      <ScrollToTop />
      <NavConfigurationForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{"Nav Configuration List"}</h4>
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
              {navConfigure?.isgetLoading && <Loader />}
              <div className="card-body">
                {filteredData?.length ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>Menu Name</th>
                          <th>Call To Action</th>
                          <th>Display Order</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData
                          ?.slice(startIndex, endIndex)
                          ?.map((data, index) => (
                            <tr>
                              <td>{data.cta}</td>
                              <td>{data.navigationMenuName}</td>
                              <td>{data.displayOrder}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {filteredData?.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            filteredData?.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                        />
                      </div>
                    )}
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

export default NavConfigurationList;
