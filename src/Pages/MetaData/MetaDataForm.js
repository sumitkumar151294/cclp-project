import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onGetMetaData, onPostMetaData, onPostMetaDataReset } from "../../Store/Slices/metaDataSlice";
//options of status
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];

const MetaDataForm = ({ metaData,setMetaData }) => {
  const dispatch = useDispatch();
  const [intialValue, setInitialValue] = useState({
    price: "",
    mrp: "",
    enabled: "",
    earnPoints: "",
    burnPoints: "",
  });
  // Translation labels
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  //to get meta data from redux
  const getMetaData = useSelector((state) => state.metaDataReducer);
  //to validate the form using Yup schema
  const validations = Yup.object().shape({
    enabled: Yup.string().required(status_required),
    price: Yup.string()
      .required("Price is required")
      .matches(/^[0-9]+$/, "Price must be a number"),
    mrp: Yup.string()
      .required("MRP is required")
      .matches(/^[0-9]+$/, "MRP must be a number"),
    earnPoints: Yup.string()
      .required("End Points is required")
      .matches(/^[0-9]*$/, "End Points must be a number"),
    burnPoints: Yup.string()
      .required("Burn Points is required")
      .matches(/^[0-9]*$/, "Burn Points must be a number"),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const linkedMetaData = {
        ...values,
        deleted: false,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: 6,
        sectionMasterId: 2,
        sectionContentMasterId: 2,
        linkedMasterId: 8,
        price: values?.price,
        mrp: values?.mrp,
        earnPoints: values?.earnPoints,
        burnPoints: values?.burnPoints,
        ...(metaData && { id: metaData.id }),
      };
      dispatch(onPostMetaData(linkedMetaData));
      setInitialValue({
        price: "",
        mrp: "",
        enabled: "",
        earnPoints: "",
        burnPoints: "",
      });
    }
  };
  // to prefilled form 
  useEffect(() => {
    if (metaData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(
        {...metaData,
        price: metaData?.price,
        mrp: metaData?.mrp,
        earnPoints: metaData.earnPoints,
        burnPoints: metaData.burnPoints,
        enabled:metaData?.enabled
      });
    }
  }, [metaData]);
  // to handle toast notifications based on meta data status
  useEffect(() => {
    if (getMetaData?.post_status_code === "201" || getMetaData?.post_status_code === "205") {
      toast.success(getMetaData.postMessage);
      setMetaData(null);
      dispatch(onGetMetaData());
      dispatch(onPostMetaDataReset());
    } else if (getMetaData?.post_status_code) {
      toast.error(getMetaData.postMessage);
      dispatch(onPostMetaDataReset());
    }
  }, [getMetaData]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{"Meta Data Form"}</h4>
              </div>
              <div className="card-body">
                {getMetaData?.isPostLoading ? (
                  <div style={{ height: "250px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="containers-fluid">
                    <Formik
                      initialValues={intialValue}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {"Price"}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="price"
                                className={`form-control ${
                                  errors.price && touched.price
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={"Enter Price"}
                              />
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {"MRP"}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="mrp"
                                className={`form-control ${
                                  errors.mrp && touched.mrp ? "is-invalid" : ""
                                }`}
                                placeholder={"Enter MRP"}
                              />
                              <ErrorMessage
                                name="mrp"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {"Earn Points"}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="earnPoints"
                                className={`form-control ${
                                  errors.earnPoints && touched.earnPoints
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={"Enter Earn Points"}
                              />
                              <ErrorMessage
                                name="earnPoints"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {"Burn Points"}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="burnPoints"
                                className={`form-control ${
                                  errors.burnPoints && touched.burnPoints
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={"Enter Burn Points"}
                              />
                              <ErrorMessage
                                name="burnPoints"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2 ">
                              <label>{status_label}</label>
                              <span className="text-danger">*</span>

                              <Field
                                name="enabled"
                                component={Dropdown}
                                options={statusOptions}
                                className={`form-select ${
                                  errors.enabled && touched.enabled
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
                                text={metaData ? update : submit}
                                end_icon="fa fa-arrow-right"
                                className="btn btn-primary  pad-aa mt-2"
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

export default MetaDataForm;
