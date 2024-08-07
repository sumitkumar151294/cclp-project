import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {
  onGetDealCoupon,
  onPostDealCoupon,
  onPostDealCouponReset,
} from "../../Store/Slices/dealCouponSlice";
import {
  onPostuploadImage,
  onPostuploadImageReset,
} from "../../Store/Slices/uploadSlice";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import Select from "react-select";

const typeOfCoupoun = [
  { value: "Static", label: "Static" },
  { value: "Dynamic", label: "Dynamic" },
  { value: "NoCode", label: "No Code" },
  { value: "Membership", label: "Membership" },
];

const DealCouponForm = () => {
  const [showFields, setShowFields] = useState(false);
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  const dealCouponData = useSelector((state) => state.dealCouponReducer);
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const uploadImage = useSelector((state) => state.uploadReducer);
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    coupounCode: "",
    dealId: "",
    typeOfCoupoun: "",
    image: "",
    description: "",
    terms: "",
    month: [],
    week: [],
    segmentId: "",
    cta: "",
    titie: "",
  });
  const dealCategoryData = useSelector(
    (state) => state.dealCategoryReducer?.getDealCategoryData
  );
  const getDealData = useSelector((state) => state.dealReducer?.getDealData);
  const dealOptions = getDealData?.map((dealCategory) => ({
    value: dealCategory.id,
    label: dealCategory.name,
  }));
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    dealId: Yup.string().required("Deal is required"),
    month: Yup.string().required("Start Data is required"),
    week: Yup.string().required("End Date is required"),
    segmentId: Yup.string().required("Segment is required"),
    typeOfCoupoun: Yup.string().required("Coupon Type is required"),
    image: Yup.string().required("Image Type is required"),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      debugger;
      dispatch(onPostuploadImage(values.image));
      setValues(values);
    }
  };
  const handleImageChange = (setFieldValue, event) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFieldValue("image", formData);
  };
  const monthNames = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(0, index);
    const month = date.toLocaleString("default", { month: "long" });
    return { value: month, label: month };
  });
  const weekDayNames = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(0, 0, index + 1); // Start at Sunday
    const day = date.toLocaleString('default', { weekday: 'long' });
    return { value: day, label: day };
  });

  useEffect(() => {
    if (uploadImage?.post_status_code == "201") {
      const dealCouponData = {
        image: getwebImage,
        clientId: 4,
        deleted: false,
        displayOrder: JSON.stringify(values?.displayOrder),
        segmentId: 10,
        cta: values?.cta,
        typeOfCoupoun: values?.typeOfCoupoun,
        dealid: values?.dealId,
        title: values?.title,
        terms: values?.terms,
        month: values?.month,
        week: values?.week,
        coupounCode: values?.coupounCode,
        description: JSON.stringify(values?.description),
      };
      dispatch(onPostDealCoupon(dealCouponData));
    }
  }, [uploadImage, values]);
  // to handle navigation and toast notifications based on deal coupon status
  useEffect(() => {
    if (dealCouponData?.post_status_code === "201") {
      toast.success(dealCouponData.postMessage);
      dispatch(onPostDealCouponReset());
      dispatch(onGetDealCoupon());
    } else if (dealCouponData?.post_status_code) {
      toast.error(dealCouponData?.postMessage);
      dispatch(onPostuploadImageReset());
      dispatch(onPostDealCouponReset());
    }
  }, [dealCouponData]);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Deal Coupoun</h4>
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
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Type Of Coupoun
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="typeOfCoupoun"
                                component={Dropdown}
                                options={typeOfCoupoun}
                                className={`form-select ${
                                  errors.typeOfCoupoun && touched.typeOfCoupoun
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  setShowFields(
                                    e === "Static" || e === "Membership"
                                  );
                                }}
                              />
                              <ErrorMessage
                                name="typeOfCoupoun"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            {showFields && (
                              <div className="col-sm-4 form-group mb-4">
                                <label> Coupoun Code</label>
                                <Field
                                  type="text"
                                  name="coupounCode"
                                  className={`form-control ${
                                    errors.coupounCode && touched.coupounCode
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Coupoun Code"
                                />
                                <ErrorMessage
                                  name="coupounCode"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}

                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Deal
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealId"
                                options={dealOptions}
                                component={Dropdown}
                                className={`form-select ${
                                  errors.dealId && touched.dealId
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="dealId"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2 ">
                              <label>
                                Call To Action
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="cta"
                                className={`form-control ${
                                  errors.cta && touched.cta ? "is-invalid" : ""
                                }`}
                                placeholder="Enter Call To Action"
                              />
                              <ErrorMessage
                                name="cta"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image For Phone
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="image"
                                className={`form-control ${
                                  errors.image && touched.image
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event)
                                }
                              />
                              <ErrorMessage
                                name="image"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Title
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="title"
                                className={`form-control ${
                                  errors.title && touched.title
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Title"
                              />
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Description
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="description"
                                className={`form-control ${
                                  errors.description && touched.description
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Description"
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Segment
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="segmentId"
                                component={Dropdown}
                                options={typeOfCoupoun}
                                className={`form-select ${
                                  errors.segmentId && touched.segmentId
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="segmentId"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>Select Months</label>
                              <Select
                                isMulti
                                name="months"
                                options={monthNames}
                                className={` form-select ${
                                  errors.month && touched.month
                                    ? "is-invalid"
                                    : ""
                                }`}
                                classNamePrefix="react-select"
                              />
                              <ErrorMessage
                                name="month"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>Select Week Days</label>
                              <Select
                                isMulti
                                name="months"
                                options={weekDayNames}
                                className={` form-select ${
                                  errors.month && touched.month
                                    ? "is-invalid"
                                    : ""
                                }`}
                                classNamePrefix="react-select"
                              />
                              <ErrorMessage
                                name="month"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-12 form-group mb-4">
                              <label>Terms and Condition</label>
                              <Field
                                component={HtmlEditor}
                                name="text"
                                className={`form-control ${
                                  errors.terms && touched.terms
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Terms and Conditions"
                              />
                              <ErrorMessage
                                name="terms"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-12 form-group mb-4">
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

export default DealCouponForm;
/* eslint-enable react-hooks/exhaustive-deps */
