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
  onClientMasterSubmit,
  onPostClientMasterReset,
  onPostClientMasterSubmit,
} from "../../Store/Slices/clientMasterSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const ClientMaster = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  // to get labels from API
  const client_master_label=GetTranslationData("UIAdmin", "client_master_label")
  const contactName = GetTranslationData("UIAdmin", "contact_Name_label");
  const contactNumber = GetTranslationData("UIAdmin", "contact_Number_label");
  const email = GetTranslationData("UIAdmin", "contact_Email_label");
  const ipAddress = GetTranslationData("UIAdmin", "IP Address_label");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const color = GetTranslationData("UIAdmin", "Color_label");
  const logo = GetTranslationData("UIAdmin", "Logo Link_label");
  const theme = GetTranslationData("UIAdmin", "Select Theme_label");
  const userId = GetTranslationData("UIAdmin", "database_User_ID_Label");
  const userPassword = GetTranslationData(
    "UIAdmin",
    "database_User_Pass_Label"
  );
  const db_name = GetTranslationData("UIAdmin", "db_name");
  const platformDomainUrl = GetTranslationData(
    "UIAdmin",
    "platform_Domain_Url"
  );
  const themeDetails = GetTranslationData("UIAdmin", "Theme_Details_Label");
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const email_placeholder = GetTranslationData("UIAdmin", "email_placeholder");
  const DatabaseCredentials = GetTranslationData("UIAdmin", " Database_Label");
  const password_placeholder = GetTranslationData("UIAdmin", "password_label");
  const ipAddress_label=GetTranslationData("UIAdmin", "ipAddress");
  const username = GetTranslationData("UIAdmin", "usernamee_label");
  // to get client master data from redux store
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
    contactEmail: yup.string().email("Invalid email").required("Contact email is required"),
    contactplatformDomainUrl: yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url').required("Domain url is required"),
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
      dispatch(onPostClientMasterSubmit( values ));
      action.resetForm();
    },
  });
  // option for status
  const statusOptions = [
    { value: true, label: active },
    { value: false, label: nonActive },
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
      dispatch(onClientMasterSubmit());
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
                <h4 className="card-title">{client_master_label}</h4>
              </div>
              <div className="card-body position-relative">
                {clientMaster?.postClientLoading && <Loader />}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="contact-name">
                          {contactName}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.contactName && touched.contactName
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactName"
                          id="contact-name"
                          placeholder={contactName}
                          value={values.contactName}
                          onChange={handleChange}
                        />
                        {errors.contactName && touched.contactName && (
                          <p className="text-danger">{errors.contactName}</p>
                        )}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="contact-number">
                        {contactNumber}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="number"
                          className={` ${
                            errors.contactNumber && touched.contactNumber
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactNumber"
                          id="contact-number"
                          placeholder={contactNumber}
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
                          {email}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.contactEmail  && touched.contactEmail
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactEmail"
                          id="contact-email"
                          placeholder={email_placeholder}
                          value={values.contactEmail}
                          onChange={handleChange}
                        />
                        {errors.contactEmail && touched.contactEmail && (
                          <p className="text-danger">{errors.contactEmail}</p>
                        )}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="platformDomainUrl">
                        {platformDomainUrl}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="url"
                          className={` ${
                            errors.contactplatformDomainUrl &&
                            touched.contactplatformDomainUrl
                              ? "border-danger"
                              : "form-control"
                          }`}
                          name="contactplatformDomainUrl"
                          id="contact-platformDomainUrl"
                          placeholder={platformDomainUrl}
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
                        {status}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          className={` ${
                            errors.status && touched.status ? "border-danger" : "form-select"
                          }`}
                          options={statusOptions}
                        />
                        {errors.status && touched.status && (
                          <p className="text-danger">{errors.status}</p>
                        )}
                      </div>
                      <h3 className="mt-3 border">{themeDetails}</h3>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="color">
                        {color}
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
                        {logo}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.logo && touched.logo ? "border-danger" : "form-control"
                          }`}
                          name="logo"
                          id="logo"
                          placeholder={logo}
                          value={values.logo}
                          onChange={handleChange}
                        />
                        {errors.logo && touched.logo && (
                          <p className="text-danger">{errors.logo}</p>
                        )}
                      </div>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="status">
                        {theme}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          name="theme"
                          onChange={handleChange}
                          value={values.theme}
                          // key={clientData.themes}
                          className={` ${
                            errors.theme && touched.theme ? "border-danger" : "form-select"
                          }`}
                          options={options}
                        />
                        {errors.theme && touched.theme && (
                          <p className="text-danger">{errors.theme}</p>
                        )}
                      </div>
                      <div className="row mt-3">
                        <h3 className="border">{DatabaseCredentials}</h3>

                        <div className="col-sm-3 form-group mb-2">
                          <h4>
                          {ipAddress}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.ipAddress && touched.ipAddress
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="ipAddress"
                            id="ipAddress"
                            value={values.ipAddress}
                            placeholder={ipAddress_label}
                            onChange={handleChange}
                          />
                          {errors.ipAddress && touched.ipAddress && (
                            <p className="text-danger">{errors.ipAddress}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                          {userId}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.username && touched.username ? "border-danger" : "form-control"
                            }`}
                            name="username"
                            id="user-name"
                            value={values.username}
                            placeholder={username}
                            onChange={handleChange}
                          />
                          {errors.username && touched.username && (
                            <p className="text-danger">{errors.username}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                          {userPassword}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="password"
                            className={` ${
                              errors.password && touched.password ? "border-danger" : "form-control"
                            }`}
                            name="password"
                            id="password"
                            value={values.password}
                            placeholder={password_placeholder}
                            onChange={handleChange}
                          />
                          {errors.password && touched.password && (
                            <p className="text-danger">{errors.password}</p>
                          )}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                          {db_name}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.dbName && touched.dbName ? "border-danger" : "form-control"
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
                          text={submit}
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
