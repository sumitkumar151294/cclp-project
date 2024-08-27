import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetModule,
  onPostModule,
  onPostModuleReset,
  onUpdateModuleMaster,
} from "../../Store/Slices/moduleSlice";
import Loader from "../../Components/Loader/Loader";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {
  onPostuploadImage,
  onPostuploadImageReset,
} from "../../Store/Slices/uploadSlice";

const ModuleMasterForm = ({ moduleMasterData, setModuleMasterData }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();

  // to get labels and placeholder from translation
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const module_name = GetTranslationData("UIMasterAdmin", "module_name");
  const module_master = GetTranslationData("UIMasterAdmin", "module_master");
  const module_name_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "module_name_placeholder"
  );
  const module_route_path = GetTranslationData(
    "UIMasterAdmin",
    "module_route_path"
  );
  const route_path_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "route_path_placeholder"
  );
  const module_icon = GetTranslationData("UIMasterAdmin", "module_icon");
  const module_icon_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "module_icon_placeholder"
  );
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const displayOrderPlaceholder = GetTranslationData(
    "UIMasterAdmin",
    "displayOrderPlaceholder"
  );
  const display_order_required = GetTranslationData(
    "UIMasterAdmin",
    "display_order_required"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const modul_name_required = GetTranslationData(
    "UIMasterAdmin",
    "modul_name_required"
  );
  const Module_route_path_required = GetTranslationData(
    "UIMasterAdmin",
    "Module_route_path_required"
  );

  // to get module data from the Redux store
  const moduleData = useSelector((state) => state?.moduleReducer);
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);
  // initial values for the input fields
  const [initialValue, setInitialValue] = useState({
    name: "",
    routePath: "",
    icon: "",
    displayOrder: "",
    enabled: "", // Default to false (boolean)
  });

  // reset all fields
  const reset = {
    name: "",
    routePath: "",
    icon: "",
    displayOrder: "",
    enabled: "",
  };

  // to validate module master form using Yup schema
  const validations = yup.object({
    name: yup.string().required("Module Name is required"),
    routePath: yup.string().required("Module Route Path is required"),
    displayOrder: yup.string()
      .required(display_order_required)
      .matches(/^[0-9]+$/, "Display Order must be a number"),
    enabled: yup.string().required(status_required), // Validate as boolean
    icon: yup.string().required("Module Icon is required"), // Validate as boolean
  });

  // to handle image changes
  const handleImageChange = (setFieldValue, event) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFieldValue("icon", formData);
  };

  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      if (typeof values.icon === "object") {
        dispatch(onPostuploadImage(values.icon));
        setValues(values);
      } else {
        const moduleData = {
          ...values,
          deleted: false,
          enabled:
            typeof values?.enabled === "boolean"
              ? values.enabled
              : values?.enabled === "true",
          clientId: 6,
          ...(moduleMasterData && { id: values.id }),
        };
        dispatch(onUpdateModuleMaster(moduleData));
        setInitialValue(reset);
      }
    }
  };

  // options for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  useEffect(() => {
    if (uploadImage?.post_status_code === "201") {
      const moduleData = {
        icon: getwebImage,
        clientId: 6,
        deleted: false,
        name: values?.name,
        routePath: values?.routePath,
        displayOrder: values?.displayOrder,
        ...(moduleMasterData && { id: values.id }),
      };
      dispatch(onPostModule(moduleData));
      setInitialValue(reset);
    }
  }, [uploadImage, values]);

  // to handle navigation and toast notifications based on module master status
  useEffect(() => {
    if (moduleData?.status_code === "201") {
      toast.success(moduleData.message);
      dispatch(onPostuploadImageReset());
      dispatch(onPostModuleReset());
      dispatch(onGetModule());
    } else if (moduleData?.status_code === "205") {
      toast.success(moduleData?.message);
      dispatch(onPostuploadImageReset());
      dispatch(onGetModule());
      dispatch(onPostModuleReset());
      setInitialValue(reset);
    } else if (moduleData?.status_code) {
      toast.error(moduleData.message);
      dispatch(onPostuploadImageReset());
      dispatch(onPostModuleReset());
    }
    setIsSubmit(false); // reset the submit state after processing
  }, [moduleData, isSubmit]);
  useEffect(() => {
    if (moduleMasterData) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(moduleMasterData);
    }
  }, [moduleMasterData]);
  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{module_master}</h4>
              </div>
              <div className="card-body">
                {moduleData?.postLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <Formik
                    initialValues={initialValue}
                    validationSchema={validations}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-4">
                            <label htmlFor="name-f">
                              {module_name}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control ${
                                errors.name && touched.name ? "is-invalid" : ""
                              }`}
                              name="name"
                              placeholder={module_name_placeholder}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label htmlFor="routePath">
                              {module_route_path}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              className={`form-control ${
                                errors.routePath && touched.routePath
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="routePath"
                              id="routePath"
                              placeholder={route_path_placeholder}
                            />
                            <ErrorMessage
                              name="routePath"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label htmlFor="icon">
                              {module_icon}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              name="icon"
                              className={`form-control ${
                                errors.icon && touched.icon ? "is-invalid" : ""
                              }`}
                              onChange={(event) =>
                                handleImageChange(setFieldValue, event)
                              }
                            />
                            <ErrorMessage
                              name="icon"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label htmlFor="displayOrder">
                              {display_order}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              type="text"
                              name="displayOrder"
                              className={`form-control ${
                                errors.displayOrder && touched.displayOrder
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="displayOrder"
                              placeholder={displayOrderPlaceholder}
                            />
                            <ErrorMessage
                              name="displayOrder"
                              component="div"
                              className="error-message"
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
                        </div>
                        <div className="col-sm-4 mb-4">
                          <Button
                            text={moduleMasterData ? update : submit}
                            end_icon="fa fa-arrow-right"
                            className="btn btn-primary pad-aa mt-2"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleMasterForm;
