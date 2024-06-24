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
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const UserMasterForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  //To get the labels from API
  const userMaster = GetTranslationData("UIAdmin", "user_Master_label");
  const email = GetTranslationData("UIAdmin", "email_label");
  const mobile = GetTranslationData("UIAdmin", "mobile_label");
  const role = GetTranslationData("UIAdmin", "role_name_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const firstName = GetTranslationData("UIAdmin", "first-name");
  const lastName = GetTranslationData("UIAdmin", "last-name");
  const admin = GetTranslationData("UIAdmin", "admin_Label");

  //To get the data from redux store
  const onSubmitData = useSelector((state) => state?.userMasterReducer);
  const roleList = useSelector((state) => state?.userRoleReducer);

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
    roles: [],
  };

  // to validate user master form using Yup schema
  const validateForm = yup.object({
    email: yup.string().email().required("Email is required"),
    number: yup.string().required("Phone number is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    roles: yup.array().min(1, "At least one role must be selected").required(),
  });

  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateForm,
      onSubmit: (values, action) => {
        setIsSubmit(true);
        dispatch(onUserSubmit({ values }));
        action.resetForm();
      },
    });

  // to handle user-role checkbox
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;  
    // update Formik values for roles
    setFieldValue("roles", checked
      ? [...values.roles, value]
      : values.roles.filter(role => role !== value)
    );
  };
  //to handle navigation and toast notifications based on user status
  useEffect(() => {
    if (isSubmit && onSubmitData?.status_code === "201") {
      toast.success(onSubmitData?.message);
    } else if (isSubmit && onSubmitData?.status_code) {
      toast.error(onSubmitData?.message);
    }
  }, [isSubmit, onSubmitData]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{userMaster}</h4>
              </div>
              <div className="card-body">
                {onSubmitData?.isLoading && <Loader />}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          {email}
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
                          {mobile}
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
                          {firstName}
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
                          {lastName}
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
                        <label htmlFor="name-f">{role}</label>
                        {/* admin */}
                        <div className="row ml-4">
                          <label className="role_name_bold" htmlFor="name-f">
                            {admin}
                          </label>
                          {Array.isArray(roleList?.userRoleData) &&
                            roleList?.userRoleData?.map((item, index) => (
                              <div
                                key={index}
                                className="form-check mt-2 col-lg-3"
                              >
                                <InputField
                                  id={item.id}
                                  type="checkbox"
                                  className="form-check-input"
                                  name="roles"
                                  value={item.id}
                                  checked={values.roles.includes(item.id)}
                                  onChange={handleCheckboxChange}
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
                        {errors.roles && touched.roles && (
                          <p className="text-danger">{errors.roles}</p>
                        )}
                        <span
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                          style={{ marginLeft: "5px", marginTop: "10px" }}
                        >
                          {requiredLevel}
                        </span>
                        <div className="col-sm-4 mt-2 mb-4">
                          <Button
                            text={submit}
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
