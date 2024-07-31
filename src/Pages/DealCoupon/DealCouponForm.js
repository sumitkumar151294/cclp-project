import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetDealCoupon, onPostDealCoupon, onPostDealCouponReset } from "../../Store/Slices/dealCouponSlice";
const typeOfCoupon = [
  { value: 1, label: "Static" },
  { value: 2, label: "Dynamic" },
  { value: 3, label: "No Code" },
  { value: 4, label: "Membership" },
];

const DealCouponForm = () => {
  const dispatch = useDispatch();
  // to get deal coupon data from redux store
  const dealCouponData=useSelector(state=>state.dealCouponReducer);
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    couponCode: "",
    dealId: "",
    couponType: "",
    image: "",
    description: "",
    termsConditions: "",
    startDate: "",
    endDate: "",
    segmentId: "",
  });
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    couponCode: Yup.string().required("Coupon Code is required"),
    dealId: Yup.string().required("Deal is required"),
    startDate: Yup.string().required("Start Data is required"),
    endDate: Yup.string().required("End Date is required"),
    segmentId: Yup.string().required("Segment is required"),
    couponType: Yup.string().required("Coupon Type is required"),
    image: Yup.string().required("Image Type is required"),
  });
  // to handle form submit
  const handleSubmit = (values) => { 
    if(values){
      dispatch(onPostDealCoupon(values));
    }
  };
  // to handle navigation and toast notifications based on deal coupon status
  useEffect(() => {
    if (dealCouponData?.post_status_code === "201") {
      toast.success(dealCouponData.postMessage)
      dispatch(onPostDealCouponReset());
      dispatch(onGetDealCoupon());
    } else if (dealCouponData?.post_status_code) {
      toast.error(dealCouponData?.postMessage)
      dispatch(onPostDealCouponReset());
    }
  }, [dealCouponData]);

  // useEffect(() => {
  //   if (templateTypeData) {
  //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  //     setInitialValue(templateTypeData)
  //     setButton("Update")
  //   }
  // }, [templateTypeData])
  const handleImageChange = (setFieldValue, event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Deal Coupon</h4>
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
                              <label> Coupon Code</label>
                              <Field
                                type="text"
                                name="couponCode"
                                className={`form-control ${errors.couponCode && touched.couponCode
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Coupon Code"
                              />
                              <ErrorMessage
                                name="couponCode"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Deal
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealId"
                                component={Dropdown}
                                className={`form-select ${errors.dealId && touched.dealId
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
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Type Of Coupon
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="couponType"
                                component={Dropdown}
                                options={typeOfCoupon}
                                className={`form-select ${errors.couponType && touched.couponType
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="couponType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Call To Action
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="callToAction"
                                className={`form-control ${errors.callToAction && touched.callToAction
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Call To Action"
                              />
                              <ErrorMessage
                                name="callToAction"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Upload Image
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="image"
                                className={`form-control ${errors.image && touched.image
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Title
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="title"
                                className={`form-control ${errors.title && touched.title
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Terms and Condition
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="termsConditions"
                                className={`form-control ${errors.termsConditions && touched.termsConditions
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="Enter Terms and Condition"
                              />
                              <ErrorMessage
                                name="termsConditions"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                Description
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="number"
                                name="description"
                                className={`form-control ${errors.description && touched.description
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>Start Date</label>
                              <Field
                                type="date"
                                name="startDate"
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>End Date</label>
                              <Field
                                type="date"
                                name="endDate"
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
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                Segment
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="segmentId"
                                component={Dropdown}
                                options={typeOfCoupon}
                                className={`form-select ${errors.segmentId && touched.segmentId
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

export default DealCouponForm;
/* eslint-enable react-hooks/exhaustive-deps */
