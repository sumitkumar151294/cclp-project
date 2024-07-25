/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";


const SectionContentMasterForm = () => {
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    phoneImage: "",
    displayOrder: "",
    categoryName:""
  });
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    webImage: Yup.string().required("Image is required"),
    phoneImage: Yup.string().required("Image is required"),
    displayOrder: Yup.string().required("Display Order is required"),
    categoryName: Yup.string().required("Category Name is required")
  });
  const handleSubmit = (values) => {};
  // useEffect(() => {
  //   if (templateTypemasterData?.post_status_code === "201") {
  //     toast.success(templateTypemasterData.postMessage)
  //     dispatch(onPosttemplateTypeMasterReset())
  //     dispatch(onGettemplateTypeMaster())
  //   } else if (templateTypemasterData?.post_status_code) {
  //     toast.error(templateTypemasterData.postMessage)
  //     dispatch(onPosttemplateTypeMasterReset())
  //   }

  // }, [templateTypemasterData]);

  // useEffect(() => {
  //   if (templateTypeData) {
  //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  //     setInitialValue(templateTypeData)
  //     setButton("Update")
  //   }
  // }, [templateTypeData])
  const handleImageChange = (setFieldValue, event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

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
                                placeholder="Enter Call To Action"
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
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event)
                                }
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
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event)
                                }
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
