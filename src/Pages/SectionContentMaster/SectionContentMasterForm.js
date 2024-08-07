/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { Link, useLocation } from "react-router-dom";

import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import {
  onGetSectionContentMaster,
  onPostSectionContentMaster,
  onPostSectionContentMasterReset,
  onUpdateSectionContentMaster,
} from "../../Store/Slices/sectionContentMasterSlice";
import {
  onPostuploadImage,
  onPostuploadImageReset,
  onPostuploadMobileImage,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";

const contentSourceTypeOptions = [
  { value: "Deal", label: "Deal" },
  { value: "Product", label: "Product" }
];
const SectionContentMasterForm = ({ sectionContentData,setSectionContentData }) => {
  const location = useLocation();

  const getSectiontContentMasterData = useSelector(
    (state) => state?.sectionContentMasterReducer
  );
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);

  const type = location?.state?.sectionType;
  const typeID = location?.state?.sectionId;
  const sectionLimit = location?.state?.sectionLimit;

  // get labels and placeholder from translation
  const section_content_master = GetTranslationData(
    "UIMasterAdmin",
    "section_content_master"
  );
  const content_source_type = GetTranslationData(
    "UIMasterAdmin",
    "content_source_type"
  );
  const upload_image_for_web = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_web"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const upload_image_for_phone = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_phone"
  );
  const call_to_action = GetTranslationData(
    "UIMasterAdmin",
    "content_source_type"
  );
  const call_to_action_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_web"
  );
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const displayOrderPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayOrderPlaceholder"
  );
  const text_label = GetTranslationData("UIMasterAdmin", "text_label");
  const text_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "text_placeholder"
  );

  const [intialValue, setInitialValue] = useState({
    webImage: "",
    mobImage: "",
    cta: "",
    displayOrder: "",
    text: "",
    contentSourceType: "",
    segmentId: "",
  });
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    webImage: Yup.lazy(value =>
     ( type==="Banner" ||   type==="SupportingBanner" ||   type==="CustomerBenefits" )? Yup.string().required("Web Image is required") : Yup.string()
    ),
    mobImage: Yup.lazy(value =>
     ( type==="Banner" || type==="CustomerBenefits" )? Yup.string().required("Mobile Image is required") : Yup.string()
    ),
    displayOrder: Yup.string().required("Display Order is required"),
  });

  const displayLimit =
    getSectiontContentMasterData?.getSectionContentMasterData?.filter(
      (sectionContent) => sectionContent?.sectionMasterId === typeID
    )?.length === sectionLimit;

  const handleSubmit = (values) => {
    if (values) {
      if (
        typeof values.webImage === "object" &&
        typeof values.mobImage === "object"
      ) {
        dispatch(onPostuploadImage(values.webImage));
        dispatch(onPostuploadMobileImage(values.mobImage));
        setValues(values);
      }else if(!values.webImage && !values.mobImage){
        const sectionContentMasteData = {
          webImage: values.webImage,
          mobImage: values.mobImage,
          clientId: 4,
          deleted: false,
          sectionMasterId: typeID,
          displayOrder: JSON.stringify(values?.displayOrder),
          linkedMasterId: values?.linkedMasterId || null,
          segmentId: values?.segmentId || null,
          contentSourceType: "",
          cta: values?.cta,
          text: values?.text || "",
        };
        dispatch(onPostSectionContentMaster(sectionContentMasteData))
      } else {
        const sectionContentMasteData = {
          webImage: values.webImage,
          mobImage: values.mobImage,
          clientId: 4,
          deleted: false,
          sectionMasterId: typeID,
          displayOrder: JSON.stringify(values?.displayOrder),
          linkedMasterId: values?.linkedMasterId || null,
          segmentId: values?.segmentId || null,
          contentSourceType: "",
          cta: values?.cta,
          text: values?.text || "",
          id: values.id,
        };
        dispatch(onUpdateSectionContentMaster(sectionContentMasteData));
      }
    }
  };
  useEffect(() => {
    if (
      uploadImage?.postMobileStatusCode == "201" &&
      uploadImage?.post_status_code == "201"
    ) {
      const sectionContentMasteData = {
        webImage: getwebImage,
        mobImage: getmobImage,
        clientId: 4,
        deleted: false,
        sectionMasterId: typeID,
        displayOrder: JSON.stringify(values?.displayOrder),
        linkedMasterId: values?.linkedMasterId || null,
        segmentId: values?.segmentId || null,
        contentSourceType: values.contentSourceType || "",
        cta: values?.cta,
        text: values?.text || "",
        ...(sectionContentData && { id: values.id }),
      };
      dispatch(onPostSectionContentMaster(sectionContentMasteData));
      setInitialValue("");
    }
  }, [uploadImage, values]);
  const handleImageChange = (setFieldValue, event, isMobile) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (isMobile) {
      setFieldValue("mobImage", formData);
    } else {
      setFieldValue("webImage", formData);
    }
  };
  useEffect(() => {
    if (getSectiontContentMasterData?.post_status_code === "201") {
      debugger
      toast.success(getSectiontContentMasterData?.postMessage);
      setSectionContentData("")
      dispatch(onGetSectionContentMaster());
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostSectionContentMasterReset());
    } else if (getSectiontContentMasterData?.update_status_code == "205") {
      setSectionContentData("")
    } else if (getSectiontContentMasterData?.post_status_code) {
      toast.error(getSectiontContentMasterData?.postMessage);
      setSectionContentData("")
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostSectionContentMasterReset());
    }
  }, [getSectiontContentMasterData]);
  useEffect(() => {
    if (displayLimit) {
      toast.error("Maximum Display Limit Reached");
    }
  }, []);

  useEffect(() => {
    debugger
    if (sectionContentData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(sectionContentData);
    }
  }, [sectionContentData]);
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Section Content Master</h4>
                <Link to="/sectionMaster">
                  <button className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> Back
                  </button>
                </Link>
              </div>
              <div className="card-body">
                {getSectiontContentMasterData?.isPostLoading ||
                (sectionContentData &&
                  getSectiontContentMasterData?.isUpdateLoading) ? (
                  <div style={{ height: "200px" }}>
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
                      {({ errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            {(type === "SpecialSection" )&& (
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
                                />
                                <ErrorMessage
                                  name="contentSourceType"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {(type === "SpecialSection") && (
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
                              </div>
                            )}

{(type === "Banner" || type==="CustomerBenefits" ||   type==="SupportingBanner") && <div className="col-sm-4 form-group mb-4">
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
                                  handleImageChange(setFieldValue, event, false)
                                }
                                disabled={displayLimit}
                              />
                              <ErrorMessage
                                name="webImage"
                                component="div"
                                className="error-message"
                              />
                            </div>}
                            {(type === "Banner" || type==="CustomerBenefits" ||   type==="SupportingBanner")&&  <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Phone
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="mobImage"
                                className={`form-control ${
                                  errors.mobImage && touched.mobImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event, true)
                                }
                                disabled={displayLimit}
                              />
                              <ErrorMessage
                                name="mobImage"
                                component="div"
                                className="error-message"
                              />
                            </div>}
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
                                disabled={displayLimit}
                              />
                              <ErrorMessage
                                name="displayOrder"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2 ">
                              <label>Call To Action</label>
                              <Field
                                type="text"
                                name="cta"
                                className={`form-control ${
                                  errors.cta && touched.cta ? "is-invalid" : ""
                                }`}
                                placeholder="Enter Call To Action"
                                disabled={displayLimit}
                              />
                            </div>
                            {type === "SpecialSection" && (
                              <div className="col-sm-4 form-group mb-2">
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
                                  disabled={displayLimit}
                                />
                              </div>
                            )}
                            {(type === "UnlockStaticCard" || type === "CustomerBenefits" ||   type==="SupportingBanner")&& (
                              <div className="col-sm-9 mt-2">
                                <label>Text</label>
                                <Field
                                  component={HtmlEditor}
                                  name="text"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Text"
                                  disabled={displayLimit}
                                />
                              </div>
                            )}
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
