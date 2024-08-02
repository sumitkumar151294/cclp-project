import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetDeal, onPostDeal, onPostDealReset } from "../../Store/Slices/dealSlice";
const sectionTypeOptions = [
  { value: 1, label: "Banner" },
  { value: 2, label: "Offer" },
  { value: 3, label: "Middle" },
  { value: 4, label: "Tope" },
  { value: 5, label: "Bottom" },
];

const DealForm = () => {
  const FILE_SIZE = 160 * 1024;
  const dispatch = useDispatch();
  // to get deal data from redux store
  const dealData=useSelector(state=>state.dealReducer)
  // initial values for the input fields
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    mobImage: "",
    displayOrder: "",
    category: "",
    name: "",
    startDate: "",
    endDate: "",
    dealType: "",
  });
  // options form deal type
  const dealTypeOptions = [
    { value: 1, label: "Common" },
    { value: 2, label: "Unlock Deals" },
  ];
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    webImage: Yup.string().required("Image is required"),
    mobImage: Yup.string().required("Image is required"),
    displayOrder: Yup.string().required("Display Order is required"),
    category: Yup.string().required("Category is required"),
    name: Yup.string().required("Deal Name is required"),
    dealType: Yup.string().required("Deal Type is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const DealFormData = {
        ...values,
        deleted: false,
        enabled: values.enabled ? true : false,
        clientId:0,
        category: values.category,
        name: values.name,
        displayOrder: values.displayOrder,
        webImage: values.webImage,
        mobImage:values.mobImage,
        dealType: values.dealType,
      };
      dispatch(onPostDeal(DealFormData));
    }
  };
  // to handle navigation and toast notifications based on deal category status
  useEffect(() => {
    if (dealData?.post_status_code === "201") {
      toast.success(dealData?.postMessage)
      dispatch(onPostDealReset())
      dispatch(onGetDeal())
    } else if (dealData?.post_status_code) {
      toast.error(dealData.postMessage)
      dispatch(onPostDealReset())
    }
  }, [dealData]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Deal Form</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "200px" }}>
                    <Loader />
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>Deal Name</label>
                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Deal Name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Category
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="category"
                                component={Dropdown}
                                options={sectionTypeOptions}
                                className={`form-select ${
                                  errors.category && touched.category
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="category"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Display Order
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="displayOrder"
                                className={`form-control ${
                                  errors.displayOrder && touched.displayOrder
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Display Order"
                              />
                              <ErrorMessage
                                name="displayOrder"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Web
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="webImage"
                                className={`form-control ${
                                  errors.webImage && touched.webImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) => {
                                  setFieldValue(
                                    "webImage",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              <ErrorMessage
                                name="webImage"
                                component="div"
                                className="error-message"
                              />
                            </div>{" "}
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Phone
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="mobImage"
                                className={`form-control ${
                                  errors.mobImage && touched.mobImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) => {
                                  setFieldValue(
                                    "mobImage",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              <ErrorMessage
                                name="mobImage"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>Start Date</label>
                              <Field
                                type="date"
                                name="startDate"
                                className={`form-control ${
                                  errors.startDate && touched.startDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="startDate"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>End Date</label>
                              <Field
                                type="date"
                                name="endDate"
                                className={`form-control ${
                                  errors.endDate && touched.endDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="endDate"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Deal Type
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealType"
                                component={Dropdown}
                                options={dealTypeOptions}
                                className={`form-select ${
                                  errors.dealType && touched.dealType
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="dealType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-12 form-group mb-0 ">
                              <Button
                                text={"Sumbit"}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
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

export default DealForm;
/* eslint-enable react-hooks/exhaustive-deps */
