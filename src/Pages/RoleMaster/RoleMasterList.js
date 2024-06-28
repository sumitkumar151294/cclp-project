import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import RoleMasterForm from "./RoleMasterForm";
import ReactPaginate from "react-paginate";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const RoleMasterList = () => {
  const [page, setPage] = useState(1);
  // To get the Translation label
  const roleModuleAccessList = GetTranslationData(
    "UIAdmin",
    "role-module-access-list"
  );
  const roleName = GetTranslationData("UIAdmin", "role-name");
  const modules = GetTranslationData("UIAdmin", "modules");
  const action = GetTranslationData("UIAdmin", "action");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const dispatch = useDispatch();
  // To get the label from redux
  const roleAccessList = useSelector((state) => state?.userRoleReducer);
  const roleAccessListData = roleAccessList?.userRoleData;
  // fetch Role Master data on component mount
  useEffect(() => {
    dispatch(onGetUserRole());
  }, []);
  // for pagination
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  return (
    <>
      <ScrollToTop />
      <RoleMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleModuleAccessList}</h4>
              </div>
              <div className="card-body position-relative">
                {roleAccessList?.getUserRoleLoading && <Loader />}
                {roleAccessListData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead key="thead">
                        <tr>
                          <th>{roleName}</th>
                          <th>{modules}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody key="tbody">
                        {Array.isArray(roleAccessListData) &&
                          roleAccessListData
                            .slice(startIndex, endIndex)
                            .map((data, index) => (
                              <tr key={index}>
                                <td>{data.name}</td>
                                <td>
                                  <div className="d-flex">
                                  {data?.modules?.map((item) => (
                                    <span className="badge badge-success mr-10">
                                    {item}
                                  </span>
                                  ))}
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    icon={"fas fa-pencil-alt"}
                                  />
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      {roleAccessListData.length > 5 && (
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            roleAccessListData.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 0 ? disabled_Text : ""}
                        />
                      )}
                    </div>
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
export default RoleMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
