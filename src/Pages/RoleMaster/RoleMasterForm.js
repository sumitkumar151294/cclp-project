import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import { onPostUserRole } from "../../Store/Slices/userRoleSlice";
import { useDispatch, useSelector } from "react-redux";
import {useFormik} from "formik";
import  * as yup from "yup";

// Component for RoleMasterForm
const RoleMasterForm = ({ data, setData }) => {
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [isSubmit,setIsSubmit]=useState(false);
  const dispatch=useDispatch();
  //to get role master data from redux store
  const userRoleData = useSelector((state) => state?.userRoleReducer);
  // to get module data from redux  store
  const  moduleAccessData = useSelector((state) => state?.moduleReducer?.data);
  // initial values for the input fields
  const initialValues={
    name:"",
    description:""
  };
  // to validate login form using Yup schema
  const validateForm=yup.object({
      name:yup.string().required("Name is required"),
  });
  // to handle form using useFormik hook
  const {values,errors,touched,handleChange,handleSubmit} = useFormik({
    initialValues:initialValues,
    validationSchema:validateForm,
    onSubmit:(values,action)=>{
        setIsSubmit(true);
        dispatch(onPostUserRole({values}));
        action.resetForm();
     },
  });
 // to handle navigation and toast notifications based on user role status
  useEffect(() => {
    if ( isSubmit && userRoleData?.status_code === "201" ) {
      toast.success(userRoleData?.message);
    }else if (isSubmit && userRoleData?.status_code){
      toast.error(userRoleData?.message);
    }
  }, [userRoleData]);
 
  // Render the RoleMasterForm component
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Role Master</h4>
              </div>
              <div className="card-body">
                {userRoleData?.postLoading && <Loader />}
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            Role Name
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="name"
                            id="name-f"
                            placeholder=""
                            value={values.name}
                            onChange={handleChange}
                          />
                          {errors.name && touched.name && <p className="text-danger">{errors.name}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="description">
                            Description
                          </label>
                          <InputField
                            type="text"
                            className= "form-control"
                            name="description"
                            id="description"
                            placeholder=""
                            value={values.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row top-top">
                        <div className="col-lg-4">
                          <div className="form-check  mb-2 padd">
                            <InputField
                              className="form-check-input"
                              type="checkbox"
                              name="selectAll"
                              // value={
                              //   formData?.modules?.length > 0 &&
                              //   formData?.modules.every(
                              //     (module) => module.checked
                              //   )
                              // }
                              id="flexCheckDefault2"
                              // checked={isSelectAllChecked}
                              // onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label fnt-17"
                              htmlFor="flexCheckDefault2"
                            >
                              Select All
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-12 br pt-2">
                          <label htmlFor="name-f">Module Access</label>
                             {moduleAccessData?.map((data,index)=>(
                                <div className="row mb-3 mt-3" >
                                 <h4 className="col-lg-3">
                                   {data.name}
                                  </h4> 
                                  <div className="col-lg-9 d-flex justify-content-end">
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <InputField
                                          type="checkbox"
                                        //  id={id}
                                          className="form-check-input"
                                          name="view"
                                          // value={checked}
                                          // checked={checked}
                                          // onChange={handleInputChange}
                                        />
                                        View
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <InputField
                                          type="checkbox"
                                         // id={id}
                                          className="form-check-input"
                                          name="add"
                                          // value={addAccess}
                                          // checked={addAccess}
                                          // onChange={handleInputChange}
                                        />
                                       Add
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <label className="form-check-label">
                                        <InputField
                                          type="checkbox"
                                         // id={id}
                                          className="form-check-input"
                                          name="edit"
                                          // value={editAccess}
                                          // checked={editAccess}
                                          // onChange={handleInputChange}
                                        />
                                        Edit
                                      </label>
                                    </div>
                                  </div>
                                </div>
                            ))}
                          {/* Checkbox Error Message */}
                          {checkBoxError && (
                            <span
                              className="form-check-label error-check text-danger"
                              htmlFor="basic_checkbox_1"
                            >
                              At least one module must be selected.
                            </span>
                          )}
                          <div className="col-sm-4 mt-4 mb-4">
                            <Button
                              text="Submit"
                              icon="fa fa-arrow-right"
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

export default RoleMasterForm;
