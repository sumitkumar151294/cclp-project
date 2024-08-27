  /* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetDealCouponCode, onPostDealCouponCode, onPostDealCouponCodeReset } from "../../Store/Slices/dealCouponCodeSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
// options for type of coupon
const typeOfCoupon = [
  { value: 1, label: "Static" },
  { value: 2, label: "Dynamic" },
  { value: 3, label: "No Code" },
  { value: 4, label: "Membership" },
];
// options for status
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const DealCouponCodeForm = () => {
  const dispatch = useDispatch();
  // to get labels and placeholders from translation  
  const deal_coupon_code = GetTranslationData("UIMasterAdmin","deal_coupon_code");
  const coupon_code = GetTranslationData("UIMasterAdmin","coupon_code");
  const deal_coupon = GetTranslationData("UIMasterAdmin","deal_coupon");
  const coupon_code_placeholder = GetTranslationData("UIMasterAdmin", "coupon_code_placeholder");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const deal_coupon_required = GetTranslationData("UIMasterAdmin", "deal_coupon_required");
  const coupon_code_required = GetTranslationData("UIMasterAdmin", "coupon_code_required");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  // to get deal coupon code data from redux store
  const dealCouponCodeData=useSelector(state=>state.dealCouponCodeReducer);
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    couponCode: "",
    dealCouponId: "",
    enabled: "",

  });
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    couponCode: Yup.string().required(coupon_code_required),
    dealCouponId: Yup.string().required(deal_coupon_required),
    enabled: Yup.string().required(status_required),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      dispatch(onPostDealCouponCode(values));
    }
  };

  useEffect(() => {
    if (dealCouponCodeData?.post_status_code === "201") {
      toast.success(dealCouponCodeData?.postMessage)
      dispatch(onPostDealCouponCodeReset());
      dispatch(onGetDealCouponCode());
    } else if (dealCouponCodeData?.post_status_code) {
      toast.error(dealCouponCodeData?.postMessage)
      dispatch(onPostDealCouponCodeReset());
    }
  }, [dealCouponCodeData]);

  // useEffect(() => {
  //   if (templateTypeData) {
  //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  //     setInitialValue(templateTypeData)
  //     setButton("Update")
  //   }
  // }, [templateTypeData])
 // to handle navigation and toast notifications based on deal coupon code status
  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{"Deal Coupon Code"}</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "200px" }}>
                    <Loader />
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>{coupon_code}</label>
                              <Field
                                type="text"
                                name="couponCode"
                                className={`form-control ${
                                  errors.couponCode && touched.couponCode
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={coupon_code_placeholder}
                              />
                              <ErrorMessage
                                name="couponCode"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                               {deal_coupon}
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealCouponId"
                                component={Dropdown}
                                options={typeOfCoupon}
                                className={`form-select ${errors.dealCouponId && touched.dealCouponId
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="dealCouponId"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-4">
                              <label>
                             {status_label}
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="enabled"
                                component={Dropdown}
                                options={statusOptions}
                                className={`form-select ${errors.enabled && touched.enabled
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
                            <div className="col-sm-12 form-group mb-0 ">
                              <Button
                                text={submit}
                                end_icon="fa fa-arrow-right"
                                className="btn btn-primary  pad-aa mt-2"
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

export default DealCouponCodeForm;
/* eslint-enable react-hooks/exhaustive-deps */
