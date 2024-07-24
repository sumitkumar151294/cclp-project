/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const sectionTypeOptions = [
  { value: 1, label: "Banner" },
  { value: 2, label: "Offer" },
  { value: 3, label: "Middle" },
  { value: 4, label: "Tope" },
  { value: 5, label: "Bottom" },
];
const SectionMasterForm = () => {
  const [intialValue, setInitialValue] = useState({
    sectionName: "",
    sectionType: "",
    enabled: "",
    displayOrder: "",
    text: "",
    claimLimit: "",
    pointsToClaim: "",
    noOfPointsToClaim: ""
  });
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    sectionName: Yup.string().required("Section Name is required"),
    sectionType: Yup.string().required("Section Type is required"),
    enabled: Yup.string().required("Status is required"),
    displayOrder: Yup.string().required("Display Order is required"),
  });
  const handleSubmit = (values) => { };
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
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Section Master</h4>
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
                      {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Section Type
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="clientId"
                                component={Dropdown}
                                options={sectionTypeOptions}
                                className={`form-select ${errors.sectionType && touched.sectionType
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="sectionType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Section Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="sectionName"
                                className={`form-control ${errors.sectionName && touched.sectionName
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Section Name"
                              />
                              <ErrorMessage
                                name="sectionName"
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
                                className={`form-control ${errors.displayOrder && touched.displayOrder
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
                                Claim Limit
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="claimLimit"
                                className={`form-control ${errors.claimLimit && touched.claimLimit
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Claim Limit"
                              />
                              <ErrorMessage
                                name="claimLimit"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2 mt-1" >
                              <label>
                                Text

                              </label>
                              <Field
                                type="text"
                                name="text"
                                className={`form-control ${errors.text && touched.text
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Text "
                              />

                            </div>
                            <div className="col-lg-4 py-4">
                              <div className="form-check  mb-2 padd">
                                <Field
                                  type="checkbox"
                                  className="form-check-input"
                                  name="pointsToClaim"
                                />
                                <label className="px-1">Point To Claim</label>
                              </div>
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                No Of Points To Claim
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="noOfPointsToClaim"
                                className={`form-control ${errors.noOfPointsToClaim && touched.noOfPointsToClaim
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter No Of Points To Claim"

                              />
                              <ErrorMessage
                                name="noOfPointsToClaim"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2 mt-1" >
                              <label>
                                Status
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="enabled"
                                component={Dropdown}
                                options={statusOptions}
                                className={`form-select ${errors.enabled && touched.enabled
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="enabled"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-12 form-group mb-0">
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

export default SectionMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
