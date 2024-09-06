/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {
  onGetsectionMaster,
  onPostsectionMaster,
  onPostsectionMasterReset,
} from "../../Store/Slices/sectionMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { ClientId } from "../../Utility/Utility";

const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];

const SectionMasterForm = ({ sectionData, setSectionData,edit,setEdit }) => {
  const clientId = ClientId();
  const [showFields, setShowFields] = useState("");
  const sectionMasterData = useSelector((state) => state.sectionMasterReducer);
  const [intialValue, setInitialValue] = useState({
    sectionName: "",
    sectionType: "",
    enabled: "",
    displayOrder: "",
    displayLimit: "",
    text: "",
    claimLimit: "",
    pointToClaim: "",
    noOfPointsToClaim: "",
    segmentId: "",
    cta: "",
  });
  // Translation labels
  const section_master = GetTranslationData("UIMasterAdmin", "section_master");
  const section_name = GetTranslationData("UIMasterAdmin", "section_name");
  const points_to_claim_label = GetTranslationData(
    "UIMasterAdmin",
    "points_to_claim_label"
  );
  const section_type = GetTranslationData("UIMasterAdmin", "section_type");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const display_limit = GetTranslationData("UIMasterAdmin", "display_limit");
  const claim_limit = GetTranslationData("UIMasterAdmin", "claim_limit");
  const text_label = GetTranslationData("UIMasterAdmin", "text_label");
  const no_Of_Points_To_Claim = GetTranslationData(
    "UIMasterAdmin",
    "no_Of_Points_To_Claim"
  );
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const sectionNamePlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "sectionMasterPlaceholder"
  );
  const section_name_required = GetTranslationData(
    "UIMasterAdmin",
    "section_name_required"
  );
  const section_type_required = GetTranslationData(
    "UIMasterAdmin",
    "section_type_required"
  );
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const display_order_required = GetTranslationData(
    "UIMasterAdmin",
    "display_order_required"
  );
  const displayOrderPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayOrderPlaceholder"
  );
  const display_limit_required = GetTranslationData(
    "UIMasterAdmin",
    "display_limit_required"
  );
  const display_limit_must_number = GetTranslationData(
    "UIMasterAdmin",
    "display_limit_must_number"
  );
  const claim_limit_must_number = GetTranslationData(
    "UIMasterAdmin",
    "claim_limit_must_number"
  );
  const number_of_points_must_number = GetTranslationData(
    "UIMasterAdmin",
    "number_of_points_must_number"
  );
  const display_must_number = GetTranslationData(
    "UIMasterAdmin",
    "display_must_number"
  );
  const sectionTypeOptions = [
    { value: "Promo Message", label: "Promo Message" },
    { value: "Promo Banner", label: "Promo Banner" },
    { value: "Customer Menu", label: "Customer Menu" },
    { value: "Special Cart Banner", label: "Special Cart Banner" },
    { value: "Supporting Banner", label: "Supporting Banner" },
    { value: "Special Section", label: "Special Section" },
    { value: "Unlock Deals", label: "Unlock Deals" },
  ];
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    sectionName: Yup.string().required(section_name_required),
    sectionType: Yup.string().required(section_type_required),
    enabled: Yup.string().required(status_required),
    displayOrder: Yup.string()
      .required(display_order_required)
      .matches(/^[0-9]+$/, display_must_number),
    displayLimit: Yup.string()
      .required(display_limit_required)
      .matches(/^[0-9]+$/, display_limit_must_number),
    claimLimit: Yup.string()
      .nullable() // Allows the value to be null
      .matches(/^[0-9]*$/, claim_limit_must_number),
    noOfPointsToClaim: Yup.string()
      .nullable()
      .matches(/^[0-9]*$/, number_of_points_must_number),
    text: Yup.lazy(() =>
   (   showFields && showFields !== "Promo Message" && showFields !== "Supporting Banner")
        ? Yup.string().required("Text is required")
        : Yup.string().nullable()
    ),
    cta: Yup.lazy(() =>
      showFields && showFields === "Special Section"
        ? Yup.string().required("Call To Action is required")
        : Yup.string().nullable()
    ),
    segmentId: Yup.lazy(() =>
      showFields &&
      (showFields === "Special Section" || showFields === "Unlock Deals")
        ? Yup.string().required("Segement is required")
        : Yup.string().nullable()
    ),
    claimLimit: Yup.lazy(() =>
      showFields && showFields === "Unlock Deals"
        ? Yup.string().required("Claim limit is required")
        : Yup.string().nullable()
    ),
  });
  const resetState = {
    sectionName: "",
    sectionType: "",
    enabled: "",
    displayOrder: "",
    displayLimit: "",
    text: "",
    claimLimit: "",
    pointToClaim: "",
    noOfPointsToClaim: "",
    segmentId: "",
    cta: "",
  };
  const getCustomerSegemtData = useSelector(
    (state) => state.customerSegmentReducer?.data
  );
  const SegmentOptions = getCustomerSegemtData?.map((segementData) => ({
    value: segementData.id,
    label: segementData?.name?.substring(0, 18) + "...",
  }));
  const handleSubmit = (values) => {
    if (values) {
      const SectionformData = {
        ...values,
        deleted: false,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: clientId,
        displayOrder: values?.displayOrder,
        displayLimit: values.displayLimit,
        claimLimit: values?.claimLimit || null,
        segmentId: values?.segmentId || null,
        noOfPointsToClaim: parseInt(values?.noOfPointsToClaim) || null,
        pointToClaim:
          typeof values?.pointToClaim === "boolean"
            ? values.pointToClaim
            : values?.pointToClaim === "true",
        ...(sectionData && { id: sectionData.id }),
      };
      dispatch(onPostsectionMaster(SectionformData));
      setInitialValue(resetState);
    }
  };

  useEffect(() => {
    if (
      sectionMasterData?.post_status_code === "200" ||
      sectionMasterData?.post_status_code === "204" ||
      sectionMasterData?.post_status_code === "205"
    ) {
      setEdit(false)
      setSectionData(null);
      setShowFields(false);
      toast.success(sectionMasterData.postMessage);
      dispatch(onGetsectionMaster());
      dispatch(onPostsectionMasterReset());
    } else if (sectionMasterData?.post_status_code) {
      toast.error(sectionMasterData.postMessage);
      dispatch(onPostsectionMasterReset());
    }
  }, [sectionMasterData]);
  useEffect(() => {
    if (sectionData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(sectionData);
      setShowFields(sectionData?.sectionType);
    }
  }, [sectionData]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{section_master}</h4>
              </div>
              <div className="card-body">
                {(!edit && sectionMasterData?.isPostLoading) ? (
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
                      {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {section_name}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="sectionName"
                                className={`form-control ${
                                  errors.sectionName && touched.sectionName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={sectionNamePlaceholder}
                              />
                              <ErrorMessage
                                name="sectionName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {section_type}
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="sectionType"
                                component={Dropdown}
                                options={sectionTypeOptions}
                                className={`form-select ${
                                  errors.sectionType && touched.sectionType
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  setShowFields(e || false);
                                  if (e === "Promo Message") {
                                    setFieldValue("text", "");
                                  }
                                  if (e !== "Special Section") {
                                    setFieldValue("cta", "");
                                  }
                                  if (e !== "Unlock Deals") {
                                    setFieldValue("claimLimit", "");
                                    setFieldValue("pointToClaim",false)
                                    setFieldValue("pointToClaim",false)
                                    setFieldValue("noOfPointsToClaim","")
                                  }
                                  if (e !== "Special Section" &&  e !=="Unlock Deals" ) {
                                    setFieldValue("segmentId", "");
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="sectionType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {display_order}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="displayOrder"
                                className={`form-control ${
                                  errors.displayOrder && touched.displayOrder
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={displayOrderPlaceholder}
                              />
                              <ErrorMessage
                                name="displayOrder"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {display_limit}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="displayLimit"
                                className={`form-control ${
                                  errors.displayLimit && touched.displayLimit
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Display Limit"
                              />
                              <ErrorMessage
                                name="displayLimit"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            {(showFields === "Promo Banner" ||
                              showFields === "Customer Menu" ||
                              showFields === "Special Cart Banner" ||
                              showFields === "Supporting Banner" ||
                              showFields === "Special Section" ||
                              showFields === "Unlock Deals") && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{text_label}</label>
                              {showFields!=="Supporting Banner" && <span className="text-danger">*</span>}
                                <Field
                                  type="text"
                                  name="text"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Text "
                                />
                                <ErrorMessage
                                  name="text"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {showFields === "Unlock Deals" && (
                              <div className="col-sm-4 form-group mb-2 mt-1">
                                <label>{claim_limit}</label>
                                <Field
                                  type="text"
                                  name="claimLimit"
                                  className={`form-control ${
                                    errors.claimLimit && touched.claimLimit
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
                            )}
                            {showFields === "Unlock Deals" && (
                              <div className="col-lg-4 py-4">
                                <div className="form-check  mb-2 padd mt-2">
                                  <Field
                                    type="checkbox"
                                    className="form-check-input"
                                    name="pointToClaim"
                                  />
                                  <label className="px-1">
                                    {points_to_claim_label}
                                  </label>
                                </div>
                              </div>
                            )}
                            {showFields === "Unlock Deals" && (
                              <div className="col-sm-4 form-group mb-1">
                                <label>{no_Of_Points_To_Claim}</label>
                                <Field
                                  type="text"
                                  name="noOfPointsToClaim"
                                  className={`form-control ${
                                    errors.noOfPointsToClaim &&
                                    touched.noOfPointsToClaim
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter No Of Points To Claim"
                                  disabled={!values.pointToClaim}
                                />
                                <ErrorMessage
                                  name="noOfPointsToClaim"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {(showFields === "Special Section" ||
                              showFields === "Unlock Deals") && (
                              <div className="col-sm-4 form-group mb-2 ">
                                <label>{segment_label}</label>
                                <span className="text-danger">*</span>

                                <Field
                                  name="segmentId"
                                  component={Dropdown}
                                  options={SegmentOptions}
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
                              </div>
                            )}

                            {showFields === "Special Section" && (
                              <div className="col-sm-4 form-group mb-2 mt-1">
                                <label>{"Call To Action"}</label>
                                <Field
                                  type="text"
                                  name="cta"
                                  className={`form-control ${
                                    errors.cta && touched.cta
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Claim Limit"
                                />
                                <ErrorMessage
                                  name="cta"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}

                            <div className="col-sm-4 form-group mb-4">
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
                                text={sectionData ? update : submit}
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

export default SectionMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
