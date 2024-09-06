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

} from "../../Store/Slices/userRoleSlice";
import {
  onGetUserRoleModuleAccess,
  onPostUserRoleModuleAccess,
  onPostUserRoleModuleAccessReset,
} from "../../Store/Slices/userRoleModuleAccessSlice";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ClientId } from "../../Utility/Utility";

const RoleMasterForm = ({ roleMasterData,setRoleMasterData , deleted ,setDeleted  }) => {
  const clientId=ClientId();
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [value, setValues] = useState([]);
  // to get labels and placeholder from translation
  const roleMasterLabel = GetTranslationData("UIMasterAdmin", "role_master");
  const roleName = GetTranslationData("UIMasterAdmin", "role_name");
  const selectall = GetTranslationData("UIMasterAdmin", "selectall");
  const module_access = GetTranslationData("UIMasterAdmin", "module_access");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const checkBox_Error = GetTranslationData("UIMasterAdmin", "checkbox_error");
  const view = GetTranslationData("UIMasterAdmin", "view");
  const add = GetTranslationData("UIMasterAdmin", "add");
  const edit = GetTranslationData("UIMasterAdmin", "edit");
  const description = GetTranslationData("UIMasterAdmin", "description");
  const role_master_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "role_master_placeholder"
  );
  const mandatory_Req_Label = GetTranslationData(
    "UIMasterAdmin",
    "role_Req_Label"
  );
  const description_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "description_placeholder"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  // to get data from redux store
  const modulesData = useSelector((state) => state?.moduleReducer?.data);
  const getmoduleLoading = useSelector((state) => state?.moduleReducer);
  const getUserModalAccessData = useSelector(
    (state) => state?.userRoleModuleAccessReducer
  );
  const roleId = useSelector(
    (state) => state?.userRoleReducer?.postRoleData?.[0]?.roleId
  );
  const getUserRoleData = useSelector((state) => state?.userRoleReducer);
  const editModules = roleMasterData
    ? getUserModalAccessData.data.filter(
        (item) => item.roleId === roleMasterData.id
      )
    : [];
  const [intialValue, setInitialValue] = useState({
    name: "",
    description: "",
    enabled:"",
    modules: modulesData.reduce(
      (acc, module) => ({
        ...acc,
        [module.id]: {
          id: 0,
          moduleID: module.id,
          view: false,
          add: false,
          edit: false,
        },
      }),
      {}
    ),
  });
  const reset = {
    name: "",
    description: "",
    enabled:"",
    modules: modulesData.reduce(
      (acc, module) => ({
        ...acc,
        [module.id]: {
          id: 0,
          moduleID: module.id,
          view: false,
          add: false,
          edit: false,
        },
      }),
      {}
    ),
  };
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    name: Yup.string().required(mandatory_Req_Label),
    enabled: Yup.string().required(status_required),
    modules: Yup.object().test(checkBox_Error, (modules) => {
      return Object.values(modules).some(
        (module) => module.view || module.add || module.edit
      );
    }),
  });

// options for status
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
  //to handle form submit
  const handleSubmit = (values) => {
    if (!values) return;
    const roleMasterDataInfo = {
      deleted: false,
      name: values?.name,
      description: values?.description || "",
      clientId: clientId,
        enabled: typeof values?.enabled === 'boolean' ? values.enabled : values?.enabled === 'true',
      ...(roleMasterData && { id: roleMasterData.id }),
    };
    setValues(values.modules);
    setSelectAll(false);
    dispatch(onPostUserRole(roleMasterDataInfo));
  };

  useEffect(() => {
    if (getUserRoleData?.status_code === "200"){
      const modulesData = Object.keys(value).map((moduleId) => {
        const { id, view, add, edit } = value[moduleId];
        return {
          id: id || 0,
          deleted: false,
          roleId: roleMasterData?.id || roleId,
          moduleId: parseInt(moduleId, 10),
          viewAccess: view,
          addAccess: add,
          editAccess: edit,
          clientId: clientId,
        };
      });
      setInitialValue(reset)
      dispatch(onPostUserRoleModuleAccess(modulesData));
      dispatch(onPostUserRoleReset());
    } else if (getUserModalAccessData?.status_code === "200") {

      setDeleted(false)
      toast.success(getUserModalAccessData?.message);
      dispatch(onGetUserRole());
      dispatch(onGetUserRoleModuleAccess());
      dispatch(onPostUserRoleReset())
      dispatch(onPostUserRoleModuleAccessReset());
    }
  }, [getUserRoleData, getUserModalAccessData]);
  useEffect(() => {
    if (roleMasterData) {
      const initialModules = modulesData.reduce((acc, module) => {
        const moduleAccess =
          editModules.find((item) => item.moduleId === module.id) || {};
        return {
          ...acc,
          [module.id]: {
            id: moduleAccess.id || 0,
            moduleID: module.id,
            view: moduleAccess.viewAccess || false,
            add: moduleAccess.addAccess || false,
            edit: moduleAccess.editAccess || false,
          },
        };
      }, {});

      setInitialValue({
      ...roleMasterData,
        modules: initialModules,
      });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [roleMasterData]);

  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleMasterLabel}</h4>
              </div>
              <div className="card-body">
                {(!deleted && getUserRoleData?.isPostLoading||
                getmoduleLoading?.isLoading ||
                getUserModalAccessData?.isLoading) ? (
                  <div style={{ height: "500px" }}>
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
                              <label>{roleName}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={role_master_placeholder}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>{description}</label>
                              <Field
                                type="text"
                                name="description"
                                className={`form-control ${
                                  errors.lastName && touched.lastName
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={description_placeholder}
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                            <label>
                              {status_label}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              name="enabled"
                              component={Dropdown}
                              options={statusOptions}
                              className={`form-select ${
                                errors.enabled && touched.enabled
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
                            <div className="row top-top mt-2">
                              <div className="col-lg-3">
                                <div className="form-check mb-2 padd">
                                  <Field
                                    className="form-check-input"
                                    type="checkbox"
                                    name="selectAll"
                                    checked={selectAll}
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      modulesData.forEach((module) => {
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
                                    {selectall}
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-12 br pt-2">
                                <label>{module_access}</label>
                                {Array.isArray(modulesData) &&
                                  modulesData
                                    .filter((moduleData) => moduleData.enabled) // Filter out disabled modules
                                    .sort(
                                      (a, b) => a.displayOrder - b.displayOrder
                                    ) // Sort by displayOrder
                                    .map((moduleData, index) => {
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
                                                {view}
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
                                                {add}
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
                                                {edit}
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
                              text={roleMasterData ? update : submit}
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
