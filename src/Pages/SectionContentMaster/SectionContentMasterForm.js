/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useLocation } from "react-router-dom";

import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";


const contentSourceTypeOptions = [
  { value: "Deal", label: "Deal" },
  { value: "Product", label: "Product" },
  { value: "Image", label: "Image" },
];
const SectionContentMasterForm = () => {
  const location = useLocation();
  const [showFields, setShowFields] = useState(false);
  // get labels and placeholder from translation
  const section_content_master = GetTranslationData("UIMasterAdmin", "section_content_master");
  const content_source_type = GetTranslationData("UIMasterAdmin", "content_source_type");
  const upload_image_for_web = GetTranslationData("UIMasterAdmin", "upload_image_for_web");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const upload_image_for_phone = GetTranslationData("UIMasterAdmin", "upload_image_for_phone");
  const call_to_action = GetTranslationData("UIMasterAdmin", "content_source_type");
  const call_to_action_placeholder = GetTranslationData("UIMasterAdmin", "upload_image_for_web");
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const displayOrderPlaceholder = GetTranslationData("UIMasterAdmin", "displayOrderPlaceholder");
  const text_label = GetTranslationData("UIMasterAdmin", "text_label");
  const text_placeholder = GetTranslationData("UIMasterAdmin", "text_placeholder");

  const type = location.state.sectionType;
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    phoneImage: "",
    callToAction: "",
    displayOrder: "",
    text: "",
    contentSourceType: "",
    segmentId: "",
  });
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    webImage: Yup.string().required("Image is required"),
    phoneImage: Yup.string().required("Image is required"),
    displayOrder: Yup.string().required("Display Order is required"),
  });
  const handleSubmit = (values) => {};

  const handleImageChange = (setFieldValue, event) => {
    setFieldValue("phoneImage", event.currentTarget.files[0]);
    setFieldValue("webImage", event.currentTarget.files[0]);
  };

  return (
    <>
    <ScrollToTop/>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Section Content Master</h4>
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
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Content Source Type
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="contentSourceType"
                                component={Dropdown}
                                options={contentSourceTypeOptions}
                                className={`form-select ${
                                  errors.contentSourceType &&
                                  touched.contentSourceType
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  setShowFields(e === "Image");
                                }}
                              />
                              <ErrorMessage
                                name="contentSourceType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                           { !showFields  &&
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Segment
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="segmentId"
                                component={Dropdown}
                                options={contentSourceTypeOptions}
                                className={`form-select ${
                                  errors.segmentId && touched.segmentId
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="segmentId"
                                component="div"
                                className="error-message"
                              />
                            </div>}
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
                              <label>Call To Action</label>
                              <Field
                                type="text"
                                name="callToAction"
                                className={`form-control ${
                                  errors.callToAction && touched.callToAction
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Call To Action"
                              />
                            </div>
                              {!showFields && <div className="col-sm-4 form-group mb-2">
                              <label>Text</label>
                              <Field
                                type="text"
                                name="text"
                                className={`form-control ${
                                  errors.text && touched.text
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Text"
                              />
                            </div>}

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
