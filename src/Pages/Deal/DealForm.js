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
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

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
  // to get labels and placeholders from translation  
  const deal_form = GetTranslationData("UIMasterAdmin","deal_form");
  const deal_name = GetTranslationData("UIMasterAdmin","deal_form");
  const deal_name_placeholder = GetTranslationData("UIMasterAdmin","deal_name_placeholder");
  const deal_category = GetTranslationData("UIMasterAdmin", "deal_category");
  const deal_type = GetTranslationData("UIMasterAdmin", "deal_type");
  const display_order = GetTranslationData("UIMasterAdmin", "display_order");
  const display_order_required = GetTranslationData("UIMasterAdmin","display_order_required");
  const displayOrderPlaceholder = GetTranslationData("UIMasterAdmin","displayOrderPlaceholder");
  const category_name_required = GetTranslationData("UIMasterAdmin","category_name_required");
  const mobile_image_required = GetTranslationData("UIMasterAdmin", "mobile_image_required"); 
  const web_image_required = GetTranslationData("UIMasterAdmin", "web_image_required");
  const deal_name_required = GetTranslationData("UIMasterAdmin","deal_name_required");
  const deal_type_required = GetTranslationData("UIMasterAdmin","deal_type_required");
  const start_date_required = GetTranslationData("UIMasterAdmin", "start_date_required"); 
  const end_date_required = GetTranslationData("UIMasterAdmin", "end_date_required");
  const start_date_label = GetTranslationData("UIMasterAdmin", "start_date_label");
  const end_date_label = GetTranslationData("UIMasterAdmin", "end_date_label");
  const upload_image_for_web = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_web"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const upload_image_for_phone = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_phone"
  );
  // to get data from redux store 
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
    webImage: Yup.string().required(mobile_image_required),
    mobImage: Yup.string().required(web_image_required),
    displayOrder: Yup.string().required(display_order_required),
    category: Yup.string().required(category_name_required),
    name: Yup.string().required(deal_name_required),
    dealType: Yup.string().required(deal_type_required),
    startDate: Yup.string().required(start_date_required),
    endDate: Yup.string().required(end_date_required),
  });
 
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
                <h4 className="card-title">{deal_form}</h4>
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
                              <label>{deal_name}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                placeholder={deal_name_placeholder}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {deal_category}
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
                                {deal_type}
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
                                {display_order}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="displayOrder"
                                className={`form-control ${errors.displayOrder && touched.displayOrder
                                    ? "is-invalid"
                                    : ""
                                  }`}
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
                                {upload_image_for_web}
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
                                {upload_image_for_phone}
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
                              <label>{start_date_label}</label>
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
                              <label>{end_date_label}</label>
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
                                text={submit}
                                end_icon="fa fa-arrow-right"
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
