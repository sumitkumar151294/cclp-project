import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetuserMaster,
  onPostuserMaster,
} from "../../Store/Slices/userMasterSlice";
import UserMasterForm from "./UserMasterForm";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import InputField from "../../Components/InputField/InputField";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserMasterList = () => {
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  const [userMasterData, setuserMasterData] = useState();
  const roleList = useSelector((state) => state?.userRoleReducer);
  const dispatch = useDispatch();
  //To get the labels from API
  const user_list_label = GetTranslationData(
    "UIMasterAdmin",
    "user_list_label"
  );
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const user_name_label = GetTranslationData(
    "UIMasterAdmin",
    "user_name_label"
  );
  const email_label = GetTranslationData("UIMasterAdmin", "email_label");
  const mobile = GetTranslationData("UIMasterAdmin", "mobile_label");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
  //to get user master data from redux store
  const userList = useSelector((state) => state.userMasterReducer);
  const roleAccessListData = useSelector(
    (state) => state?.userRoleReducer?.userRoleData
  );
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  //to fetch data on mount
  useEffect(() => {
    dispatch(onGetuserMaster());
    dispatch(onGetUserRole());
  }, []);
  // for pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page changes
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter user data 
  const filteredData = userList?.getuserMasterData?.filter(
    (data) =>
      data?.firstName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      data.email?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
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
  const handleSubmit = (userMasterInfo, isEdit) => {
    const userData = {
      ...userMasterInfo,
      deleted: true,
    };
    if (isEdit) {
      setuserMasterData(userData);
    } else {
      setEdit(true)
      dispatch(onPostuserMaster(userData));
    }
  };
  useEffect(() => {
    if (userList) {
      const totalItems = filteredData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [userList]);

  useEffect(() => {
    dispatch(onGetuserMaster());
    dispatch(onGetUserRole());
  }, []);


  return (
    <>
      <ScrollToTop />
      {/* {getRoleAccess[0]?.addAccess && ( */}
        <UserMasterForm
          userMasterData={userMasterData}
          setuserMasterData={setuserMasterData}
          edit={edit}
          setEdit={setEdit}
        />
      {/* )} */}
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{user_list_label}</h4>
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
                {(userList?.isgetLoading || roleList?.isgetLoading ||       userList?.isPostLoading)
             ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : filteredData?.length ? (
                  <div className="table-responsive scroll-Table-x">
                    <>
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{user_name_label}</th>
                            <th>{email_label}</th>
                            <th>{mobile}</th>
                            <th>{"Role Access"}</th>
                            <th>{status_label}</th>

                              <th>{action_label}</th>

                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .slice(startIndex, endIndex)
                            .map((userMasterData, index) => (
                              <tr key={index}>
                                <td>
                                  {userMasterData?.firstName +
                                    " " +
                                    userMasterData?.lastName}
                                </td>
                                <td>{userMasterData?.email}</td>
                                <td>{userMasterData?.mobile}</td>
                                <td>
                                  {roleAccessListData
                                    ?.filter(
                                      (roleAccessData) =>
                                        roleAccessData?.id ===
                                        userMasterData?.roleId
                                    )
                                    .map((filteredData) => (
                                      <span key={filteredData.id}>
                                        {filteredData.name}
                                      </span> // Adjust as needed
                                    ))}
                                </td>
                                <td>
                                  <span
                                    className={
                                      userMasterData.enabled
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                    }
                                  >
                                    {userMasterData.enabled
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
                                          handleSubmit(userMasterData, {
                                            isEdit: true,
                                          })
                                        }
                                      />
                                      <Button
                                        className="btn btn-danger shadow btn-xs sharp"
                                        end_icon={"fa fa-trash"}
                                        onClick={() =>
                                          showAlert(userMasterData)
                                        }
                                      />
                                    </div>
                                  </td>

                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {filteredData?.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              filteredData?.length / rowsPerPage
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

export default UserMasterList;
