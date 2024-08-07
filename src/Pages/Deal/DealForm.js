import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetDeal, onPostDeal, onPostDealReset } from "../../Store/Slices/dealSlice";
import { onPostuploadImage, onPostuploadImageReset, onPostuploadMobileImage, onPostuploadMobileImageReset } from "../../Store/Slices/uploadSlice";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const DealForm = () => {
  const todayDate = getTodayDate();
  const [values, setValues] = useState(null);
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);

  const dealCategoryData = useSelector((state) => state.dealCategoryReducer?.getDealCategoryData);
  const dealCategoryOptions = dealCategoryData?.map(dealCategory => ({
    value: dealCategory.id,
    label: dealCategory.name,
  }));
  const dispatch = useDispatch();
  // to get deal data from redux store
  const dealData = useSelector(state => state.dealReducer)
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
    { value: "Common", label: "Common" },
    { value: "UnlockDeals", label: "Unlock Deals" },
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
  // {
  //   "id": 0,
  //   "enabled": true,
  //   "deleted": true,
  //   "createdBy": 0,
  //   "updatedBy": 0,
  //   "clientId": 0,
  //   "webImage": "string",
  //   "mobImage": "string",
  //   "dealType": "string",
  //   "name": "string",
  //   "category": 0,
  //   "displayOrder": 0,
  //   "startDate": "2024-08-02T10:51:18.769Z",
  //   "endDate": "2024-08-02T10:51:18.769Z"
  // }
  // to handle form submit



  const handleImageChange = (setFieldValue, event, isMobile) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (isMobile) {
      setFieldValue("mobImage", formData);
    } else {
      setFieldValue("webImage", formData);
    }
  };
  const handleSubmit = (values) => {
    if (values) {
      dispatch(onPostuploadImage(values.webImage));
      dispatch(onPostuploadMobileImage(values.mobImage));
      setValues(values);
    }
  };
  useEffect(() => {
    if (
      uploadImage?.postMobileStatusCode == "201" &&
      uploadImage?.post_status_code == "201"
    ) {
      const dealData = {
        webImage: getwebImage,
        mobImage: getmobImage,
        clientId: 4,
        deleted: false,
        displayOrder: JSON.stringify(values?.displayOrder),
        startDate:values.startDate,
        endDate:values.endDate,
        name:values.name,
        dealType:values.dealType,
        category:values?.category
      };
      dispatch(onPostDeal(dealData));
    }
  }, [uploadImage, values]);

  useEffect(() => {
    if (dealData?.post_status_code === "201") {
      toast.success(dealData?.postMessage)
      dispatch(onGetDeal())
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostDealReset())
    } else if (dealData?.post_status_code) {
      toast.error(dealData.postMessage)
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
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
                {dealData?.isPostLoading ? (
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>Deal Name</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${errors.name && touched.name
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
                                Deal Category
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="category"
                                component={Dropdown}
                                options={dealCategoryOptions}
                                className={`form-select ${errors.category && touched.category
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
                            <div className="col-sm-4 form-group mb-4 ">
                              <label>
                                Deal Type
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealType"
                                component={Dropdown}
                                options={dealTypeOptions}
                                className={`form-select ${errors.dealType && touched.dealType
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Display Order
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="displayOrder"
                                className={`form-control ${errors.displayOrder && touched.displayOrder
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
                                className={`form-control ${errors.webImage && touched.webImage
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event, false)
                                }


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
                                className={`form-control ${errors.mobImage && touched.mobImage
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event, true)
                                }

                              />
                              <ErrorMessage
                                name="mobImage"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2 mt-2">
                              <label>Start Date</label>
                              <Field
                                type="date"
                                name="startDate"
                                min={todayDate}
                                className={`form-control ${errors.startDate && touched.startDate
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
                            <div className="col-sm-4 form-group mb-2 mt-2">
                              <label>End Date</label>
                              <Field
                                type="date"
                                name="endDate"
                                min={todayDate}
                                className={`form-control ${errors.endDate && touched.endDate
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

                            <div className="col-sm-12 form-group mb-0 ">
                              <Button
                                text={"Submit"}
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
