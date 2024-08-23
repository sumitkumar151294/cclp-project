import React, { useEffect, useState } from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ModuleMasterForm from "./ModuleMasterForm";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../Components/InputField/InputField";
import NoRecord from "../../Components/NoRecord/NoRecord";

const ModuleMasterList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  // to get labels and placeholder from translation
  const module_list = GetTranslationData("UIMasterAdmin", "module_list");
  const module_name = GetTranslationData("UIMasterAdmin", "module_name");
  const module_route_path = GetTranslationData(
    "UIMasterAdmin",
    "module_route_path"
  );
  const module_icon = GetTranslationData("UIMasterAdmin", "module_icon");
  const search_here_label = GetTranslationData("UIMasterAdmin", "search_here_label");
  // to get module data from the Redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  //fetch module master data on mount
  useEffect(() => {
    if(!getModule){
    dispatch(onGetModule())};
  }, []);
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter selected data
  const filteredData =Array.isArray(getModuleData) && getModuleData?.filter(
    (data) => data.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
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
      <ModuleMasterForm />
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{module_list}</h4>
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
                {getModule?.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : filteredData?.length ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{module_name}</th>
                          <th>{module_route_path}</th>
                          <th>{module_icon}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData
                          ?.slice(startIndex, endIndex)
                          ?.map((data, index) => (
                            <tr key={index}>
                              <td>{data.name}</td>
                              <td>{data.routePath}</td>
                              <td>{data.icon}</td>
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

export default ModuleMasterList;
