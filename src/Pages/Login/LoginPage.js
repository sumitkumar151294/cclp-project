import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import {useFormik} from "formik";
import  * as yup from "yup";
import Footer from "../../Layout/Footer/Footer";
import image from "../../Assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {  onLoginSubmit } from "../../Store/Slices/loginSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isLogin,setIsLogin]=useState(false);
  
  //to get login details from redux
  const loginDetails = useSelector((state) => state.loginReducer);
  
  const initialValues={
    email:"",
    password:""
  };

  // to validate login form using Yup
  const validateForm=yup.object({
      email:yup.string().email().required("Email is required"),
      password:yup.string().required("Password is required")
  });

  // to handle form using formik
  const {values,errors,touched,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:validateForm,
    onSubmit:(values,action)=>{
        setIsLogin(true);
        dispatch(onLoginSubmit({values}));
        action.resetForm();
     },
  });
  useEffect(() => {
    if (loginDetails?.status_code === "201" && isLogin) {
      toast.success(loginDetails?.message);
      navigate("/dashboard");
    }
  }, [loginDetails?.status_code,isLogin]);
 
  return (
    <>
      <ToastContainer/>
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
                        <h4 className="text-center mb-4">SignIn</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Email</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className={` ${
                                errors.email ? "border-danger" : "form-control"
                              }`}
                              name="email"
                              placeholder="example@gmail.com"
                              value={values.email}
                              onChange={handleChange}
                            />
                            {errors.email && touched.email && <p className="text-danger">{errors.email}</p>}
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Password</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="password"
                              className={` ${
                                errors.password ? "border-danger" : "form-control"
                              }`}
                              name="password"
                              placeholder="........"
                              value={values.password}
                              onChange={handleChange}
                            />
                            {errors.password && touched.password && <p className="text-danger">{errors.password}</p>}
                          </div>
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                              </span>
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
                              text="Submit"
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
      
      <Footer/>
    </>
  );
};
export default LoginPage;
