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
} from "../../Store/Slices/userRoleSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RoleMasterList = () => {
  const [deleted, setDeleted] = useState(false);
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
  const description = GetTranslationData("UIMasterAdmin", "description");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
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
  // modal for delete warning
  const showAlert = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this row.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result?.value) {
        handleSubmit(data);
      }
    });
  };
  //to handle edit and delete
  const handleSubmit = (roleMaster, edit) => {
    debugger
    if (edit) {
      setRoleMasterData(roleMaster);
    } else {
      const roleMasterInfo = {
        ...roleMaster,
        deleted: true,
      };
      setDeleted(true)
      dispatch(onPostUserRole(roleMasterInfo));
    }
  };

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
      <RoleMasterForm roleMasterData={roleMasterData}    deleted={deleted}
          setDeleted={setDeleted}/>
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleModuleAccessList}</h4>
              </div>
              <div className="card-body position-relative">
                {(roleAccessList?.isgetLoading ||
                  roleAccessList?.isPostLoading ||
                  getuserRoleAccess?.isLoading) && (
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
                          <th>{description}</th>
                          <th>{status_label}</th>
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
                                <span
                                  className={
                                    roleMasterData.enabled
                                      ? "badge badge-success"
                                      : "badge badge-danger"
                                  }
                                >
                                  {roleMasterData.enabled
                                    ? active_label
                                    : non_active_label}
                                </span>
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
                                      onClick={() => showAlert(roleMasterData)}
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
