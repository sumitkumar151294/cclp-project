import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import RoleMasterForm from "./RoleMasterForm";
import ReactPaginate from "react-paginate";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
const RoleMasterList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  // To get the label from redux
  debugger;
  const roleAccessListData = useSelector(
    (state) => state?.userRoleReducer?.userRoleData
  );

  useEffect(() => {
    dispatch(onGetUserRole());
  }, []);
  // for pagination
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  return (
    <>
      <RoleMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Role Module Access List</h4>
              </div>
              <div className="card-body position-relative">
              {roleAccessListData?.getUserRoleLoading && <Loader />}
                {roleAccessListData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead key="thead">
                        <tr>
                          <th>roleName</th>
                          <th>modules</th>
                          <th>action</th>
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
                                    {/* {Array.isArray(userRoleAccessListData) &&
                                      userRoleAccessListData
                                        ?.filter(
                                          (item) =>
                                            item.roleId === data?.id &&
                                            (item.viewAccess ||
                                              item.addAccess ||
                                              item.editAccess)
                                        )
                                        .map((moduleData) => ( */}
                                    <span className="badge badge-success mr-10">
                                      {data.module}
                                    </span>
                                    {/* ))} */}
                                  </div>
                                </td>
                                <td>
                                  <button
                                    //onClick={() => handleEdit(data)}
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </button>
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
                          previousClassName={page === 0 ? "disabled_Text" : ""}
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
