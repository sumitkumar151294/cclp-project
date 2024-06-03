/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "../../Components/Loader/Loader";
// import Footer from "../../Layout/Footer/Footer";
import image from "../../Assets/img/logo.png";
const LoginPage = () => {
 
  return (
    <>
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
                        <form>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Email</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className="form-control"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Password</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="password"
                              className="form-control"
                            />
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
    </>
  );
};
export default LoginPage;
/* eslint-enable react-hooks/exhaustive-deps */
