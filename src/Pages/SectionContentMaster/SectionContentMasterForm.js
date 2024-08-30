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
} from "../../Store/Slices/sectionContentMasterSlice";
import {
  onPostuploadImage,
  onPostuploadImageReset,
  onPostuploadMobileImage,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";
import { onUpdatesectionMasterReset } from "../../Store/Slices/sectionMasterSlice";

const contentSourceTypeOptions = [
  { value: "Deal", label: "Deal" },
  { value: "Product", label: "Product" },
];
const SectionContentMasterForm = ({ sectionContentData }) => {
  const [mobile, setMobile] = useState(false);
  const [web, setWeb] = useState(false);
  const section_content_master = GetTranslationData(
    "UIMasterAdmin",
    "section_content_master"
  );
  const back_label = GetTranslationData("UIMasterAdmin", "back_label");
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
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const call_to_action_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_placeholder"
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
  const display_limit = GetTranslationData("UIMasterAdmin", "display_limit");
  const displayLimitPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayLimitPlaceholder"
  );
  const display_order_required = GetTranslationData(
    "UIMasterAdmin",
    "display_order_required"
  );
  const mobile_image_required = GetTranslationData(
    "UIMasterAdmin",
    "mobile_image_required"
  );
  const web_image_required = GetTranslationData(
    "UIMasterAdmin",
    "web_image_required"
  );
  const max_display_limit_reached = GetTranslationData(
    "UIMasterAdmin",
    "max_display_limit_reached"
  );
  const location = useLocation();
  const getDealData = useSelector((state) => state.dealReducer?.getDealData);
  const dealOptions = getDealData?.filter(dealData=>dealData?.dealType==="UnlockDeals").map((dealCategory) => ({
    value: dealCategory.id,
    label: dealCategory.name,
  }));
  const getSectiontContentMasterData = useSelector(
    (state) => state?.sectionContentMasterReducer
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData("UIMasterAdmin", "status_required");
  // options for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);

  const type = location?.state?.sectionType;
  const sectionName = location?.state?.sectionName;
  const typeID = location?.state?.sectionId;
  const sectionLimit = location?.state?.sectionLimit;
  // get labels and placeholder from translation
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    mobImage: "",
    cta: "",
    displayOrder: "",
    text: "",
    contentSourceType: "",
    segmentId: "",
    textElementFlag:"",
    textbgColor:"",
    enabled:"",
    isOverrideMetadata:""
  });
  const [showFeild, setShowFields] = useState("");
    const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  const validations = Yup.object().shape({
    mobImage: Yup.lazy(() =>
  type !== "UnlockStaticCard"
        ? Yup.string().required(mobile_image_required)
        : Yup.string()
    ),
    displayOrder: Yup.string()
      .required(display_order_required)
      .matches(/^[0-9]+$/, "Display Order must be a number"),
    text: Yup.lazy(() =>
     ( type === "UnlockStaticCard" || type === "SpecialBannerOne" || type==="SupportingBannerBottom")
        ? Yup.string()
            .required("Text is Required")
            .test(
              "no-empty-html",
              "Text is Required",
              (value) => value !== "<p><br></p>"
            )
        : Yup.string().nullable()
    ),
    enabled: Yup.string().required(status_required),

  });

  const displayLimit =
    getSectiontContentMasterData?.getSectionContentMasterData?.filter(
      (sectionContent) => sectionContent?.sectionMasterId === typeID
    )?.length === sectionLimit;

  const handleSubmit = (values) => {
    if (!values) return;
    const { webImage, mobImage } = values;
    if (typeof webImage === "object" || typeof mobImage === "object") {
      if (typeof webImage === "object") {
        dispatch(onPostuploadImage(webImage));
        if (typeof mobImage !== "object") setWeb(true);
      }
      if (typeof mobImage === "object") {
        dispatch(onPostuploadMobileImage(mobImage));
        if (typeof webImage !== "object") setMobile(true);
      }
    } else {
      const sectionContentMasteData = {
        ...values,
        enabled: typeof values?.enabled === 'boolean' ? values.enabled : values?.enabled === 'true',
        textElementFlag: typeof values?.textElementFlag === 'boolean' ? values.textElementFlag : values?.textElementFlag === 'true',
        webImage: webImage || "",
        mobImage: mobImage || "",
        clientId: 6,
        deleted: false,
        sectionMasterId: typeID,
        linkedMasterId: [2],
        segmentId: values?.segmentId || null,
        isOverrideMetadata:
        typeof values?.isOverrideMetadata === "boolean"
          ? values.isOverrideMetadata
          : values?.isOverrideMetadata === "true",
        ...(sectionContentData && { id: values.id }),
      };

      dispatch(onPostSectionContentMaster(sectionContentMasteData));
    }

    setValues(values);
  };

  useEffect(() => {
    if (uploadImage) {
      const   sectionContentMasteData = {
        ...values,
        enabled: typeof values?.enabled === 'boolean' ? values.enabled : values?.enabled === 'true',
        textElementFlag: typeof values?.textElementFlag === 'boolean' ? values.textElementFlag : values?.textElementFlag === 'true',
        webImage: sectionContentData?.webImage,
        mobImage: sectionContentData?.mobImage,
        clientId: 6,
        deleted: false,
        sectionMasterId: typeID,
        linkedMasterId: [4],
        isOverrideMetadata:
        typeof values?.isOverrideMetadata === "boolean"
          ? values.isOverrideMetadata
          : values?.isOverrideMetadata === "true",
        segmentId: values?.segmentId || null,
        ...(sectionContentData && { id: values?.id }),

      };
      let shouldDispatch = false;
      if (
        uploadImage.postMobileStatusCode === "201" &&
        uploadImage.post_status_code === "201"
      ) {
        sectionContentMasteData.webImage = getwebImage;
        sectionContentMasteData.mobImage = getmobImage;
        shouldDispatch = true;
      } else if (uploadImage.post_status_code === "201" && web) {
        sectionContentMasteData.webImage = getwebImage;
        shouldDispatch = true;
        setWeb(false);
      } else if (uploadImage.postMobileStatusCode === "201" && mobile) {
        sectionContentMasteData.mobImage = getmobImage;
        shouldDispatch = true;
        setMobile(false);
      }
      if (shouldDispatch) {
        dispatch(onPostSectionContentMaster(sectionContentMasteData));
      }
    }
  }, [uploadImage, values, web, mobile]);

  const handleImageChange = (setFieldValue, event, isMobile) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (isMobile) {
      setFieldValue("mobImage", formData);
    } else {
      setFieldValue("webImage", formData);

    }}
  useEffect(() => {
    if (getSectiontContentMasterData?.post_status_code === "201") {
      toast.success(getSectiontContentMasterData?.postMessage);
      dispatch(onGetSectionContentMaster());
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostSectionContentMasterReset());
    } else if (getSectiontContentMasterData?.post_status_code === "205") {
      toast.success(getSectiontContentMasterData?.postMessage);
      dispatch(onGetSectionContentMaster());
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onUpdatesectionMasterReset());
      dispatch(onPostSectionContentMasterReset());
    }else if(getSectiontContentMasterData?.post_status_code){
      toast.error(getSectiontContentMasterData?.postMessage);
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostSectionContentMasterReset());
    }
  }, [getSectiontContentMasterData]);
  useEffect(() => {
    if (displayLimit) {
      toast.error(max_display_limit_reached);
    }
  }, []);

  useEffect(() => {
    if (sectionContentData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(sectionContentData);
    }
  }, [sectionContentData]);
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  {section_content_master} {type && `(Type:${type}, Name:${sectionName} )`}
                </h4>
                <Link to="/sectionMaster">
                  <button className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> {back_label}
                  </button>
                </Link>
              </div>
              <div className="card-body">
                {getSectiontContentMasterData?.isPostLoading ||
                (sectionContentData &&
                  getSectiontContentMasterData?.isUpdateLoading) ||
                uploadImage?.isPostLoading ? (
                  <div style={{ height: "200px" }}>
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
                      {({ errors, touched,values, setFieldValue }) => (
                        <Form>
                          <div className="row">

                            {(type !== "UnlockStaticCard") && (
                              <div className="col-sm-4 form-group mb-2">
                                <label>
                                  Upload Image For Phone
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                accept=".jpg, .jpeg, .png, .webp .svg"
                                  type="file"
                                  name="mobImage"
                                  className={`form-control ${
                                    errors.mobImage && touched.mobImage
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  onChange={(event) =>
                                    handleImageChange(
                                      setFieldValue,
                                      event,
                                      true
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name="mobImage"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                             {(type !== "UnlockStaticCard" ) && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>
                                  {upload_image_for_web}
                                </label>
                                <input
                                accept=".jpg, .jpeg, .png, .webp .svg"
                                  type="file"
                                  name="webImage"
                                  className={`form-control ${
                                    errors.webImage && touched.webImage
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  onChange={(event) =>
                                    handleImageChange(
                                      setFieldValue,
                                      event,
                                      false
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name="webImage"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {type === "SpecialSection" && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{content_source_type}</label>

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
                                    setShowFields(e);
                                  }}
                                />

                                <ErrorMessage
                                  name="contentSourceType"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {(showFeild === "Deal" ||
                              showFeild === "Product") && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>
                                  {showFeild === "Deal" ? "Deal" : "Product"}
                                </label>
                                <Field
                                  name="linkedMasterId"
                                  component={Dropdown}
                                  options={showFeild === "Deal" ? dealOptions : dealOptions}
                                  className={`form-select ${
                                    errors.linkedMasterId &&
                                    touched.linkedMasterId
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
                            )}
                              { (showFeild === "Product" && values.linkedMasterId)&& (
                            <div className="col-lg-4 py-4">
                                <div className="form-check  mb-2 padd mt-2">
                                  <Field
                                    type="checkbox"
                                    className="form-check-input"
                                    name="isOverrideMetadata"

                                  />
                                  <label className="px-1">
                                    {"is Over-ride MetaData"}
                                  </label>
                                </div>
                              </div>)}
                            {type === "SpecialSection" && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{segment_label}</label>
                                <Field
                                  name="segmentId"
                                  component={Dropdown}

                                  className={`form-select ${
                                    errors.segmentId && touched.segmentId
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  onChange={(e) => {
                                    setShowFields(e);
                                  }}
                                />

                                <ErrorMessage
                                  name="segmentId"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {(type === "UnlockStaticCard" ) && (
                              <div className="col-sm-9 mb-4">
                                <label>{"Text"}</label>
                                <Field
                                  component={HtmlEditor}
                                  name="text"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={displayLimitPlaceholder}
                                />
                                <ErrorMessage
                                  name="text"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
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
                            {(type !== "UnlockStaticCard" ) && (
                            <div className="col-sm-4 form-group mb-4">
                              <label>{call_to_action}</label>
                              <Field
                                type="text"
                                name="cta"
                                className={`form-control ${
                                  errors.cta && touched.cta ? "is-invalid" : ""
                                }`}
                                placeholder={call_to_action_placeholder}
                              />
                            </div>)}
                            {type === "CustomerBenefits"   && (
                              <div className="col-sm-4 form-group mb-2">
                                <label>{text_label}</label>
                                <Field
                                  type="text"
                                  name="text"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={text_placeholder}
                                />
                              </div>
                            )}
                              {type === "CustomerBenefits" && (
                            <div className="col-lg-4 py-4">
                                <div className="form-check  mb-2 padd mt-2">
                                  <Field
                                    type="checkbox"
                                    className="form-check-input"
                                    name="textElementFlag"

                                  />
                                  <label className="px-1">
                                    {"Text Element Required"}
                                  </label>
                                </div>
                              </div>)}

                              {values?.textElementFlag && (
                              <div className="col-sm-3 form-group mb-2">
                                <label>{"Text Font Color"}</label>
                                <Field
                                  type="color"
                                  name="textColor"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                            )}
                              {values?.textElementFlag && (
                              <div className="col-sm-3 form-group mb-2">
                                <label>{"Text Background Color"}</label>
                                <Field
                                  type="color"
                                  name="textbgColor"
                                  className={`form-control ${
                                    errors.text && touched.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                            )}
                                       {values?.textElementFlag && (
                                <div className="col-sm-4 form-group mb-2">
                                <label>
                                  Upload Image For Text Element
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                accept=".jpg, .jpeg, .png, .webp .svg"
                                  type="file"
                                  name="textIcon"
                                  className={`form-control ${
                                    errors.textIcon && touched.textIcon
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  onChange={(event) =>
                                    handleImageChange(
                                      setFieldValue,
                                      event,
                                      true
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name="textIcon"
                                  component="div"
                                  className="error-message"
                                />
                              </div>)}
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
                            <div className="col-sm-12 form-group mb-0 ">
                              <Button
                                text={sectionContentData ? update : submit}
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

export default SectionContentMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
