import React, { useEffect, useState } from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import {
  onGetModule,
  onPostModule,
} from "../../Store/Slices/moduleSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../Components/InputField/InputField";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import BulkUploadingForm from "../ModuleMaster/ModuleMasterForm";

const BulkUploadingList = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [moduleMasterData, setModuleMasterData] = useState();
  const [edit, setEdit] = useState(false);
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
  const search_here_label = GetTranslationData(
    "UIMasterAdmin",
    "search_here_label"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const action_label = GetTranslationData("UIMasterAdmin", "action_label");
  const active_label = GetTranslationData("UIMasterAdmin", "active_label");
  const non_active_label = GetTranslationData(
    "UIMasterAdmin",
    "non_active_label"
  );
  // to get module data from the Redux store
  const getModule = useSelector((state) => state?.moduleReducer);
  const getModuleData = getModule?.data;
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  //fetch module master data on mount
  useEffect(() => {
    if (!getModule) {
      dispatch(onGetModule());
    }
  }, []);
  // to handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // to filter selected data
  const filteredData =
    Array.isArray(getModuleData) &&
    getModuleData?.filter((data) =>
      data.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
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
  const handleSubmit = (moduleInfo, isEdit) => {
    const userData = {
      ...moduleInfo,
      deleted: true,
    };
    if (isEdit) {
      setModuleMasterData(userData);
    } else {
      setEdit(true)
      dispatch(onPostModule(userData));
    }
  };
  // for pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page changes
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [filteredData]);
  return (
    <>
      <ScrollToTop />
      {/* {getRoleAccess[0]?.addAccess && ( */}
        <BulkUploadingForm
          moduleMasterData={moduleMasterData}
          setModuleMasterData={setModuleMasterData}
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

              <div className="card-body">
                {((edit && getModule?.postLoading) || getModule?.isLoading) ? (
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
                          <th>{display_order}</th>
                          <th>{status_label}</th>

                          {/* {getRoleAccess[0]?.editAccess && ( */}
                               <th>{action_label}</th>
                                {/* )} */}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData
                          ?.slice(startIndex, endIndex)
                          ?.map((module, index) => (
                            <tr key={index}>
                              <td>{module.name}</td>
                              <td>{module.routePath}</td>
                              <td>
                                <img
                                  src={`${process.env.REACT_APP_CLIENT_IMAGE_URL}${module.icon}`}
                                  style={{ width: "30px" }}
                                  alt="mobImage"
                                />
                              </td>
                              <td>{module.displayOrder}</td>
                              <td>
                                <span
                                  className={
                                    module.enabled
                                      ? "badge badge-success"
                                      : "badge badge-danger"
                                  }
                                >
                                  {module.enabled
                                    ? active_label
                                    : non_active_label}
                                </span>
                              </td>
                              {/* {getRoleAccess[0]?.editAccess && ( */}
                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                      end_icon={"fas fa-pencil-alt"}
                                      onClick={() =>
                                        handleSubmit(module, {
                                          isEdit: true,
                                        })
                                      }
                                    />
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      end_icon={"fa fa-trash"}
                                      onClick={() => showAlert(module)}
                                    />
                                  </div>
                                </td>
                              {/* )} */}
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
      </div>
    </>
  );
};

export default BulkUploadingList;
