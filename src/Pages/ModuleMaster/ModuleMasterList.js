import React, { useEffect, useState } from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ModuleMaster from "./ModuleMaster";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { onGetModule } from "../../Store/Slices/moduleSlice";

const ModuleMasterList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  // to get module data from the Redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  //fetch module master data on mount
  useEffect(() => {
    dispatch(onGetModule());
  }, [dispatch]);
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
      <ModuleMaster />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Module List</h4>
              </div>
              {getModule?.isLoading && <Loader />}
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Module Name</th>
                        <th>Module Route Path</th>
                        <th>Icon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getModuleData?.slice(startIndex, endIndex)?.map((data, index) => (
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.routePath}</td>
                          <td>{data.icon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {getModuleData.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            getModuleData.length / rowsPerPage
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleMasterList;
