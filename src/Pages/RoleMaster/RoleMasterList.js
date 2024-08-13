import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import RoleMasterForm from "./RoleMasterForm";
import ReactPaginate from "react-paginate";
import {
  onGetUserRole,
  onPostUserRole,
  onPostUserRoleReset,
  onUpdateUserRole,
  onUpdateUserRoleReset,
} from "../../Store/Slices/userRoleSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
import { toast } from "react-toastify";

const RoleMasterList = () => {
  const [page, setPage] = useState(1);
  const [roleMasterData, setRoleMasterData] = useState();
  // To get data from translation
  const roleModuleAccessList = GetTranslationData(
    "UIMasterAdmin",
    "role-module-access-list"
  );
  const roleName = GetTranslationData("UIMasterAdmin", "role_name");
  const modules = GetTranslationData("UIMasterAdmin", "modules");
  const action = GetTranslationData("UIMasterAdmin", "action_label");
  const disabled_Text = GetTranslationData("UIMasterAdmin", "disabled_Text");
  const dispatch = useDispatch();
  // to get the user-role-data from redux
  const roleAccessList = useSelector((state) => state?.userRoleReducer);
  const roleAccessListData = roleAccessList?.userRoleData;
  // to get the user-role-module-access data from redux
  const userRoleAccessListData = useSelector(
    (state) => state.userRoleModuleAccessReducer?.data
  );
  const getuserRoleAccess = useSelector(
    (state) => state.userRoleModuleAccessReducer
  );
  // to get the module data from redux
  const moduleList = useSelector((state) => state.moduleReducer?.data);
  // fetch Role Master data on component mount
  useEffect(() => {
    dispatch(onGetUserRole());
    dispatch(onGetUserRoleModuleAccess());
  }, []);
  //to get module name
  const getModuleName = (id) => {
    if (Array.isArray(moduleList)) {
      let moduleName = moduleList?.filter((moduleData) => moduleData.id === id);
      if (moduleName?.length) {
        return moduleName[0].name;
      }
    }
  };
  // for pagination
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to handle edit functionality
  const handleSubmit = (roleMaster, edit) => {
    if (edit) {
      setRoleMasterData(roleMaster);
    } else {
      const roleMasterInfo = {
        ...roleMaster,
        deleted: true,
      };
      dispatch(onPostUserRole(roleMasterInfo));
    }
  };
  useEffect(() => {
    if (roleAccessList?.status_code === "204") {
      debugger;
      dispatch(onGetUserRole());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(onPostUserRoleReset());
      toast.success(roleAccessList?.message);
    }
  }, [roleAccessList]);
  useEffect(() => {
    if (userRoleAccessListData) {
      const totalItems = userRoleAccessListData.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [userRoleAccessListData]);
  return (
    <>
      <ScrollToTop />
      <RoleMasterForm roleMasterData={roleMasterData} />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleModuleAccessList}</h4>
              </div>
              <div className="card-body position-relative">
                {(roleAccessList?.isgetLoading || roleAccessList?.isUpdateLoading || getuserRoleAccess?.isLoading) && (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                )}
                {roleAccessListData?.length ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead key="thead">
                        <tr>
                          <th>{roleName}</th>
                          <th>{modules}</th>
                          <th>{"Description"}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody key="tbody">
                        {Array.isArray(roleAccessListData) &&
                          roleAccessListData
                            .slice(startIndex, endIndex)
                            .map((roleMasterData, index) => (
                              <tr key={index}>
                                <td>{roleMasterData.name}</td>
                                <td>
                                  <div className="d-flex">
                                    {Array.isArray(userRoleAccessListData) &&
                                      userRoleAccessListData
                                        ?.filter(
                                          (moduleData) =>
                                            moduleData.roleId ===
                                              roleMasterData?.id &&
                                            (moduleData.viewAccess ||
                                              moduleData.addAccess ||
                                              moduleData.editAccess)
                                        )
                                        .map((moduleData) => (
                                          <span
                                            className="badge badge-success mr-10"
                                            key={moduleData.id}
                                          >
                                            {getModuleName(
                                              moduleData?.moduleId
                                            )}
                                          </span>
                                        ))}
                                  </div>
                                </td>
                                <td>
                                  {roleMasterData.description || (
                                    <span className="hyphen"> -</span>
                                  )}
                                </td>

                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      end_icon={"fas fa-pencil-alt"}
                                      onClick={() =>
                                        handleSubmit(roleMasterData, {
                                          isEdit: true,
                                        })
                                      }
                                    />
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      end_icon={"fa fa-trash"}
                                      onClick={() =>
                                        handleSubmit(roleMasterData)
                                      }
                                    />
                                  </div>
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
