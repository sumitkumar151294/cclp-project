/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGetDealCategory, onPostDealCategory, onPostDealCategoryReset } from "../../Store/Slices/dealCategorySlice";

const SectionContentMasterForm = () => { 
  const dispatch = useDispatch();
  // to get deal category data from redux store
  const dealCategoryData=useSelector(state=>state.dealCategoryReducer)
  // initial values for the input fields
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    phoneImage: "",
    displayOrder: "",
    categoryName:""
  });
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    webImage: Yup.string().required("Image is required"),
    phoneImage: Yup.string().required("Image is required"),
    displayOrder: Yup.string().required("Display Order is required"),
    categoryName: Yup.string().required("Category Name is required")
  });
  //to handle submit
  const handleSubmit = (values) => {
    if(values){
      dispatch(onPostDealCategory(values))
    }
  };
  // to handle image changes
  const handleImageChange = (setFieldValue, event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };
  // to handle navigation and toast notifications based on deal category status
  useEffect(() => {
    if (dealCategoryData?.post_status_code === "201") {
      toast.success(dealCategoryData.postMessage)
      dispatch(onPostDealCategoryReset())
      dispatch(onGetDealCategory())
    } else if (dealCategoryData?.post_status_code) {
      toast.error(dealCategoryData.postMessage)
      dispatch(onPostDealCategoryReset())
    }
  }, [dealCategoryData]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Deal Category</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "200px" }}>
                    <Loader />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <Formik
                      initialValues={intialValue}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label>Category Name</label>
                              <Field
                                type="text"
                                name="categoryName"
                                className={`form-control ${
                                  errors.categoryName && touched.categoryName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Category Name"
                              />
                              <ErrorMessage
                                name="categoryName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Display Order
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="displayOrder"
                                className={`form-control ${
                                  errors.displayOrder && touched.displayOrder
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Display Order"
                              />
                              <ErrorMessage
                                name="displayOrder"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Web
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="webImage"
                                className={`form-control ${
                                  errors.webImage && touched.webImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) => {
                                  setFieldValue('webImage', event.currentTarget.files[0]);
                                }}
                              />
                              <ErrorMessage
                                name="webImage"
                                component="div"
                                className="error-message"
                              />
                            </div>{" "}
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Phone
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="phoneImage"
                                className={`form-control ${
                                  errors.phoneImage && touched.phoneImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) => {
                                  setFieldValue('phoneImage', event.currentTarget.files[0]);
                                }}
                              />
                              <ErrorMessage
                                name="phoneImage"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-12 form-group mb-0 ">
                              <Button
                                text={"Sumbit"}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
                              />
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionContentMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
