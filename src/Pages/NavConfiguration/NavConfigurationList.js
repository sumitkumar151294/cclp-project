import React, { useEffect, useState } from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import NavConfigurationForm from "./NavConfigurationForm";
import NoRecord from "../../Components/NoRecord/NoRecord";
import {
  onGetNavConfigure,
  onPostNavConfigure,
} from "../../Store/Slices/NavConfigurationSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const NavConfigurationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState("");
  const [navData, setNavData] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  // to get column heading name from translation
  const nav_configuration_list = GetTranslationData(
    "UIMasterAdmin",
    "nav_configuration_list"
  );
  const menu_name = GetTranslationData("UIMasterAdmin", "menu_name");
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const nav_icon = GetTranslationData("UIMasterAdmin", "nav_icon");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
  // to get module data from the Redux store
  const navConfigure = useSelector((state) => state?.navConfigurationReducer);
  const navConfigureData = navConfigure?.getNavConfigureData;
  // to get module filtered data from redux
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  //fetch module master data on mount
  useEffect(() => {
    dispatch(onGetNavConfigure());
  }, []);
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter selected data
  const filteredData = navConfigureData?.filter(
    (data) =>
      data.cta?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      data.navigationMenuName
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
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
  //to handle delete
  const handleSubmit = (data, isEdit) => {
    const navConfigData = {
      ...data,
      deleted: true,
    };
    if (isEdit) {
      setNavData(navConfigData);
    } else {
      dispatch(onPostNavConfigure(navConfigData));
    }
  };
  // to show the snackbar and call get api

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
      <NavConfigurationForm navData={navData} setNavData={setNavData} edit={edit} setEdit={setEdit}/>
      <div className="containers-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="containers-fluid mt-2 mb-2 pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{nav_configuration_list}</h4>
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
                {(navConfigure?.isgetLoading )? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : filteredData?.length ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{menu_name}</th>
                          <th>{call_to_action}</th>
                          <th>{display_order}</th>
                          <th>{"Nav Icon"}</th>
                          <th>{"Login Required"}</th>
                          <th>{status_label}</th>
                          <th>{action_label}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData
                          ?.slice(startIndex, endIndex)
                          ?.map((data, index) => (
                            <tr key={index}>
                              <td>{data.navigationMenuName}</td>
                              <td>{data.cta}</td>
                              <td>{data.displayOrder}</td>
                              <td>
                                <img
                                  src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${data.icon}`}
                                  style={{ width: "50px" }}
                                  alt="mobImage"
                                />
                              </td>
                              <td>{data.loginRequired ? "Yes" : "No"}</td>
                              <td>
                                <span
                                  className={
                                    data.enabled
                                      ? "badge badge-success"
                                      : "badge badge-danger"
                                  }
                                >
                                  {data.enabled
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
                                      handleSubmit(data, {
                                        isEdit: true,
                                      })
                                    }
                                  />
                                  <Button
                                    className="btn btn-danger shadow btn-xs sharp"
                                    end_icon={"fa fa-trash"}
                                    onClick={() =>
                                      showAlert(data, {
                                        isEdit: false,
                                      })
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
