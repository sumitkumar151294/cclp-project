/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import {
  onGetuserMaster,
  onPostuserMaster,
  onPostuserMasterReset,
  onUpdateuserMasterReset,
} from "../../Store/Slices/userMasterSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Dropdown from "../../Components/Dropdown/Dropdown";

const UserMasterForm = ({ userMasterData ,setuserMasterData}) => {
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state?.userRoleReducer);
  const getUserMaster = useSelector((state) => state?.userMasterReducer);
  const [selectedRole, setSelectedRole] = useState("");
  const [intialValue, setInitialValue] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    roleId: "",
    enabled:""
  });
  // to get labels and placeholders from translation 
  const user_master_label = GetTranslationData(
    "UIMasterAdmin",
    "user_master_label"
  );
  const first_name_required = GetTranslationData(
    "UIMasterAdmin",
    "first_name_required"
  );
  const last_name_required = GetTranslationData(
    "UIMasterAdmin",
    "last_name_required"
  );
  const mobil_10_digit_required = GetTranslationData(
    "UIMasterAdmin",
    "mobil_10_digit_required"
  );
  const mobile_number_required = GetTranslationData(
    "UIMasterAdmin",
    "mobile_number_required"
  );
  const email_invalid_format = GetTranslationData(
    "UIMasterAdmin",
    "email_invalid_format"
  );
  const email_required = GetTranslationData("UIMasterAdmin", "email_required");
  const first_name_label = GetTranslationData(
    "UIMasterAdmin",
    "first_name_label"
  );
  const last_name_label = GetTranslationData(
    "UIMasterAdmin",
    "last_name_label"
  );
  const first_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "first_name_placeholder"
  );
  const last_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "last_name_placeholder"
  );
  const email_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "email_placeholder"
  );
  const mobile_number_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "mobile_number_placeholder"
  );
  const email_label = GetTranslationData("UIMasterAdmin", "email_label");
  const mobile_number_label = GetTranslationData(
    "UIMasterAdmin",
    "mobile_number_label"
  );
  const role_name = GetTranslationData("UIMasterAdmin", "role_name");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const please_select_one_role = GetTranslationData("UIMasterAdmin", "please_select_one_role");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData("UIMasterAdmin", "status_required");
  // options for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    firstName: Yup.string().required(first_name_required),
    lastName: Yup.string().required(last_name_required),
    mobile: Yup.string()
      .matches(/^\d{10}$/, mobil_10_digit_required)
      .required(mobile_number_required),
    email: Yup.string().email(email_invalid_format).required(email_required),
    roleId: Yup.string().required(please_select_one_role),
    enabled: Yup.string().required(status_required),
  });
  //to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const userMasterdata = {
        ...values,
        enabled: typeof values?.enabled === 'boolean' ? values.enabled : values?.enabled === 'true',
        deleted: false,
        clientId: 6,
        mobile:typeof values?.mobile === "string"
        ? values.mobile
        : JSON.stringify(values?.mobile),
        roleId: values.roleId,
        ...(userMasterData && { id: userMasterData.id }),
      };
      dispatch(onPostuserMaster(userMasterdata));
      setInitialValue({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        roleId: "",
        enabled: "",
      })
      setSelectedRole("")
    }
  };
  useEffect(() => {
    if (userMasterData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(userMasterData);
      setSelectedRole(userMasterData.roleId)
    }
  }, [userMasterData]);
  useEffect(() => {
    if (getUserMaster?.post_status_code === "201") {
      toast.success(getUserMaster.postMessage);
      dispatch(onGetuserMaster());
      dispatch(onPostuserMasterReset());
    } else if (getUserMaster?.post_status_code==="205") {
      setuserMasterData(null)
      toast.success(getUserMaster.postMessage);
      dispatch(onGetuserMaster())
      dispatch(onUpdateuserMasterReset())
      dispatch(onPostuserMasterReset());
    }else if (getUserMaster?.post_status_code) {
      toast.error(getUserMaster.postMessage);
      dispatch(onPostuserMasterReset())
    }
  }, [getUserMaster]);

  useEffect(() => {
    dispatch(onGetUserRole());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{user_master_label}</h4>
              </div>
              <div className="card-body">

                {roleList?.isgetLoading ||  getUserMaster?.isUpdateLoading || getUserMaster?.isPostLoading? (
                  <div style={{ height: "200px" }}>
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
                              <label>{first_name_label}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="firstName"
                                className={`form-control ${
                                  errors.firstName && touched.firstName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={first_name_placeholder}
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {last_name_label}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="lastName"
                                className={`form-control ${
                                  errors.lastName && touched.lastName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={last_name_placeholder}
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {email_label}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="email"
                                name="email"
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={email_placeholder}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {mobile_number_label}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="mobile"
                                className={`form-control ${
                                  errors.mobile && touched.mobile
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={mobile_number_placeholder}
                              />
                              <ErrorMessage
                                name="mobile"
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
                                className={`form-select ${errors.enabled && touched.enabled
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
                            <div className="col-lg-12 br pt-2 pb-2 mt-2">
                              <label htmlFor="name-f">{role_name}</label>
                              <div className="row ml-4">
                                {console.log(roleList?.userRoleData)}
                                {Array.isArray(roleList?.userRoleData) &&
                                  roleList?.userRoleData?.map(
                                    (userRole, index) => (
                                      (userRole?.enabled) && (
                                      <div
                                        key={index}
                                        className="form-check mt-2 col-lg-3"
                                      >
                                        <Field
                                          type="checkbox"
                                          className="form-check-input"
                                          name="roleId"
                                          value={userRole.id}
                                          checked={selectedRole === userRole.id}
                                          onChange={() => {
                                            const newSelectedRole =
                                              selectedRole === userRole.id
                                                ? ""
                                                : userRole.id;
                                            setSelectedRole(newSelectedRole);
                                            setFieldValue(
                                              "roleId",
                                              newSelectedRole
                                            );
                                          }}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={userRole.id}
                                        >
                                          {userRole.name}
                                        </label>
                                      </div>
                                    )
                                  ))}
                              </div>

                              <ErrorMessage
                                name="roleId"
                                component="div"
                                className="error-message"
                              />

                            </div>
                            <div className="col-sm-4 mb-4">
                                <Button
                                  text={userMasterData ? update : submit}
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

export default UserMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
