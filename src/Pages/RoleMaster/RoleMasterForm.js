import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetUserRole,
  onPostUserRole,
  onPostUserRoleReset,
  onUpdateUserRoleReset,
} from "../../Store/Slices/userRoleSlice";
import {
  onGetUserRoleModuleAccess,
  onPostUserRoleModuleAccess,
  onPostUserRoleModuleAccessReset,
} from "../../Store/Slices/userRoleModuleAccessSlice";

const RoleMasterForm = ({ roleMasterData }) => {
  console.log(roleMasterData)

  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const moduleAccessData = useSelector((state) => state?.moduleReducer?.data);
  const getmoduleLoading = useSelector((state) => state?.moduleReducer);
  const getUserModalAccessData = useSelector(
    (state) => state?.userRoleModuleAccessReducer
  );
  const editModules = roleMasterData
  ? getUserModalAccessData.data.filter(item => item.roleId === roleMasterData.id)
  : [];
  const [value, setValues] = useState([]);
  const [intialValue, setInitialValue] = useState({
    name: "",
    description: "",
    modules: moduleAccessData.reduce(
      (acc, module) => ({
        ...acc,
        [module.id]: {
          moduleID: module.id,
          view: false,
          add: false,
          edit: false,
        },
      }),
      {}
    ),
  });

  // to validate form using Yup schema
  const validations = Yup.object().shape({
    name: Yup.string().required("Role Name is Required"),
    modules: Yup.object().test(
      "at-least-one-module",
      "You must select at least one module with at least one access right (view, add, edit).",
      (modules) => {
        return Object.values(modules).some(
          (module) => module.view || module.add || module.edit
        );
      }
    ),
  });

  const roleId = useSelector(
    (state) => state?.userRoleReducer?.postRoleData?.[0]?.roleId
  );
  const getUserRoleData = useSelector((state) => state?.userRoleReducer);

  //to handle form submit
  const handleSubmit = (values) => {
    if (!values) return;
    const roleMasterDataInfo = {
      deleted: false,
      name: values?.name,
      description: values?.description || "",
      clientId: 4,
      ...(roleMasterData && { id: roleMasterData.id }),
    };
    setValues(values.modules);
    setSelectAll(false);
    dispatch(onPostUserRole(roleMasterDataInfo));
  };

  useEffect(() => {
    if (getUserRoleData?.status_code === "201" || getUserRoleData?.status_code === "205") {
      const modulesData = Object.keys(value).map((moduleId) => {
        const { view, add, edit } = value[moduleId];
        return {
          id: 0,
          deleted: false,
          roleId: roleMasterData?.id || roleId,
          moduleId: parseInt(moduleId, 10),
          viewAccess: view,
          addAccess: add,
          editAccess: edit,
          clientId: 4,
        };
      });

      dispatch(onPostUserRoleModuleAccess(modulesData));
      dispatch(onPostUserRoleReset());
    } else if (getUserModalAccessData?.status_code === "201") {
      toast.success(getUserModalAccessData?.message);
      dispatch(onGetUserRole());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(onPostUserRoleModuleAccessReset());
    }
  }, [getUserRoleData, getUserModalAccessData]);
  useEffect(() => {
    if (roleMasterData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      const prefilledModules = moduleAccessData.reduce((acc, module) => {
        const moduleAccess = editModules.find((access) => access.moduleId === module.id);
        acc[module.id] = {
          moduleID: module.id,
          view: moduleAccess ? moduleAccess.viewAccess : false,
          add: moduleAccess ? moduleAccess.addAccess : false,
          edit: moduleAccess ? moduleAccess.editAccess : false,
        };
        return acc;
      }, {});
  
      setInitialValue({
        ...roleMasterData,
        modules: prefilledModules
      });
    }
  }, [roleMasterData]);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{"Role Name"}</h4>
              </div>
              <div className="card-body">
                {getUserRoleData?.isPostLoading ||
                getmoduleLoading?.isLoading ||
                getUserModalAccessData?.isLoading ? (
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
                              <label>{"Role Name"}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={"Enter Role Name"}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>{"Description"}</label>
                              <Field
                                type="text"
                                name="description"
                                className={`form-control ${
                                  errors.lastName && touched.lastName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={"Enter Description"}
                              />
                            </div>

                            <div className="row top-top mt-2">
                              <div className="col-lg-4">
                                <div className="form-check mb-2 padd">
                                  <Field
                                    className="form-check-input"
                                    type="checkbox"
                                    name="selectAll"
                                    checked={selectAll}
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      moduleAccessData.forEach((module) => {
                                        setFieldValue(
                                          `modules.${module.id}.view`,
                                          isChecked
                                        );
                                        setSelectAll(isChecked);
                                      });
                                    }}
                                  />
                                  <label
                                    className="form-check-label fnt-17"
                                    htmlFor="flexCheckDefault2"
                                  >
                                    {"selectall"}
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-12 br pt-2">
                                <label>{"module_access"}</label>
                                {Array.isArray(moduleAccessData) &&
                                  moduleAccessData.map((moduleData, index) => {
                                    return (
                                      <div
                                        className="row mb-3 mt-3"
                                        key={index}
                                      >
                                        <h4 className="col-lg-3">
                                          {moduleData.name}
                                        </h4>
                                        <div className="col-lg-9 d-flex justify-content-end">
                                          <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                              <Field
                                                type="checkbox"
                                                className="form-check-input"
                                                name={`modules.${moduleData.id}.view`}
                                              />
                                              {"view"}
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                              <Field
                                                type="checkbox"
                                                className="form-check-input"
                                                name={`modules.${moduleData.id}.add`}
                                                onChange={(e) => {
                                                  const isChecked =
                                                    e.target.checked;
                                                  setFieldValue(
                                                    `modules.${moduleData.id}.add`,
                                                    isChecked
                                                  );
                                                  if (isChecked) {
                                                    setFieldValue(
                                                      `modules.${moduleData.id}.view`,
                                                      true
                                                    );
                                                  }
                                                }}
                                              />
                                              {"add"}
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                              <Field
                                                type="checkbox"
                                                className="form-check-input"
                                                name={`modules.${moduleData.id}.edit`}
                                                onChange={(e) => {
                                                  const isChecked =
                                                    e.target.checked;
                                                  setFieldValue(
                                                    `modules.${moduleData.id}.edit`,
                                                    isChecked
                                                  );
                                                  if (isChecked) {
                                                    setFieldValue(
                                                      `modules.${moduleData.id}.view`,
                                                      true
                                                    );
                                                    setFieldValue(
                                                      `modules.${moduleData.id}.add`,
                                                      true
                                                    );
                                                  }
                                                }}
                                              />
                                              {"edit"}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                              <ErrorMessage
                                name="modules"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 mb-4">
                            <Button
                              text={roleMasterData ? "update" : "submit"}
                              end_icon="fa fa-arrow-right"
                              className="btn btn-primary float-right pad-aa mt-2"
                            />
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

export default RoleMasterForm;