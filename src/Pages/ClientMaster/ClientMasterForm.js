import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useFormik } from "formik";
import * as yup from "yup";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import {
  onPostClientMasterReset,
  onPostClientMasterSubmit,
} from "../../Store/Slices/clientMasterSlice";
const ClientMaster = ({ data, clientPayData, setdata }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const clientMaster = useSelector((state) => state?.clientMasterReducer);
  // initial values for the input fields
  const initialValues = {
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    contactplatformDomainUrl: "",
    status: "",
    color: "",
    logo: "",
    theme: "",
    ipAddress: "",
    username: "",
    password: "",
    dbName: "",
  };
  // to validate login form using Yup schema
  const validateForm = yup.object({
    contactName: yup.string().required("Contact name is required"),
    contactNumber: yup.string().required("Contact number is required"),
    contactEmail: yup.string().email().required("Contact email is required"),
    contactplatformDomainUrl: yup.string().required("Domain url is required"),
    status: yup.string().required("Status is required"),
    logo: yup.string().required("Logo is required"),
    theme: yup.string().required("Theme is required"),
    ipAddress: yup.string().required("IP Address is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    dbName: yup.string().required("Database Name is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsSubmit(true);
      dispatch(onPostClientMasterSubmit({ values }));
      action.resetForm();
    },
  });
  // option for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  //options for theme
  const options = [
    { value: "Theme 1", label: "Theme 1" },
    { value: "Theme 2", label: "Theme 2" },
    { value: "Theme 3", label: "Theme 3" },
    { value: "Theme 4", label: "Theme 4" },
  ];

  //to handle toast notifications based on client Master form status
  useEffect(() => {
    if (isSubmit && clientMaster?.post_status_code === "201") {
      toast.success(clientMaster?.postMessage);
      dispatch(onPostClientMasterReset());
    } else if (isSubmit && clientMaster?.post_status_code) {
      toast.error(clientMaster?.postMessage);
    }
  }, [clientMaster]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Client Master</h4>
              </div>
              <div className="card-body position-relative">
                {clientMaster?.postClientLoading && <Loader />}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="contact-name">
                          Contact Name
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.contactName
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactName"
                          id="contact-name"
                          placeholder="Contact Name"
                          value={values.contactName}
                          onChange={handleChange}
                        />
                        {errors.contactName && touched.contactName && (
                          <p className="text-danger">{errors.contactName}</p>
                        )}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="contact-number">
                          Contact Number
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="number"
                          className={` ${
                            errors.contactNumber
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactNumber"
                          id="contact-number"
                          placeholder="Contact Number"
                          value={values.contactNumber}
                          maxLength={10}
                          onChange={handleChange}
                        />
                        {errors.contactNumber && touched.contactNumber && (
                          <p className="text-danger">{errors.contactNumber}</p>
                        )}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="contact-email">
                          Contact Email
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="email"
                          className={` ${
                            errors.contactEmail
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactEmail"
                          id="contact-email"
                          placeholder="example@gmail.com"
                          value={values.contactEmail}
                          onChange={handleChange}
                        />
                        {errors.contactEmail && touched.contactEmail && (
                          <p className="text-danger">{errors.contactEmail}</p>
                        )}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="platformDomainUrl">
                          Platform Domain Url
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="platformDomainUrl"
                          className={` ${
                            errors.contactplatformDomainUrl
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactplatformDomainUrl"
                          id="contact-platformDomainUrl"
                          placeholder="Platform Domain Url"
                          value={values.contactplatformDomainUrl}
                          onChange={handleChange}
                        />
                        {errors.contactplatformDomainUrl &&
                          touched.contactplatformDomainUrl && (
                            <p className="text-danger">
                              {errors.contactplatformDomainUrl}
                            </p>
                          )}
                      </div>
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="status">
                          Status
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          className={` ${
                            errors.status ? "border-danger" : "form-select"
                          }`}
                          options={statusOptions}
                        />
                        {errors.status && touched.status && (
                          <p className="text-danger">{errors.status}</p>
                        )}
                      </div>
                      <h3 className="mt-3 border">Theme Details </h3>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="color">
                          Color
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="color"
                          className="form-control"
                          name="color"
                          id="color"
                          value={values.color || "#000000"}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="logo">
                          Logo Link
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.logo ? "border-danger" : "form-control"
                          }`}
                          name="logo"
                          id="logo"
                          placeholder="Logo Link"
                          value={values.logo}
                          onChange={handleChange}
                        />
                        {errors.logo && touched.logo && (
                          <p className="text-danger">{errors.logo}</p>
                        )}
                      </div>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="status">
                          Select Theme
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          name="theme"
                          onChange={handleChange}
                          value={values.theme}
                          // key={clientData.themes}
                          className={` ${
                            errors.theme ? "border-danger" : "form-select"
                          }`}
                          options={options}
                        />
                        {errors.theme && touched.theme && (
                          <p className="text-danger">{errors.theme}</p>
                        )}
                      </div>
                      <div className="row mt-3">
                        <h3 className="border">Database Credentials</h3>

                        <div className="col-sm-3 form-group mb-2">
                          <h4>
                            Database IP Address
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.ipAddress
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="ipAddress"
                            id="ipAddress"
                            value={values.ipAddress}
                            placeholder="IP Address"
                            onChange={handleChange}
                          />
                          {errors.ipAddress && touched.ipAddress && (
                            <p className="text-danger">{errors.ipAddress}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            Database User ID
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.username ? "border-danger" : "form-control"
                            }`}
                            name="username"
                            id="user-name"
                            value={values.username}
                            placeholder="Username"
                            onChange={handleChange}
                          />
                          {errors.username && touched.username && (
                            <p className="text-danger">{errors.username}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            Database User Password
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="password"
                            className={` ${
                              errors.password ? "border-danger" : "form-control"
                            }`}
                            name="password"
                            id="password"
                            value={values.password}
                            placeholder="Password"
                            onChange={handleChange}
                          />
                          {errors.password && touched.password && (
                            <p className="text-danger">{errors.password}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            Database Name
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.dbName ? "border-danger" : "form-control"
                            }`}
                            name="dbName"
                            id="dbName"
                            value={values.dbName}
                            placeholder="Database Name"
                            onChange={handleChange}
                          />
                          {errors.dbName && touched.dbName && (
                            <p className="text-danger">{errors.dbName}</p>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          text="Add"
                          icon={"fa fa-arrow-right"}
                          className="btn btn-primary btn-sm float-right p-btn mb-5 mt-2"
                        />
                        <ToastContainer />
                      </div>
                    </div>
                  </form>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientMaster;
