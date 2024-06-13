import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { onUserSubmit } from "../../Store/Slices/userMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../Components/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";

const UserMasterForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  //To get the data from redux store
  const onSubmitData = useSelector((state) => state?.userMasterReducer);
  const roleList = useSelector((state) => state?.userRoleReducer);
  const clientList = useSelector(
    (state) => state.clientMasterReducer?.clientData
  );
  // user-role get api call
  useEffect(() => {
    dispatch(onGetUserRole());
    dispatch(onClientMasterSubmit());
  }, [dispatch]);
  // initial values for the input fields
  const initialValues = {
    email: "",
    number: "",
    firstName: "",
    lastName: "",
  };
  // to validate login form using Yup schema
  const validateForm = yup.object({
    email: yup.string().email().required("Email is required"),
    number: yup.string().required("Phone number is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsSubmit(true);
      dispatch(onUserSubmit({ values }));
      action.resetForm();
    },
  });
  //to handle navigation and toast notifications based on user status
  useEffect(() => {
    if (isSubmit && onSubmitData?.status_code === "201") {
      toast.success(onSubmitData?.message);
    } else if (isSubmit && onSubmitData?.status_code) {
      toast.error(onSubmitData?.message);
    }
  }, [onSubmitData]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">User Master</h4>
              </div>
              <div className="card-body">
                {onSubmitData?.isLoading && <Loader />}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          Email
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          name="email"
                          className={` ${
                            errors.email ? "border-danger" : "form-control"
                          }`}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          Mobile
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="number"
                          name="number"
                          className={` ${
                            errors.number ? "border-danger" : "form-control"
                          }`}
                          onChange={handleChange}
                          placeholder="Mobile Number"
                          value={values.number}
                        />
                        {errors.number && touched.number && (
                          <p className="text-danger">{errors.number}</p>
                        )}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          First Name
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.firstName ? "border-danger" : "form-control"
                          }`}
                          name="firstName"
                          id="name-f"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={values.firstName}
                        />
                        {errors.firstName && touched.firstName && (
                          <p className="text-danger">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          Last Name
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${
                            errors.lastName ? "border-danger" : "form-control"
                          }`}
                          name="lastName"
                          id="name-f"
                          placeholder="Last Name"
                          onChange={handleChange}
                          value={values.lastName}
                        />
                        {errors.lastName && touched.lastName && (
                          <p className="text-danger">{errors.lastName}</p>
                        )}
                      </div>
                      <div className="col-lg-12 br pt-2">
                        <label htmlFor="name-f">Client</label>
                        <div className="row ml-4">
                          {Array.isArray(clientList) &&
                            clientList?.map((item) => (
                              <div className="form-check mt-2 col-lg-3">
                                <InputField
                                  className="form-check-input"
                                  type="checkbox"
                                  name={item.name}
                                  value={item.id}
                                  id={`flexCheckDefault-${item.id}`}
                                  //checked={}
                                  //onChange={}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexCheckDefault-${item.id}`}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                          {/* <p className="text-danger">
                              {errors.accessClientIds}
                            </p> */}
                        </div>
                      </div>
                      <div className="col-lg-12 br pt-2">
                        <label htmlFor="name-f">Role Name</label>
                        {/* admin */}
                        <div className="row ml-4">
                          <label className="role_name_bold" htmlFor="name-f">
                            Admin
                          </label>
                          {Array.isArray(roleList?.userRoleData) &&
                            roleList?.userRoleData?.map((item) => (
                              <div
                                key={item?.id}
                                className="form-check mt-2 col-lg-3"
                              >
                                <InputField
                                  id={item.id}
                                  type="checkbox"
                                  className="form-check-input"
                                  name="role"
                                  value={item.id}
                                  // checked={}
                                  // onChange={}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={item.id}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                        </div>
                        <p className="text-danger">{errors.clientRoleId}</p>
                        <span
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                          style={{ marginLeft: "5px", marginTop: "10px" }}
                        >
                          All the * fields are required.
                        </span>
                        <div className="col-sm-4 mt-2 mb-4">
                          <Button
                            text="Submit"
                            icon={"fa fa-arrow-right"}
                            className="btn btn-primary btn-sm float-right p-btn mt-2"
                          />
                          <ToastContainer />
                        </div>
                      </div>
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

export default UserMasterForm;
