/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";

const typeOfCoupon = [
  { value: 1, label: "Static" },
  { value: 2, label: "Dynamic" },
  { value: 3, label: "No Code" },
  { value: 4, label: "Membership" },
];
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const CustomerSegmentForm = () => {
  const [intialValue, setInitialValue] = useState({
    segmentName: "",
    segmentCode: "",
    segmentId: "",
    validTill: "",

  });
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    segmentName: Yup.string().required("Segment Name is required"),
    segmentCode: Yup.string().required("Segment Code is required"),
    validTill: Yup.string().required(" Validity is required"),
    segmentId: Yup.string().required("Segment Id is required"),
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
                <h4 className="card-title">Customer Segment</h4>
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
                              <label> Customer Segment Name</label>
                              <Field
                                type="text"
                                name="segmentName"
                                className={`form-control ${
                                  errors.segmentName && touched.segmentName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Customer Segment Name"
                              />
                              <ErrorMessage
                                name="segmentName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label> Customer Segment Code</label>
                              <Field
                                type="text"
                                name="segmentCode"
                                className={`form-control ${
                                  errors.segmentCode && touched.segmentCode
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Customer Segment Code"
                              />
                              <ErrorMessage
                                name="segmentCode"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label> Customer Segment Id</label>
                              <Field
                                type="text"
                                name="segmentId"
                                className={`form-control ${
                                  errors.segmentId && touched.segmentId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Customer Segment Id"
                              />
                              <ErrorMessage
                                name="segmentId"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label> Valid Till</label>
                              <Field
                                type="date"
                                name="validTill"
                                className={`form-control ${
                                  errors.validTill && touched.validTill
                                    ? "is-invalid"
                                    : ""
                                }`}

                              />
                              <ErrorMessage
                                name="validTill"
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

export default CustomerSegmentForm;
/* eslint-enable react-hooks/exhaustive-deps */
