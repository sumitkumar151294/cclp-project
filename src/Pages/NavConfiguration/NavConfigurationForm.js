import React, { useEffect, useState } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import {
  onGetNavConfigure,
  onPostNavConfigure,
  onPostNavConfigureReset,
} from "../../Store/Slices/NavConfigurationSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onPostuploadImage, onPostuploadImageReset } from "../../Store/Slices/uploadSlice";

const NavConfigurationForm = ({ navData, setNavData,edit , setEdit  }) => {
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);
  const dispatch = useDispatch();
  const [values, setValues] = useState(null);
  // to get lables and placeholder from translation
  const nav_configuration_form = GetTranslationData(
    "UIMasterAdmin",
    "nav_configuration_form"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const nav_name = GetTranslationData("UIMasterAdmin", "nav_name");
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const is_login_required = GetTranslationData(
    "UIMasterAdmin",
    "is_login_required"
  );
  const nav_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "nav_name_placeholder"
  );
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const displayOrderPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayOrderPlaceholder"
  );
  const call_to_action_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_placeholder"
  );
  const nav_name_required = GetTranslationData(
    "UIMasterAdmin",
    "nav_name_required"
  );
  const call_to_action_required = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_required"
  );
  const display_order_required = GetTranslationData(
    "UIMasterAdmin",
    "display_order_required"
  );
  const nav_icon = GetTranslationData("UIMasterAdmin", "nav_icon");
  const nav_icon_required = GetTranslationData("UIMasterAdmin", "nav_icon_required");
  const display_must_number = GetTranslationData(
    "UIMasterAdmin",
    "display_must_number"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  // to get nav-configure data from the Redux store
  const navConfigureData = useSelector(
    (state) => state?.navConfigurationReducer
  );
  // initial values for the input fields
  const [intialValue, setInitialValue] = useState({
    cta: "",
    navigationMenuName: "",
    displayOrder: "",
    loginRequired: false,
    icon: "",
    enabled: "",
  });
  const reset={
    cta: "",
    navigationMenuName: "",
    displayOrder: "",
    loginRequired: false,
    icon: "",
    enabled: "",
  }
  // options for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  // to validate nav configure form using Yup schema
  const validations = yup.object({
    cta: yup.string().required(call_to_action_required),
    navigationMenuName: yup.string().required(nav_name_required),
    displayOrder: yup.string()
    .required(display_order_required)
    .matches(/^[0-9]+$/, display_must_number),
    enabled: yup.string().required(status_required),
    icon:yup.string().required(nav_icon_required)
  });
  // to handle form using useFormik hook
  const handleSubmit = (values) => {
    if (values) {
      if (typeof values.icon === "object") {
        dispatch(onPostuploadImage(values.icon));
        setValues(values);
      }else {
      const postData = {
        ...values,
        deleted: false,
        icon:values.icon,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: 6,
        ...(navData && { id: navData.id }),
      };
      dispatch(onPostNavConfigure(postData));
    }
    setInitialValue(reset)
    }
  };
  // to call post api based on upload Image status
  useEffect(() => {
    if (uploadImage?.post_status_code === "201") {
      const postData = {
        ...values,
        deleted: false,
        icon:getwebImage,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: 6,
        ...(navData && { id: navData.id }),
      };
      dispatch(onPostNavConfigure(postData));
      setInitialValue(reset);
    }else if(uploadImage?.post_status_code){
      toast.error(uploadImage?.postMessage)
      dispatch(onPostuploadImageReset())
    }
  }, [uploadImage, values]);
  // to prefill form when we click on the edit icon
  useEffect(() => {
    if (navData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(navData);
    }
  }, [navData]);
  // to handle navigation and toast notifications based on post and update status
  useEffect(() => {
    if (navConfigureData?.post_status_code === "201" || navConfigureData?.post_status_code === "205"
     ) {
      setNavData(null);
      setEdit(false)
      toast.success(navConfigureData?.postMessage);
      dispatch(onPostuploadImageReset())
      dispatch(onGetNavConfigure());
      dispatch(onPostNavConfigureReset());
    }else if (navConfigureData?.post_status_code === "204"
    ) {
     setNavData(null);
     setEdit(false);
     toast.success(navConfigureData?.postMessage);
     dispatch(onPostuploadImageReset())
     dispatch(onGetNavConfigure());
     dispatch(onPostNavConfigureReset());
   }
    else if (navConfigureData?.post_status_code) {
      toast.error(navConfigureData?.postMessage?.data?.ErrorMessage);
      dispatch(onPostuploadImageReset())
      dispatch(onPostNavConfigureReset());
    }
  }, [navConfigureData]);
  // to handle image
  const handleImageChange = (setFieldValue, event) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFieldValue("icon", formData);
  };
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{nav_configuration_form}</h4>
              </div>
              <div className="card-body">
                {((!edit && navConfigureData?.isPostLoading )|| uploadImage?.isPostLoading) ? (
                  <div style={{ height: "100px" }}>
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
                            <div className="col-sm-4 form-group mb-4">
                              <label htmlFor="name-f">
                                {nav_name}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.navigationMenuName && touched.navigationMenuName ? "is-invalid" : ""
                                }`}
                                name="navigationMenuName"
                                placeholder={nav_name_placeholder}
                              />
                              <ErrorMessage
                                name="navigationMenuName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="description">
                                {call_to_action}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                className={`form-control ${
                                  errors.cta &&
                                  touched.cta
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="cta"
                                placeholder={call_to_action_placeholder}
                              />
                              <ErrorMessage
                                name="cta"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label htmlFor="description">
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
                              <label htmlFor="description">
                                {nav_icon}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className={`form-control ${
                                  errors.icon && touched.icon
                                    ? "is-invalid"
                                    : ""
                                }`}
                                accept=".jpg, .jpeg, .png, .webp .svg"
                                type="file"
                                name="icon"
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event)
                                }
                              />
                              <ErrorMessage
                                name="icon"
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
                            <div className="col-lg-4 py-4">
                              <div className="form-check mb-2 padd mt-4">
                                <Field
                                  className="form-check-input"
                                  type="checkbox"
                                  name="loginRequired"
                                  onChange={({ target: { checked } }) =>
                                    setFieldValue("loginRequired", checked)
                                  }
                                />
                                <label className="px-1">
                                  {is_login_required}
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-4 mb-4">
                              <Button
                                text={navData ? update : submit}
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

export default NavConfigurationForm;
