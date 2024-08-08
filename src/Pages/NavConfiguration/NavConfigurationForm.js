import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import {
  onGetNavConfigure,
  onPostNavConfigure,
  onPostNavConfigureReset,
  onUpdateNavConfigure,
  onUpdateNavConfigureReset,
} from "../../Store/Slices/NavConfigurationSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const NavConfigurationForm = ({ navData,setNavData }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  // to get lables and placeholder from translation
  const nav_configuration_form = GetTranslationData(
    "UIMasterAdmin",
    "nav_configuration_form"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const menu_name = GetTranslationData("UIMasterAdmin", "menu_name");
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const is_login_required = GetTranslationData(
    "UIMasterAdmin",
    "is_login_required"
  );
  const menu_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "menu_name_placeholder"
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
  const menu_name_required = GetTranslationData(
    "UIMasterAdmin",
    "menu_name_ required"
  );
  const call_to_action_required = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_required"
  );
  // to get nav-configure data from the Redux store
  const navConfigureData = useSelector(
    (state) => state?.navConfigurationReducer
  );
  // initial values for the input fields
  const initialValues = {
    cta: "",
    navigationMenuName: "",
    displayOrder: "",
    loginRequired: false,
  };
  // to validate nav configure form using Yup schema
  const validateForm = yup.object({
    cta: yup.string().required("Menu Name is required"),
    navigationMenuName: yup.string().required("Call To Action is required"),
    displayOrder: yup.string().required("Display Order is required"),
  });
  // Custom handler for checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateForm,
      onSubmit: (values, action) => {
        const postData = {
          ...values,
          deleted: false,
          enabled:
            typeof values?.enabled === "boolean"
              ? values.enabled
              : values?.enabled === "true",
          clientId: 4,
          cta: values?.cta,
          navigationMenuName: values?.navigationMenuName,
          displayOrder:values?.displayOrder,
          loginRequired: values?.loginRequired,
        };
        if (navData) {
          postData.id = navData.id;
          dispatch(onUpdateNavConfigure(postData));
        } else {
          dispatch(onPostNavConfigure(postData));
        }
        setIsSubmit(true);
        action.resetForm();
      },
    });
  // to prefill form when we click on the edit icon
  useEffect(() => {
    if (navData) {
      setValues({
        cta: navData?.cta,
        navigationMenuName: navData?.navigationMenuName,
        displayOrder: navData?.displayOrder,
        loginRequired: navData?.loginRequired,
      });
    }
  }, [navData, setValues]);
  // to handle navigation and toast notifications based on post and update status
  useEffect(() => {
    if (isSubmit && navConfigureData?.post_status_code === "201") {
      toast.success(navConfigureData?.postMessage);
      dispatch(onGetNavConfigure());
      dispatch(onPostNavConfigureReset());
    } else if (isSubmit && navConfigureData?.update_status_code === "205") {
      toast.success(navConfigureData?.updateMessage);
      setNavData();
      dispatch(onGetNavConfigure());
      dispatch(onUpdateNavConfigureReset());
    } else if (navConfigureData?.post_status_code) {
      toast.error(navConfigureData?.postMessage?.data?.ErrorMessage);
      dispatch(onPostNavConfigureReset());
    }
  }, [navConfigureData]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Nav Configuration Form</h4>
              </div>
              <div className="card-body">
                {navConfigureData?.isPostLoading ||
                (navData && navConfigureData?.isUpdateLoading) ? (
                  <div style={{ height: "100px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            Menu Name
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.cta && touched.cta ? "is-invalid" : ""
                            }`}
                            name="cta"
                            placeholder="Enter Menu Name"
                            value={values.cta}
                            onChange={handleChange}
                          />
                          {errors.cta && touched.cta && (
                            <p className="error-message">{errors.cta}</p>
                          )}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="description">
                            Call To Action
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.navigationMenuName &&
                              touched.navigationMenuName
                                ? "is-invalid"
                                : ""
                            }`}
                            name="navigationMenuName"
                            placeholder="Enter Call To Action"
                            value={values.navigationMenuName}
                            onChange={handleChange}
                          />
                          {errors.navigationMenuName &&
                            touched.navigationMenuName && (
                              <p className="error-message">
                                {errors.navigationMenuName}
                              </p>
                            )}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="description">
                            Display Order
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            name="displayOrder"
                            className={`form-control ${
                              errors.displayOrder && touched.displayOrder
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter Display Order"
                            value={values.displayOrder}
                            onChange={handleChange}
                          />
                          {errors.displayOrder && touched.displayOrder && (
                            <p className="error-message">
                              {errors.displayOrder}
                            </p>
                          )}
                        </div>

                        <div className="col-lg-4 py-4">
                          <div className="form-check mb-2 padd mt-4">
                            <InputField
                              className="form-check-input"
                              type="checkbox"
                              name="loginRequired"
                              checked={values.loginRequired}
                              onChange={handleCheckboxChange}
                            />
                            <label className="px-1">Is Login Required</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mb-4">
                        <Button
                          text={navData ? update : submit}
                          end_icon="fa fa-arrow-right"
                          className="btn btn-primary btn-sm float-right p-btn mt-2"
                        />
                      </div>
                    </form>
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
