import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule, onPostModule, onPostModuleReset } from "../../Store/Slices/moduleSlice";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const ModuleMaster = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
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
    routePath: yup.string().required("Route path is required"),
    icon: yup.string().required("Image is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } =
    useFormik({
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
      dispatch(onPostModuleReset());
      dispatch(onGetModule());
    } else if (isSubmit && moduleData?.status_code) {
      toast.error(moduleData?.message);
    }
  }, [moduleData]);

  return (
    <>
    <ScrollToTop/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Module Master</h4>
              </div>
              <div className="card-body">
              {moduleData?.postLoading && (<div style={{ height: "350px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>)}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          Module Name
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={`form-control ${
                            errors.name && touched.name
                              ? "is-invalid"
                              : ""
                          }`}
                          name="name"
                          id="name-f"
                          placeholder="Module name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <p className="error-message">{errors.name}</p>
                        )}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="description">
                          Module Route Path
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
                          placeholder="Module Route Path"
                          value={values.routePath}
                          onChange={handleChange}
                        />
                        {errors.routePath && touched.routePath && (
                          <p className="error-message">{errors.routePath}</p>
                        )}
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="description">
                          Module Icon<span className="text-danger">*</span>
                        </label>
                        <InputField
                          className={`form-control ${
                            errors.icon && touched.icon
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="icon"
                          id="flexCheckDefault2"
                          placeholder="Module Icon"
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
                        text="Submit"
                        icon="fa fa-arrow-right"
                        className="btn btn-primary btn-sm float-right p-btn mt-2"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleMaster;
