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
  onUpdatesectionMaster,
} from "../../Store/Slices/sectionMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const segmentOptions = [
  { value: 1, label: "Demo" },
  { value: 2, label: "Demo1" },
];
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];

const SectionMasterForm = ({ sectionData }) => {
  const [showFields, setShowFields] = useState(false);
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
    noOfpointToClaim: "",
    segmentId: "",
  });
  // Translation labels
  const section_master = GetTranslationData("UIMasterAdmin", "section_master");

  const section_name = GetTranslationData("UIMasterAdmin", "section_name");
  const points_to_claim_label = GetTranslationData("UIMasterAdmin", "points_to_claim_label");
  const section_type = GetTranslationData("UIMasterAdmin", "section_type");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const display_limit = GetTranslationData("UIMasterAdmin", "display_limit");
  const claim_limit = GetTranslationData("UIMasterAdmin", "claim_limit");
  const text_label = GetTranslationData("UIMasterAdmin", "text_label");
  const no_Of_Points_To_Claim = GetTranslationData("UIMasterAdmin", "no_Of_Points_To_Claim");
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const sectionNamePlaceholder = GetTranslationData("UIMasterAdmin", "sectionMasterPlaceholder");
  const section_name_required = GetTranslationData("UIMasterAdmin", "section_name_required");
  const section_type_required = GetTranslationData("UIMasterAdmin", "section_type_required");
  const status_required = GetTranslationData("UIMasterAdmin", "status_required");
  const sectionTypeOptions = [
    { value: "Banner", label: "Banner" },
    { value: "UnlockStaticCard", label: "Unlock Static Card" },
    { value: "CustomerBenefits", label: "Customer Benefits" },
    { value: "SupportingBanner", label: "Supporting Banner" },
    { value: "SpecialSection", label: "Special Section" },
  ];
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    sectionName: Yup.string().required(section_name_required),
    sectionType: Yup.string().required(section_type_required),
    enabled: Yup.string().required(status_required),
    displayOrder: Yup.string().required("Display Order is required"),
    displayLimit: Yup.string().required("Display Limit is required"),
  });

  const handleSubmit = (values) => {
    if (values) {
      const SectionformData = {
        ...values,
        deleted: false,
        enabled: typeof values?.enabled === 'boolean' ? values.enabled : values?.enabled === 'true',
        clientId: 4,
        displayOrder:
          typeof values?.displayOrder === "string"
            ? values.displayOrder
            : JSON.stringify(values?.displayOrder),
        displayLimit:
          typeof values?.displayLimit === "string"
            ? values.displayLimit
            : JSON.stringify(values?.displayLimit),
        claimLimit: values?.claimLimit ? values?.claimLimit : null,
        segmentId: values?.segmentId ? values?.segmentId : null,
        noOfpointToClaim: values?.noOfpointToClaim
          ? values?.noOfpointToClaim
          : null,
        pointToClaim: values?.pointToClaim ? values?.pointToClaim : false,
        ...(sectionData && { id: sectionData.id }),
      };

      if (sectionData) {
        dispatch(onUpdatesectionMaster(SectionformData));
      } else {
        dispatch(onPostsectionMaster(SectionformData));
      }
      setShowFields(false);
      setInitialValue({
        sectionName: "",
        sectionType: "",
        enabled: "",
        displayOrder: "",
        displayLimit: "",
        text: "",
        claimLimit: "",
        pointToClaim: "",
        noOfpointToClaim: "",
        segmentId: "",
      });
    }
  };

  useEffect(() => {
    if (sectionMasterData?.post_status_code === "201") {
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
    }

  }, [sectionData]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{section_master}</h4>
              </div>
              <div className="card-body">
                {(sectionMasterData?.isPostLoading || (sectionData && sectionMasterData?.isUpdateLoading)) ? (
                  <div style={{ height: "250px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <Formik
                      initialValues={intialValue}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched, values }) => (
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
                                className={`form-control ${errors.sectionName && touched.sectionName
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
                                className={`form-select ${errors.sectionType && touched.sectionType
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                onChange={(e) => {
                                  setShowFields(e === "SpecialSection");
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
                             {display_limit}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="displayLimit"
                                className={`form-control ${errors.displayLimit && touched.displayLimit
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
                            {showFields && (
                              <div className="col-sm-4 form-group mb-2 mt-1">
                                <label>{claim_limit}</label>
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
                            )}
                            {showFields && (
                              <div className="col-sm-4 form-group mb-2 mt-1">
                                <label>{text_label}</label>
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
                            )}
                            {showFields && (
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
                            {values.pointToClaim && showFields && (
                              <div className="col-sm-4 form-group mb-1">
                                <label>{no_Of_Points_To_Claim}</label>
                                <Field
                                  type="number"
                                  name="noOfpointToClaim"
                                  className={`form-control ${errors.noOfpointToClaim &&
                                      touched.noOfpointToClaim
                                      ? "is-invalid"
                                      : ""
                                    }`}
                                  placeholder="Enter No Of Points To Claim"
                                />
                                <ErrorMessage
                                  name="noOfpointToClaim"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {showFields && (
                              <div className="col-sm-4 form-group mb-2 ">
                                <label>{segment_label}</label>

                                <Field
                                  name="segmentId"
                                  component={Dropdown}
                                  options={segmentOptions}
                                  className={`form-select ${errors.segmentId && touched.segmentId
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
                            <div className="col-sm-4 form-group mb-2 ">
                              <label>{status_label}</label>
                              <span className="text-danger">*</span>

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
                                text={sectionData ? update : submit}
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
