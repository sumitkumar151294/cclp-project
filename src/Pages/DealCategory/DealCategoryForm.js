import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetDealCategory,
  onPostDealCategory,
  onPostDealCategoryReset,
  onUpdateDealCategory,
} from "../../Store/Slices/dealCategorySlice";
import {
  onPostuploadImage,
  onPostuploadImageReset,
  onPostuploadMobileImage,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Dropdown from "../../Components/Dropdown/Dropdown";
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const DealCategoryForm = ({ setdealCategory, dealCategory }) => {
  const [values, setValues] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [web, setWeb] = useState(false);
  const dispatch = useDispatch();
  // to get lables and placeholder from translation
  const deal_category = GetTranslationData("UIMasterAdmin", "deal_category");
  const deal_category_name = GetTranslationData(
    "UIMasterAdmin",
    "deal_category_name"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const category_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "category_name_placeholder"
  );
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const displayOrderPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayOrderPlaceholder"
  );
  const upload_image_for_web = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_web"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const mobile_image_required = GetTranslationData(
    "UIMasterAdmin",
    "mobile_image_required"
  );
  const upload_image_for_phone = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_phone"
  );
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const display_order_required = GetTranslationData(
    "UIMasterAdmin",
    "display_order_required"
  );
  const category_name_required = GetTranslationData(
    "UIMasterAdmin",
    "category_name_required"
  );
  const display_must_number = GetTranslationData(
    "UIMasterAdmin",
    "display_must_number"
  );
  // to get deal category data from redux store
  const dealCategoryData = useSelector((state) => state.dealCategoryReducer);
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);
  // initial values for the input fields
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    mobImage: "",
    displayOrder: "",
    name: "",
    enabled: "",
  });
  const resetState = [
    {
      webImage: "",
      mobImage: "",
      displayOrder: "",
      name: "",
      enabled: "",
    },
  ];
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    name: Yup.string().required(category_name_required),
    enabled: Yup.string().required(status_required),
    mobImage: Yup.string().required(mobile_image_required),
    displayOrder: Yup.string()
      .required(display_order_required)
      .matches(/^[0-9]+$/, display_must_number),
  });

  //to handle submit
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
      const dealCategoryData = {
        ...values,
        deleted: false,
        clientId: 6,
        webImage: webImage || "",
        mobImage: mobImage || "",
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        ...(dealCategory && { id: values.id }),
      };
      dispatch(onPostDealCategory(dealCategoryData));
    }
    setValues(values);
  };

  // to handle image changes
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
    if (uploadImage) {
      const dealCategoryData = {
        ...values,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        webImage: dealCategory?.webImage,
        mobImage: dealCategory?.mobImage,
        clientId: 6,
        deleted: false,
        ...(dealCategory && { id: values?.id }),
      };
      let shouldDispatch = false;
      if (
        uploadImage.postMobileStatusCode === "201" &&
        uploadImage.post_status_code === "201"
      ) {
        dealCategoryData.webImage = getwebImage;
        dealCategoryData.mobImage = getmobImage;
        shouldDispatch = true;
      } else if (uploadImage.post_status_code === "201" && web) {
        dealCategoryData.webImage = getwebImage;
        shouldDispatch = true;
        setWeb(false);
      } else if (uploadImage.postMobileStatusCode === "201" && mobile) {
        dealCategoryData.mobImage = getmobImage;
        shouldDispatch = true;
        setMobile(false);
      }
      if (shouldDispatch) {
        dispatch(onPostDealCategory(dealCategoryData));
      }
    }
  }, [uploadImage, values, web, mobile]);
  // to handle navigation and toast notifications based on deal category status
  useEffect(() => {
    if (dealCategoryData?.post_status_code === "201") {
      toast.success(dealCategoryData.postMessage);
      setInitialValue(resetState);
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostDealCategoryReset());
      dispatch(onGetDealCategory());
    } else if (dealCategoryData?.post_status_code === "205") {
      toast.success(dealCategoryData.postMessage);
      setInitialValue(resetState);
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostDealCategoryReset());
      dispatch(onGetDealCategory());
    } else if (dealCategoryData?.post_status_code) {
      toast.error(dealCategoryData.postMessage);
      dispatch(onPostDealCategoryReset());
    }
  }, [dealCategoryData]);
  // to prefilled form when we will click on edit icon in the list
  useEffect(() => {
    if (dealCategory) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(dealCategory);
    }
  }, [dealCategory]);
  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{deal_category}</h4>
              </div>
              <div className="card-body">
                {dealCategoryData?.isPostLoading ||
                dealCategoryData?.isUpdateLoading ||
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
                      {({ errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label> {deal_category_name}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={category_name_placeholder}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
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
                            <div className="col-sm-4 form-group mb-2 ">
                              <label>
                                {upload_image_for_phone}
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
                                  handleImageChange(setFieldValue, event, true)
                                }
                              />
                              <ErrorMessage
                                name="mobImage"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
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
                                  handleImageChange(setFieldValue, event, false)
                                }
                              />
                              <ErrorMessage
                                name="webImage"
                                component="div"
                                className="error-message"
                              />
                            </div>{" "}
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
                                text={dealCategory ? update : submit}
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

export default DealCategoryForm;
