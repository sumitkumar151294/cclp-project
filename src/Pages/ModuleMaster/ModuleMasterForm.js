import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetModule,
  onPostModule,
  onPostModuleReset,
} from "../../Store/Slices/moduleSlice";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const ModuleMasterForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  // to get labels and placeholder from translation
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const module_name = GetTranslationData("UIMasterAdmin", "module_name");
  const module_master = GetTranslationData("UIMasterAdmin", "module_master");
  const module_name_placeholder = GetTranslationData("UIMasterAdmin", "module_name_placeholder");
  const module_route_path = GetTranslationData("UIMasterAdmin", "module_route_path");
  const route_path_placeholder = GetTranslationData("UIMasterAdmin", "route_path_placeholder");
  const module_icon = GetTranslationData("UIMasterAdmin", "module_icon");
  const module_icon_placeholder = GetTranslationData("UIMasterAdmin", "module_icon_placeholder");
  // to get module data from the Redux store
  const moduleData = useSelector((state) => state?.moduleReducer);
  // initial values for the input fields
  const initialValues = {
    name: "",
    routePath: "",
    icon: "",
  };
  // to validate user master form using Yup schema
  const validateForm = yup.object({
    name: yup.string().required("Module name is required"),
    routePath: yup.string().required("Module route path is required"),
    icon: yup.string().required("Module Icon is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsSubmit(true);
      dispatch(onPostModule(values));
      action.resetForm();
    },
  });
  //to handle navigation and toast notifications based on module status
  useEffect(() => {
    if (isSubmit && moduleData?.status_code === "201") {
      toast.success(moduleData?.message);
      dispatch(onGetModule());
      dispatch(onPostModuleReset());
    } else if (isSubmit && moduleData?.status_code) {
      toast.error(moduleData?.message);
      dispatch(onPostModuleReset());
    }
  }, [moduleData]);
  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{module_master}</h4>
              </div>
              <div className="card-body">
                {moduleData?.postLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {module_name}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.name && touched.name ? "is-invalid" : ""
                            }`}
                            name="name"
                            id="name-f"
                            placeholder={module_name_placeholder}
                            value={values.name}
                            onChange={handleChange}
                          />
                          {errors.name && touched.name && (
                            <p className="error-message">{errors.name}</p>
                          )}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="description">
                            {module_route_path}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.routePath && touched.routePath
                                ? "is-invalid"
                                : ""
                            }`}
                            name="routePath"
                            id="description"
                            placeholder={route_path_placeholder}
                            value={values.routePath}
                            onChange={handleChange}
                          />
                          {errors.routePath && touched.routePath && (
                            <p className="error-message">{errors.routePath}</p>
                          )}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="description">
                            {module_icon}<span className="text-danger">*</span>
                          </label>
                          <InputField
                            className={`form-control ${
                              errors.icon && touched.icon ? "is-invalid" : ""
                            }`}
                            type="text"
                            name="icon"
                            id="flexCheckDefault2"
                            placeholder={module_icon_placeholder}
                            value={values.icon}
                            onChange={handleChange}
                          />
                          {errors.icon && touched.icon && (
                            <p className="error-message">{errors.icon}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4 mb-4">
                        <Button
                          text={submit}
                          end_icon="fa fa-arrow-right"
                          className="btn btn-primary float-right pad-aa mt-2"
                        />
                        <ToastContainer />
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

export default ModuleMasterForm;
