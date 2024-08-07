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
  onUpdateClientMasterSubmit,
} from "../../Store/Slices/clientMasterSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const ClientMaster = ({ data, setdata }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  // to get labels from API
  const client_master_label=GetTranslationData("UIMasterAdmin", "client_master_label")
  const contactName = GetTranslationData("UIMasterAdmin", "contact_Name_label");
  const contactNumber = GetTranslationData("UIMasterAdmin", "contact_Number_label");
  const email = GetTranslationData("UIMasterAdmin", "contact_Email_label");
  const ipAddress = GetTranslationData("UIMasterAdmin", "IP Address_label");
  const status = GetTranslationData("UIMasterAdmin", "Status_label");
  const color = GetTranslationData("UIMasterAdmin", "Color_label");
  const logo = GetTranslationData("UIMasterAdmin", "Logo Link_label");
  const theme = GetTranslationData("UIMasterAdmin", "Select Theme_label");
  const userId = GetTranslationData("UIMasterAdmin", "database_User_ID_Label");
  const userPassword = GetTranslationData(
    "UIMasterAdmin",
    "database_User_Pass_Label"
  );
  const db_name = GetTranslationData("UIMasterAdmin", "db_name");
  const platformDomainUrl = GetTranslationData(
    "UIMasterAdmin",
    "platform_Domain_Url"
  );
  const themeDetails = GetTranslationData("UIMasterAdmin", "Theme_Details_Label");
  const active = GetTranslationData("UIMasterAdmin", "active");
  const nonActive = GetTranslationData("UIMasterAdmin", "nonActive");
  const submit = GetTranslationData("UIMasterAdmin", "submit_label");
  const update = GetTranslationData("UIMasterAdmin", "update_label");
  const email_placeholder = GetTranslationData("UIMasterAdmin", "email_placeholder");
  const DatabaseCredentials = GetTranslationData("UIMasterAdmin", " Database_Label");
  const password_placeholder = GetTranslationData("UIMasterAdmin", "password_label");
  const ipAddress_label=GetTranslationData("UIMasterAdmin", "ipAddress");
  const username = GetTranslationData("UIMasterAdmin", "usernamee_label");
  // to get client master data from redux store
  const clientMasterDetails = useSelector((state) => state?.clientMasterReducer);
  // initial values for the input fields
  const initialValues = {
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    contactplatformDomainUrl: "",
    status: "",
    color: "#000",
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
    contactNumber: yup.number().required("Contact number is required"),
    contactEmail: yup.string().email("Invalid email").required("Contact email is required"),
    contactplatformDomainUrl: yup.string().matches(
     /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})(\/[\w .-]*)*\/?$/,'Enter correct url').required("Domain url is required"),
    status: yup.string().required("Status is required"),
    logo: yup.string().matches(/^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})(\/[\w .-]*)*\/?$/,'Enter correct url').required("Logo is required"),
    theme: yup.string().required("Theme is required"),
    ipAddress: yup.string().required("IP Address is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    dbName: yup.string().required("Database Name is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit,setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      if (data) {
        dispatch(onUpdateClientMasterSubmit(values));
        setdata();
      } else {
        dispatch(onPostClientMasterSubmit( values ));
      }
      setIsSubmit(true);
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
  //to update client master data
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setValues({
      contactName: data?.contactName,
      contactNumber: data?.contactNumber,
      id: 1,
      contactEmail: data?.contactEmail,
      ipAddress: data?.ipAddress,
      color: data?.color,
      status:data?.status,
      logo: data?.logo,
      theme: data?.theme,
      password: data?.password,
      username: data?.username,
      dbName: data?.dbName,
      contactplatformDomainUrl: data?.contactplatformDomainUrl,
    });
  }, [data]);
  //to handle toast notifications based on client Master form status
  useEffect(() => {
    if (isSubmit && clientMasterDetails?.post_status_code === "201") {
      toast.success(clientMasterDetails?.postMessage);
      dispatch(onPostClientMasterReset());
      dispatch(onClientMasterSubmit());
    } else if (isSubmit && clientMasterDetails?.post_status_code) {
      toast.error(clientMasterDetails?.postMessage);
    }
  }, [clientMasterDetails]);

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
                {clientMasterDetails?.postClientLoading && <Loader />}
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
                          type="text"
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
                          text={data ? update : submit}
                          end_icon={"fa fa-arrow-right"}
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
