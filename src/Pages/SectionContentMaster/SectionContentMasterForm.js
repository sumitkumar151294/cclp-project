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
  onPostuploadElementImage,
  onPostuploadElementImageReset,
  onPostuploadImage,
  onPostuploadImageReset,
  onPostuploadMobileImage,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";
import { ClientId } from "../../Utility/Utility";

const contentSourceTypeOptions = [
  { value: "Deal", label: "Deal" },
  { value: "Product", label: "Product" },
];
const SectionContentMasterForm = ({
  sectionContentData,
  setSectionContentData,
}) => {
  const clientId = ClientId();
  const [mobile, setMobile] = useState(false);
  const [textFeilds, setTextFeilds] = useState(false);
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

  const getCustomerSegemtData = useSelector(
    (state) => state.customerSegmentReducer?.data
  );
  const SegmentOptions = getCustomerSegemtData?.map((segementData) => ({
    value: segementData.id,
    label: segementData?.name?.substring(0, 18) + "...",
  }));
  const getSectiontContentMasterData = useSelector(
    (state) => state?.sectionContentMasterReducer
  );
  const text_required = GetTranslationData("UIMasterAdmin", "text_required");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const display_must_number = GetTranslationData(
    "UIMasterAdmin",
    "display_must_number"
  );
  // options for status
  const TextstatusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
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
  const getTextIcon = useSelector(
    (state) => state.uploadReducer?.postuploadElementImageData
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
    textElementFlag: "",
    textbgColor: "",
    enabled: "",
    isOverrideMetadata: "",
    textForElement: "",
    textElementStatus: "",
    textColor: "",
    textIcon: "",
    linkedMasterId: "",
  });
  const reset = {
    webImage: "",
    mobImage: "",
    cta: "",
    displayOrder: "",
    text: "",
    contentSourceType: "",
    segmentId: "",
    textElementFlag: "",
    textbgColor: "",
    enabled: "",
    isOverrideMetadata: "",
    textColor: "",
    textElementStatus: "",
    textForElement: "",
    textIcon: "",
    linkedMasterId: "",
  };
  const dealOptions = (
    type === "Unlock Deals"
      ? getDealData?.filter((deal) => deal?.dealType === "UnlockDeals")
      : getDealData
  )?.map((deal) => ({
    value: deal.id,
    label: deal.name,
  }));
  const [showFeild, setShowFields] = useState("");
  const [textIcon, setTextIcon] = useState(false);
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    displayOrder: Yup.string()
      .required(display_order_required)
      .matches(/^[0-9]+$/, "Display Order Must be a number"),
    text: Yup.lazy(() =>
      type === "Promo Message"
        ? Yup.string()
            .required(text_required)
            .test(
              "no-empty-html",
              text_required,
              (value) => value !== "<p><br></p>"
            )
        : Yup.string().nullable()
    ),
    mobImage: Yup.lazy(() =>
      type !== "Promo Message"
        ? Yup.string().required("Mobile Image is required")
        : Yup.string().nullable()
    ),
    cta: Yup.lazy(() =>
      type !== "Promo Message"
        ? Yup.string().required("Call to Action is required")
        : Yup.string().nullable()
    ),
    text: Yup.lazy(() =>
      type !== "Promo Banner" &&
      type !== "Supporting Banner" &&
      type !== "Special Cart Banner" &&
      type !== "Special Section" &&
      type !== "Unlock Deals"
        ? Yup.string().required("Text is required")
        : Yup.string().nullable()
    ),
    enabled: Yup.string().required(status_required),
    segmentId: Yup.lazy(() =>
      type === "Unlock Deals" || type === "Special Section"
        ? Yup.string().required("Segment is required")
        : Yup.string().nullable()
    ),
    contentSourceType: Yup.lazy(() =>
      type === "Unlock Deals" || type === "Special Section"
        ? Yup.string().required("Segment is required")
        : Yup.string().nullable()
    ),
    textColor: Yup.lazy(() =>
      textFeilds
        ? Yup.string().required("Text Color is required")
        : Yup.string().nullable()
    ),
    textbgColor: Yup.lazy(() =>
      textFeilds
        ? Yup.string().required("Text Background Color is required")
        : Yup.string().nullable()
    ),
    textForElement: Yup.lazy(() =>
      textFeilds
        ? Yup.string().required("Text is required")
        : Yup.string().nullable()
    ),
    textIcon: Yup.lazy(() =>
      textFeilds
        ? Yup.string().required("Element image is required")
        : Yup.string().nullable()
    ),
    textElementStatus: Yup.lazy(() =>
      textFeilds
        ? Yup.string().required("Element status is required")
        : Yup.string().nullable()
    ),
    linkedMasterId: Yup.lazy(() =>
      showFeild
        ? Yup.string().required("Value is required")
        : Yup.string().nullable()
    ),
  });

  const displayLimit =
    getSectiontContentMasterData?.getSectionContentMasterData?.filter(
      (sectionContent) => sectionContent?.sectionMasterId === typeID
    )?.length === sectionLimit;

  const handleSubmit = (values) => {
    if (!values) return;
    const { webImage, mobImage, textIcon } = values;

    // Check if any of the image fields are of type "object"
    if (
      typeof webImage === "object" ||
      typeof mobImage === "object" ||
      typeof textIcon === "object"
    ) {
      if (typeof mobImage === "object") {
        dispatch(onPostuploadMobileImage(mobImage));
        if (typeof webImage !== "object" && typeof textIcon !== "object")
          setMobile(true);
      }

      if (typeof webImage === "object") {
        dispatch(onPostuploadImage(webImage));
        if (typeof mobImage !== "object" && typeof textIcon !== "object")
          setWeb(true);
      }

      if (typeof textIcon === "object") {
        dispatch(onPostuploadElementImage(textIcon));
        if (typeof mobImage !== "object" && typeof webImage !== "object")
          setTextIcon(true);
      }
    } else {
      const sectionContentMasteData = {
        ...values,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        textElementFlag:
          typeof values?.textElementFlag === "boolean"
            ? values.textElementFlag
            : values?.textElementFlag === "true",
        webImage: webImage || "",
        mobImage: mobImage || "",
        textIcon: textIcon || "", // Add textIcon to the payload
        clientId: clientId,
        deleted: false,
        sectionMasterId: typeID,
        linkedMasterId: values?.linkedMasterId || null,
        segmentId: values?.segmentId || null,
        isOverrideMetadata:
          typeof values?.isOverrideMetadata === "boolean"
            ? values.isOverrideMetadata
            : values?.isOverrideMetadata === "true",
        textElementStatus:
          typeof values?.textElementStatus === "boolean"
            ? values.textElementStatus
            : values?.textElementStatus === "true",
        displayOrder: parseInt(values?.displayOrder),
        ...(sectionContentData && { id: values.id }),
      };

      dispatch(onPostSectionContentMaster(sectionContentMasteData));
    }
    setValues(values);
  };

  useEffect(() => {
    if (uploadImage) {
      const sectionContentMasteData = {
        ...values,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        textElementFlag:
          typeof values?.textElementFlag === "boolean"
            ? values.textElementFlag
            : values?.textElementFlag === "true",
        webImage: sectionContentData?.webImage || "",
        mobImage: sectionContentData?.mobImage || "",
        textIcon: sectionContentData?.textIcon || "",
        clientId: clientId,
        deleted: false,
        sectionMasterId: typeID,
        linkedMasterId: values?.linkedMasterId || null,
        isOverrideMetadata:
          typeof values?.isOverrideMetadata === "boolean"
            ? values.isOverrideMetadata
            : values?.isOverrideMetadata === "true",
        segmentId: values?.segmentId || null,
        textElementStatus:
          typeof values?.textElementStatus === "boolean"
            ? values.textElementStatus
            : values?.textElementStatus === "true",
        displayOrder: parseInt(values?.displayOrder),
        ...(sectionContentData && { id: values?.id }),
      };

      let shouldDispatch = false;
      if (
        uploadImage.postMobileStatusCode === "200" &&
        uploadImage.post_status_code === "200"
      ) {
        sectionContentMasteData.mobImage = getmobImage;
        sectionContentMasteData.webImage = getwebImage;
        shouldDispatch = true;
      } else if (
        uploadImage.postMobileStatusCode === "200" &&
        uploadImage.postElementStatusCode === "200"
      ) {
        sectionContentMasteData.mobImage = getmobImage;
        sectionContentMasteData.textIcon = getTextIcon;
        shouldDispatch = true;
      } else if (uploadImage.post_status_code === "200" && web) {
        sectionContentMasteData.webImage = getwebImage;
        shouldDispatch = true;
        setWeb(false);
      } else if (uploadImage.postMobileStatusCode === "200" && mobile) {
        sectionContentMasteData.mobImage = getmobImage;
        shouldDispatch = true;
        setMobile(false);
      } else if (uploadImage.postElementStatusCode === "200" && textIcon) {
        sectionContentMasteData.textIcon = getTextIcon;
        shouldDispatch = true;
        setTextIcon(false);
      } else if (
        uploadImage.post_status_code === "200" &&
        uploadImage.postMobileStatusCode === "200" &&
        uploadImage.postElementStatusCode === "200"
      ) {
        sectionContentMasteData.mobImage = getmobImage;
        sectionContentMasteData.textIcon = getTextIcon;
        sectionContentMasteData.webImage = getwebImage;
        shouldDispatch = true;
      }

      if (shouldDispatch) {
        dispatch(onPostSectionContentMaster(sectionContentMasteData));
      }
    } else if (uploadImage) {
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostuploadElementImageReset());
    }
  }, [uploadImage, values, web, mobile, textIcon]);

  const handleImageChange = (setFieldValue, event, fieldType) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (fieldType === "mobile") {
      setFieldValue("mobImage", formData);
    } else if (fieldType === "web") {
      setFieldValue("webImage", formData);
    } else if (fieldType === "textIcon") {
      setFieldValue("textIcon", formData);
    }
  };

  useEffect(() => {
    if (getSectiontContentMasterData?.post_status_code === "200") {
      setTextFeilds(false);
      setInitialValue(reset);
      setSectionContentData(null);
      toast.success(getSectiontContentMasterData?.postMessage);
      dispatch(onGetSectionContentMaster());
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostuploadElementImageReset());
      dispatch(onPostSectionContentMasterReset());
    } else if (getSectiontContentMasterData?.post_status_code) {
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
    dispatch(onPostuploadImageReset());
    dispatch(onPostuploadMobileImageReset());
    dispatch(onPostuploadElementImageReset());
  }, []);
  useEffect(() => {
    if (sectionContentData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(sectionContentData);
      setShowFields(sectionContentData?.contentSourceType);
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
                  {section_content_master}{" "}
                  {type && `(Type:${type}, Name:${sectionName} )`}
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
                      {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            {type !== "Promo Message" && (
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
                                      "mobile"
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
                            {type !== "Promo Message" && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{upload_image_for_web}</label>
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
                                      "web"
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
                            {(type === "Special Section" ||
                              type === "Unlock Deals") && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{content_source_type}</label>
                                {(type === "Special Section" ||
                                  type === "Unlock Deals") && (
                                  <span className="text-danger">*</span>
                                )}
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
                            {values?.contentSourceType && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>
                                  {showFeild === "Deal" ? "Deal" : "Product"}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="linkedMasterId"
                                  component={Dropdown}
                                  options={
                                    showFeild === "Deal"
                                      ? dealOptions
                                      : dealOptions
                                  }
                                  className={`form-select ${
                                    errors.linkedMasterId &&
                                    touched.linkedMasterId
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="linkedMasterId"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {(type === "Special Section" ||
                              type === "Unlock Deals") && (
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
                              </div>
                            )}

                            {(type === "Special Section" ||
                              type === "Unlock Deals") && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{segment_label}</label>
                                {(type === "Special Section" ||
                                  type === "Unlock Deals") && (
                                  <span className="text-danger">*</span>
                                )}
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
                            {type === "Promo Message" && (
                              <div className="col-sm-9 mb-4">
                                <label>{"Text"}</label>
                                {type === "Promo Message" && (
                                  <span className="text-danger">*</span>
                                )}
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
                            {type !== "Promo Message" && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{call_to_action}</label>
                                <span className="text-danger">*</span>
                                <Field
                                  type="text"
                                  name="cta"
                                  className={`form-control ${
                                    errors.cta && touched.cta
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={call_to_action_placeholder}
                                />

                                <ErrorMessage
                                  name="cta"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {type !== "Promo Message" &&
                              type !== "Promo Banner" &&
                              type !== "Special Cart Banner" &&
                              type !== "Supporting Banner" &&
                              type !== "Special Section" &&
                              type !== "Unlock Deals" && (
                                <div className="col-sm-4 form-group mb-2">
                                  <label>{text_label}</label>
                                  {type !== "Promo Message" &&
                                    type !== "Supporting Banner" &&
                                    type !== "Special Cart Banner" &&
                                    type !== "Special Section" &&
                                    type !== "Unlock Deals" && (
                                      <span className="text-danger">*</span>
                                    )}
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
                                  <ErrorMessage
                                    name="text"
                                    component="div"
                                    className="error-message"
                                  />
                                </div>
                              )}
                            {type === "Customer Menu" && (
                              <div className="col-lg-4 py-4">
                                <div className="form-check  mb-2 padd mt-2">
                                  <Field
                                    type="checkbox"
                                    className="form-check-input"
                                    name="textElementFlag"
                                    onChange={({ target: { checked } }) => {
                                      setFieldValue("textElementFlag", checked);
                                      if (checked) {
                                        setTextFeilds(true);
                                      }
                                      if (!checked) {
                                        setTextFeilds(false);
                                        setFieldValue("textColor", "");
                                        setFieldValue("textbgColor", "");
                                        setFieldValue("textIcon", "");
                                        setFieldValue("textElementStatus", "");
                                        setFieldValue("textForElement", "");
                                      }
                                    }}
                                  />
                                  <label className="px-1">
                                    {"Text Element Required"}
                                  </label>
                                </div>
                              </div>
                            )}
                            {values?.textElementFlag && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{"Text For Element"}</label>
                                <span className="text-danger">*</span>
                                <Field
                                  type="text"
                                  name="textForElement"
                                  className={`form-control ${
                                    errors.textForElement &&
                                    touched.textForElement
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={text_placeholder}
                                />
                                <ErrorMessage
                                  name="textForElement"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}

                            {values?.textElementFlag && (
                              <div className="col-sm-3 form-group mb-2">
                                <label>{"Text Font Color"}</label>
                                <span className="text-danger">*</span>
                                <Field
                                  type="color"
                                  name="textColor"
                                  className={`form-control ${
                                    errors.textColor && touched.textColor
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="textColor"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            {values?.textElementFlag && (
                              <div className="col-sm-3 form-group mb-2">
                                <label>{"Text Background Color"}</label>
                                <span className="text-danger">*</span>
                                <Field
                                  type="color"
                                  name="textbgColor"
                                  className={`form-control ${
                                    errors.textbgColor && touched.textbgColor
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="textbgColor"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}

                            {values?.textElementFlag && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>
                                  Upload Image For Element
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
                                      "textIcon"
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name="textIcon"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}

                            {values?.textElementFlag && (
                              <div className="col-sm-4 form-group mb-2 ">
                                <label>{"Text Element Status"}</label>
                                <span className="text-danger">*</span>

                                <Field
                                  name="textElementStatus"
                                  component={Dropdown}
                                  options={TextstatusOptions}
                                  className={`form-select ${
                                    errors.textElementStatus &&
                                    touched.textElementStatus
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="textElementStatus"
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
