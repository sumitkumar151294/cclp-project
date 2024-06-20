import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Footer from "../../Layout/Footer/Footer";
import image from "../../Assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import Loader from "../../Components/Loader/Loader";
import {GetTranslationData} from "../../Components/GetTranslationData/GetTranslationData ";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Translation labels
  const sign = GetTranslationData("UIAdmin", "sign");
  const email_label=GetTranslationData("UIAdmin", "email_label");
  const email_placeholder=GetTranslationData("UIAdmin", "email_placeholder");
  const password_label=GetTranslationData("UIAdmin", "password_label");
  const password_placeholder=GetTranslationData("UIAdmin", "password_label");
  const req_field=GetTranslationData("UIAdmin", "req_field");
  const sign_me_label=GetTranslationData("UIAdmin", "sign_me_label");

  //to get login details from redux store
  const loginDetails = useSelector((state) => state.loginReducer);
  // initial values for the input fields
  const initialValues = {
    email: "",
    password: "",
  };
  // to validate login form using Yup schema
  const validateForm = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsLogin(true);
      dispatch(onLoginSubmit({ values }));
      action.resetForm();
    },
  });
  //to handle navigation and toast notifications based on login status
  useEffect(() => {
    if (isLogin && loginDetails?.status_code === "201") {
      toast.success(loginDetails?.message);
      navigate("/dashboard");
    } else if (isLogin && loginDetails?.status_code) {
      toast.error(loginDetails?.message);
    }
  }, [loginDetails]);

  return (
    <>
      <ToastContainer />
      <div className="vh-100">
        <div className="authincation h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-md-6">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form">
                        <div className="text-center mb-3">
                          <img className="w-100" src={image} alt="" />
                        </div>
                        <h4 className="text-center mb-4">{sign}</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{email_label}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className={` ${
                                errors.email ? "border-danger" : "form-control"
                              }`}
                              name="email"
                              placeholder={email_placeholder}
                              value={values.email}
                              onChange={handleChange}
                            />
                            {errors.email && touched.email && (
                              <p className="text-danger">{errors.email}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{password_label}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="password"
                              className={` ${
                                errors.password
                                  ? "border-danger"
                                  : "form-control"
                              }`}
                              name="password"
                              placeholder={password_placeholder}
                              value={values.password}
                              onChange={handleChange}
                            />
                            {errors.password && touched.password && (
                              <p className="text-danger">{errors.password}</p>
                            )}
                          </div>
                          {loginDetails?.isLoading && <Loader />}
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >{req_field}</span>
                              <div className="form-check custom-checkbox ms-1">
                                <InputField
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                  name="remember"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="basic_checkbox_1"
                                >
                                  Remember my preference
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              text={sign_me_label}
                              className="btn btn-primary btn-block btn-sm float-right p-btn mt-2"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default LoginPage;
