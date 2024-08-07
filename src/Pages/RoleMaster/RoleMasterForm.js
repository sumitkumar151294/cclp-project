import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import Loader from "../../Components/Loader/Loader";
import {
  onGetUserRole,
  onPostUserRole,
  onPostUserRoleReset,
  onUpdateUserRole,
  onUpdateUserRoleReset,
} from "../../Store/Slices/userRoleSlice";
import {
  onGetUserRoleModuleAccess,
  onPostUserRoleModuleAccess,
  onPostUserRoleModuleAccessReset,
  onUpdateUserRoleModuleAccess,
} from "../../Store/Slices/userRoleModuleAccessSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const RoleMasterForm = ({ data, setData }) => {
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [moduleAccess, setModuleAccess] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  // to get labels and placeholder from translation
  const roleMasterLabel = GetTranslationData("UIMasterAdmin", "Role_master");
  const roleName = GetTranslationData("UIMasterAdmin", "role_name");
  const selectall = GetTranslationData("UIMasterAdmin", "selectall");
  const module_access = GetTranslationData("UIMasterAdmin", "module-access");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const checkBox_Error = GetTranslationData("UIMasterAdmin", "checkbox_error");
  const view = GetTranslationData("UIMasterAdmin", "view");
  const add = GetTranslationData("UIMasterAdmin", "add");
  const edit = GetTranslationData("UIMasterAdmin", "edit");
  const description = GetTranslationData("UIMasterAdmin", "description");
  const mandatory_Req_Label = GetTranslationData(
    "UIMasterAdmin",
    "role_Req_Label"
  );
  const description_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "description_placeholder"
  );
  // to get role master data from redux store
  const userRoleData = useSelector((state) => state?.userRoleReducer);
  // to get module data from redux store
  const moduleAccessData = useSelector((state) => state?.moduleReducer?.data);
  // to get user-role-access data from redux store
  const getModuleAccessData = useSelector(
    (state) => state.userRoleModuleAccessReducer
  );

  // initial values for the input fields
  const initialValues = {
    name: "",
    description: "",
    modules: [],
  };
  // to validate form using Yup schema
  const validateForm = yup.object({
    name: yup.string().required(mandatory_Req_Label),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateForm,
      onSubmit: (values, action) => {
        values.modules = [...moduleAccess];
        const postData = {
          createdBy: 0,
          description: values?.description,
          enabled: true,
          name: values?.name,
          updatedBy: 0,
        };
        if (moduleAccess.length === 0) {
          setCheckBoxError(true);
          return;
        }
        if (data) {
          postData.id = data.id;
          dispatch(onUpdateUserRole(postData));
          //setData();
        } else {
          dispatch(onPostUserRole(postData));
        }
        setIsSubmit(true);
        setSelectAll(false);
        action.resetForm();
      },
    });
  // to handle checkbox changes
  const handleCheckboxChange = (moduleName, accessType) => {
    const newModuleAccess = [...moduleAccess];
    const moduleIndex = newModuleAccess.findIndex(
      (mod) => mod.name === moduleName
    );

    if (moduleIndex >= 0) {
      const updatedModule = { ...newModuleAccess[moduleIndex] };

      if (accessType === "view") {
        updatedModule.view = !updatedModule.view;
      } else if (accessType === "add") {
        updatedModule.add = !updatedModule.add;
        if (updatedModule.add && !updatedModule.view) {
          updatedModule.view = true;
        }
      } else if (accessType === "edit") {
        updatedModule.edit = !updatedModule.edit;
        if (updatedModule.edit && !updatedModule.view) {
          updatedModule.view = true;
        }
        if (updatedModule.edit && !updatedModule.add) {
          updatedModule.add = true;
        }
      }
      newModuleAccess[moduleIndex] = updatedModule;
    } else {
      const newAccess = {
        name: moduleName,
        view:
          accessType === "view" ||
          accessType === "add" ||
          accessType === "edit",
      };
      if (accessType === "add") {
        newAccess.add = true;
      }
      if (accessType === "edit") {
        newAccess.add = true;
        newAccess.edit = true;
      }
      newModuleAccess.push(newAccess);
    }
    setModuleAccess(newModuleAccess);
    setCheckBoxError(false);
  };
  // to handle select all module
  const handleSelectAll = () => {
    if (selectAll) {
      setModuleAccess([]);
    } else {
      const allModules = moduleAccessData.map((data) => {
        const existingModule = moduleAccess.find(
          (mod) => mod.name === data.name
        );
        return {
          name: data.name,
          view: true,
          add: existingModule?.add || false,
          edit: existingModule?.edit || false,
        };
      });
      setModuleAccess(allModules);
    }
    setSelectAll(!selectAll);
  };
  // to update module access data on changes
  useEffect(() => {
    debugger
    if (userRoleData?.postRoleData?.length > 0 && moduleAccessData) {
      const accessPostData = moduleAccessData.map((data) => {
        const existingModule = moduleAccess.find(
          (mod) => mod.name === data.name
        );
        return {
          roleId: userRoleData?.postRoleData?.[0]?.roleId,
          moduleId: data.id,
          viewAccess: existingModule?.view || false,
          addAccess: existingModule?.add || false,
          editAccess: existingModule?.edit || false,
        };
      });
      dispatch(onPostUserRoleModuleAccess(accessPostData));
      dispatch(onPostUserRoleReset());
      setModuleAccess([]);
    } else if (
      userRoleData?.status_code === "205" &&
      !userRoleData?.updateLoading
    ) {
      let moduleAccessList = getModuleAccessData?.data?.filter(
        (item) => item.roleId === data?.id
      );
      let accessPostData = values?.modules;
      for (let i = 0; i < moduleAccessList.length; i++) {
        for (let j = 0; j < accessPostData.length; j++) {
          if (accessPostData[j].id === moduleAccessList[i].moduleId) {
            moduleAccessList[i].addAccess = accessPostData[j].add;
            moduleAccessList[i].viewAccess = accessPostData[j].view;
            moduleAccessList[i].editAccess = accessPostData[j].edit;
          }
        }
      }
      dispatch(onUpdateUserRoleModuleAccess(moduleAccessList));
      dispatch(onUpdateUserRoleReset());
      setModuleAccess([]);
    }
  }, [userRoleData, moduleAccessData, moduleAccess]);
  // fetch module data and update form data on mount and when module data changes
  useEffect(() => {
    if (data) {
      setValues({
        ...values,
        name: data?.name,
        description: data?.description,
      });
      console.log(data);
      const moduleAccessList = getModuleAccessData?.data?.filter(
        (item) => item.roleId === data.id
      );
      console.log(moduleAccessList, "moduleAccessList");
      const modulesData = moduleAccessData.map((module) => {
        const moduleAccessItem = moduleAccessList.find(
          (mod) => mod.moduleId === module.id
        );
        return {
          id: module?.id,
          name: module?.name,
          view: moduleAccessItem?.viewAccess || false,
          add: moduleAccessItem?.addAccess || false,
          edit: moduleAccessItem?.editAccess || false,
        };
      });
      console.log(modulesData, "modulesData");
      setModuleAccess(modulesData);
    }
  }, [data, moduleAccessData, getModuleAccessData]);
  // to handle form submission and state updates
  useEffect(() => {
    if (isSubmit && userRoleData?.status_code === "201") {
      toast.success(userRoleData?.message);
      dispatch(onGetUserRole());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(onPostUserRoleModuleAccessReset());
    } else if (isSubmit && userRoleData?.status_code === "205") {
      toast.success(userRoleData?.message);
      dispatch(onGetUserRole());
      dispatch(onGetUserRoleModuleAccess());
    } else if (isSubmit && userRoleData?.status_code) {
      toast.error(userRoleData?.message?.data?.ErrorMessage);
      setModuleAccess([]);
    }
  }, [userRoleData]);

  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleMasterLabel}</h4>
              </div>
              <div className="card-body">
                {userRoleData?.postLoading && (
                  <div style={{ height: "300px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                )}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          {roleName}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={`form-control ${
                            errors.name && touched.name ? "is-invalid" : ""
                          }`}
                          name="name"
                          id="name-f"
                          placeholder={roleName}
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <p className="error-message">{errors.name}</p>
                        )}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="description">{description}</label>
                        <InputField
                          type="text"
                          className="form-control"
                          name="description"
                          id="description"
                          placeholder={description_placeholder}
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row top-top mt-2">
                      <div className="col-lg-4">
                        <div className="form-check mb-2 padd">
                          <InputField
                            className="form-check-input"
                            type="checkbox"
                            name="selectAll"
                            id="flexCheckDefault2"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          <label
                            className="form-check-label fnt-17"
                            htmlFor="flexCheckDefault2"
                          >
                            {selectall}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12 br pt-2">
                        <label >{module_access}</label>
                        {Array.isArray(moduleAccessData) &&
                          moduleAccessData.map((data, index) => {
                            const module =
                              moduleAccess.find(
                                (mod) => mod.name === data.name
                              ) || {};
                            return (
                              <div className="row mb-3 mt-3" key={index}>
                                <h4 className="col-lg-3">{data.name}</h4>
                                <div className="col-lg-9 d-flex justify-content-end">
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField
                                        type="checkbox"
                                        className="form-check-input"
                                        name="view"
                                        checked={module.view || false}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            data.name,
                                            "view"
                                          )
                                        }
                                      />
                                      {view}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField
                                        type="checkbox"
                                        className="form-check-input"
                                        name="add"
                                        checked={module.add || false}
                                        onChange={() =>
                                          handleCheckboxChange(data.name, "add")
                                        }
                                      />
                                      {add}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField
                                        type="checkbox"
                                        className="form-check-input"
                                        name="edit"
                                        checked={module.edit || false}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            data.name,
                                            "edit"
                                          )
                                        }
                                      />
                                      {edit}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {checkBoxError && (
                          <span
                            className="form-check-label error-check error-message"
                            htmlFor="basic_checkbox_1"
                          >
                            {checkBox_Error}
                          </span>
                        )}
                        <div className="col-sm-4 mt-4 mb-4">
                          <Button
                            text={data ? update : submit}
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
