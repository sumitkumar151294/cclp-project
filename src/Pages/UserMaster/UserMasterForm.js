/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import { onGetuserMaster, onPostuserMaster, onPostuserMasterReset } from "../../Store/Slices/userMasterSlice";

const UserMasterForm = ({userMasterData}) => {
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state?.userRoleReducer);
  const getUserMaster = useSelector((state) => state?.userMasterReducer);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [intialValue, setInitialValue] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    roleId: "",
  });
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits")
      .required("Mobile Number is required"),
      roleId: Yup.array()
      .min(1, "Select at least one role")
      .max(1, "You can only select one role")
      .test(
        "only-one-role",
        "You can only select one role",
        (value) => value?.length === 1
      ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  //to handle submit
  const handleSubmit = (values) => {
    if (values) {
      const userMasterdata = {
        ...values,
        deleted: false,
        clientId: 4,
        mobile:JSON.stringify(values.mobile),
        roleId:4,
        // roleId:values.roleId,
        ...(userMasterData && { id: userMasterData.id }),

      };
      dispatch(onPostuserMaster(userMasterdata));
    }
  };
  useEffect(()=>{

if(userMasterData){
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  setInitialValue(userMasterData)
}
  },[userMasterData])
  useEffect(() => {
    if (getUserMaster?.status_code === "201") {
      toast.success(getUserMaster.message);
      dispatch(onGetuserMaster());
      dispatch(onPostuserMasterReset());
    } else if (getUserMaster?.status_code) {
      toast.error(getUserMaster.message);
      dispatch(onPostuserMasterReset());
    }
  }, [getUserMaster]);
  useEffect(() => {
    dispatch(onGetUserRole());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">User Master</h4>
              </div>
              <div className="card-body">
                {roleList?.getUserRoleLoading || getUserMaster?.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
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
                              <label>First Name</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="firstName"
                                className={`form-control ${
                                  errors.firstName && touched.firstName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Category Name"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Last Name
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
                                placeholder="Enter Display Order"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Email
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
                                placeholder="Enter Display Order"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Mobile Number
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
                                placeholder="Enter Display Order"
                              />
                              <ErrorMessage
                                name="mobile"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-lg-12 br pt-2 mt-2">
                              <label htmlFor="name-f">{"Role"}</label>
                              <div className="row ml-4">
                                {Array.isArray(roleList?.userRoleData) &&
                                  roleList?.userRoleData?.map(
                                    (userRole, index) => (
                                      <div
                                        key={index}
                                        className="form-check mt-2 col-lg-3"
                                      >
                                        <Field
                                          type="checkbox"
                                          className="form-check-input"
                                          name="roleId"
                                          value={userRole.id}
                                          checked={selectedRoles.includes(
                                            userRole.id
                                          )}
                                          onChange={() => {
                                            const newSelectedRoles =
                                              selectedRoles.includes(
                                                userRole.id
                                              )
                                                ? selectedRoles.filter(
                                                    (roleId) =>
                                                      roleId !== userRole.id
                                                  )
                                                : [
                                                    ...selectedRoles,
                                                    userRole.id,
                                                  ];
                                            setSelectedRoles(newSelectedRoles);
                                            setFieldValue(
                                              "roleId",
                                              newSelectedRoles
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
                                  )}
                              </div>

                              <ErrorMessage
                                name="roleId"
                                component="div"
                                className="error-message"
                              />
                              <div className="col-sm-4 mb-4">
                                <Button
                                  text={"Submit"}
                                  icon="fa fa-arrow-right"
                                  className="btn btn-primary float-right pad-aa mt-2"
                                />
                              </div>
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
