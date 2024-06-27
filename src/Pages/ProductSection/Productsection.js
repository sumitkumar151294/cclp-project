import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {
  onGetProductSection,
  onPostProductSectionReset,
  onPostProductSetionSubmit,
} from "../../Store/Slices/productSectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const ProductSection = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  // Translation labels
  const productSectionLabel = GetTranslationData("UIAdmin", "productSection");
  const productSectionList = GetTranslationData(
    "UIAdmin",
    "productSectionList"
  );
  const sectionName = GetTranslationData("UIAdmin", "sectionName");
  const action = GetTranslationData("UIAdmin", "action");
  const date_label = GetTranslationData("UIAdmin", "date");
  const status_label = GetTranslationData("UIAdmin", "status");
  const allocate = GetTranslationData("UIAdmin", "allocate");
  // to get product data
  const productSection = useSelector((state) => state?.productSectionReducer);
  const productSecData = productSection?.getData;
  const postProductSecData = useSelector(
    (state) => state?.productSectionReducer
  );
  // fetch product section data on component mount
  useEffect(() => {
    dispatch(onGetProductSection());
  }, []);
  // initial value for the input fields
  const initialValues = {
    sectionName: "",
    status: "",
    date: "",
  };
  // to validate product section form using Yup schema
  const validateForm = yup.object({
    sectionName: yup.string().required("Name is required"),
    status: yup.string().required("Status is required"),
    date: yup.string().required("Date is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsSubmit(true);
      dispatch(onPostProductSetionSubmit({ values }));
      action.resetForm();
    },
  });
  // options for status
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Non-Active" },
  ];
  //to handle navigation and toast notifications based on product section form status
  useEffect(() => {
    if (isSubmit && postProductSecData?.status_code === "201") {
      toast.success(postProductSecData?.message);
      dispatch(onPostProductSectionReset());
    } else if (isSubmit && postProductSecData?.status_code) {
      toast.error(postProductSecData?.message);
    }
  }, [postProductSecData]);
  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // to handle select option
  const handleStatus = (setter) => (event) => {
    setter(event.target.value);
  };
  // Filter and sort the productContentList data
  const filteredProductSecData = productSecData?.filter((item) => {
    const matchesStatus = !status || item.currentStatus.toString() === status;
    const matchesSearchQuery =
      !searchQuery ||
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearchQuery;
  });
  // for Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // to handle page chnages
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{productSectionLabel}</h4>
              </div>
              {postProductSecData?.isLoading && <Loader />}
              <div className="card-body pb-0 ">
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          {sectionName}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.sectionName
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="sectionName"
                          placeholder="Section Name"
                          value={values.sectionName}
                          onChange={handleChange}
                        />
                        {errors.sectionName && touched.sectionName && (
                          <p className="text-danger">{errors.sectionName}</p>
                        )}
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="status">
                          Status
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          className={` ${
                            errors.status ? "border-danger" : "form-select"
                          }`}
                          options={statusOptions}
                        />
                        {errors.status && touched.status && (
                          <p className="text-danger">{errors.status}</p>
                        )}
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">
                          {date_label}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="date"
                          className={` ${
                            errors.date ? "border-danger" : "form-control"
                          }`}
                          name="date"
                          value={values.date}
                          onChange={handleChange}
                        />
                        {errors.date && touched.date && (
                          <p className="text-danger">{errors.date}</p>
                        )}
                      </div>

                      <div className="col-lg-3 ">
                        <Button
                          text="Submit"
                          className="btn btn-primary float-right pad-aa"
                          icon="fa fa-arrow-right"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="container-fluid pt-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="container-fluid mt-2 pt-0">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                          <div className="card-header">
                            <h4 className="card-title">{productSectionList}</h4>
                          </div>
                          <div className="customer-search mb-sm-0 mb-3">
                            <div className="input-group search-area">
                              <InputField
                                type="text"
                                className="form-control only-high"
                                placeholder="Search here......"
                                value={searchQuery}
                                onChange={handleSearch}
                              />
                              <span className="input-group-text">
                                <i className="fa fa-search"></i>
                              </span>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                            <div className="col-lg-12 form-group mb-2">
                              <label htmlFor="name-f">{status_label} </label>
                              <Dropdown
                                name="status"
                                value={status}
                                onChange={handleStatus(setStatus)}
                                className="form-select"
                                options={statusOptions}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container-fluid">
                        {productSection.isLoading ? (
                          <div style={{ height: "400px" }}>
                            <Loader classType={"absoluteLoader"} />
                          </div>
                        ) : Array.isArray(filteredProductSecData) &&
                          filteredProductSecData.length > 0 ? (
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table header-border table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>{sectionName}</th>
                                    <th>{date_label}</th>
                                    <th>{status_label}</th>
                                    <th>{action}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredProductSecData
                                    ?.slice(startIndex, endIndex)
                                    .map((data, index) => (
                                      <tr key={index}>
                                        <td>
                                          {data.name}
                                          <a href=""></a>
                                        </td>
                                        <td>{data.date}</td>
                                        <td>
                                          <span
                                            className={`badge ${
                                              data.currentStatus
                                                ? "badge-success"
                                                : "badge-danger"
                                            }`}
                                          >
                                            {data.currentStatus
                                              ? "Active"
                                              : "Non-Active"}
                                          </span>
                                        </td>
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              className="btn btn-primary shadow btn-xs sharp me-1"
                                              icon="fas fa-pencil-alt"
                                            />
                                            <Button
                                              className="btn btn-danger shadow btn-xs sharp"
                                              icon="fa fa-trash"
                                            />
                                          </div>
                                        </td>

                                        <td>
                                          <Link
                                            to="/allocateProduct"
                                            className="btn btn-primary btn-sm float-right"
                                          >
                                            <i className="fa fa-eye"></i>
                                            {allocate}
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              {filteredProductSecData.length > 5 && (
                                <div className="pagination-container">
                                  <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={" >"}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(
                                      filteredProductSecData.length /
                                        rowsPerPage
                                    )}
                                    marginPagesDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"}
                                    initialPage={page - 1} // Use initialPage instead of forcePage
                                    previousClassName={
                                      page === 1 ? "disabled_Text" : ""
                                    }
                                  />
                                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
