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
import { onGetDealCoupon } from "../../Store/Slices/dealCouponSlice";
import { Link } from "react-router-dom";
// to get today date
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
// options for status
const dealCouponStatus = [
  { value: "Active", label: "Active" },
  { value: "Used" , label:"Used" },
];
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const DealCouponCodeForm = ({dealCouponCode,setDealCouponCode}) => {
  const todayDate = getTodayDate();
  const dispatch = useDispatch();
  // to get labels and placeholders from translation
  const back_label = GetTranslationData("UIMasterAdmin", "back_label");
  const deal_coupon_code = GetTranslationData("UIMasterAdmin", "deal_coupon_code");
  const coupon_code = GetTranslationData("UIMasterAdmin", "coupon_code");
  const deal_coupon = GetTranslationData("UIMasterAdmin", "deal_coupon");
  const coupon_code_placeholder = GetTranslationData("UIMasterAdmin", "coupon_code_placeholder");
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const coupon_status_required = GetTranslationData("UIMasterAdmin", "coupon_status_required");
  const deal_coupon_required = GetTranslationData("UIMasterAdmin", "deal_coupon_required");
  const coupon_code_required = GetTranslationData("UIMasterAdmin", "coupon_code_required");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const start_date_required = GetTranslationData(
    "UIMasterAdmin",
    "start_date_required"
  );
  const end_date_must_after_or_on_Start_date = GetTranslationData(
    "UIMasterAdmin",
    "end_date_must_after_or_on_Start_date"
  );
  const end_date_required = GetTranslationData(
    "UIMasterAdmin",
    "end_date_required"
  ); 
  const description = GetTranslationData("UIMasterAdmin", "description");
  const start_date_label = GetTranslationData("UIMasterAdmin", "start_date_label");
  const end_date_label = GetTranslationData("UIMasterAdmin", "end_date_label");
  const deal_coupon_status = GetTranslationData("UIMasterAdmin", "deal_coupon_status");
  const description_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "description_placeholder"
  );
  // to get deal coupon code data from redux store
  const dealCouponCodeData = useSelector(state => state.dealCouponCodeReducer);
  const getDealCoupon = useSelector((state) => state.dealCouponReducer?.getDealCouponData);
  const dealCouponsOptions = getDealCoupon?.filter(dealCouponCode=>dealCouponCode?.enabled ).map(dealCoupon => ({
    value: dealCoupon.id,
    label: dealCoupon.title
  }));
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    coupounCode: "",
    dealCoupounId: "",
    status: "",
    startDate: "",
    endDate: "",
    descriptions: "",
    enabled:""
  });
  // to fetch data on mount
  useEffect(() => {
    dispatch(onGetDealCoupon());
  }, []);
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    coupounCode: Yup.string().required(coupon_code_required),
    dealCoupounId: Yup.string().required(deal_coupon_required),
    enabled: Yup.string().required(status_required),
    status: Yup.string().required(coupon_status_required),
    startDate: Yup.string().required(start_date_required),
    endDate: Yup.string()
      .required(end_date_required)
      .test("validDate", end_date_required, function (value) {
        const { startDate } = this.parent;
        if (startDate && new Date(value) < new Date(startDate)) {
          return this.createError({
            path: "endDate",
            message: end_date_must_after_or_on_Start_date,
          });
        }
        return true;
      }),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const postData={...values,
        deleted: false,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: 6,
        coupounCode:values?.coupounCode,
        dealCoupounId:values?.dealCoupounId,
        status:values?.status,
        startDate:values?.startDate,
        endDate:values?.endDate,
        descriptions:values?.descriptions,
        ...(dealCouponCode && { id: dealCouponCode.id }),
      }
      dispatch(onPostDealCouponCode(postData));
      setInitialValue({
        coupounCode: "",
        dealCoupounId: "",
        status: "",
        startDate: "",
        endDate: "",
        descriptions: "",
        enabled:""
      });
    }
  };
   // to get formatDate
   const formatDate = (datetime) => {
    if (!datetime) return todayDate;
    return datetime.split("T")[0];
  };
 // to prefill form when we click on the edit icon
 useEffect(() => {
  if (dealCouponCode) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setInitialValue({
          coupounCode: dealCouponCode?.coupounCode,
          dealCoupounId: dealCouponCode?.dealCoupounId,
          status: dealCouponCode?.status,
          startDate: formatDate(dealCouponCode?.startDate),
          endDate: formatDate(dealCouponCode?.endDate),
          descriptions: dealCouponCode?.descriptions,
          enabled: dealCouponCode?.enabled,
        });
  }
}, [dealCouponCode]);
// to handle navigation and toast notifications based on post and update status_code
  useEffect(() => {
    if (dealCouponCodeData?.post_status_code === "201" || dealCouponCodeData?.post_status_code === "205") {
      toast.success(dealCouponCodeData?.postMessage);
      setDealCouponCode(null);
      dispatch(onPostDealCouponCodeReset());
      dispatch(onGetDealCouponCode());
    } else if (dealCouponCodeData?.post_status_code) {
      toast.error(dealCouponCodeData?.postMessage);
      dispatch(onPostDealCouponCodeReset());
    }
  }, [dealCouponCodeData]);
  return (
    <>
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{deal_coupon_code}</h4>
                <Link to="/dealCoupon">
                  <button className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> {back_label}
                  </button>
                </Link>
              </div>
              <div className="card-body">
                {dealCouponCodeData?.isPostLoading ? (
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
                      {({ errors, touched, setFieldValue,values }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-2">
                              <label>{coupon_code}</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="coupounCode"
                                className={`form-control ${errors.coupounCode && touched.coupounCode
                                    ? "is-invalid"
                                    : ""
                                  }`}
                                placeholder={coupon_code_placeholder}
                              />
                              <ErrorMessage
                                name="coupounCode"
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
                                name="dealCoupounId"
                                component={Dropdown}
                                options={dealCouponsOptions}
                                className={`form-select ${errors.dealCoupounId && touched.dealCoupounId
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="dealCoupounId"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-3">
                              <label>{start_date_label}</label>
                              <Field
                                type="date"
                                name="startDate"
                                min={todayDate}
                                className={`form-control ${
                                  errors.startDate && touched.startDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  setFieldValue("startDate", e.target.value);
                                }}
                              />
                              <ErrorMessage
                                name="startDate"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-3 ">
                              <label>{end_date_label}</label>
                              <Field
                                type="date"
                                name="endDate"
                                min={todayDate}
                                className={`form-control ${
                                  errors.endDate && touched.endDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  const endDate = e.target.value;
                                  setFieldValue("endDate", endDate);
                                  if (!values.startDate) {
                                    setFieldValue("startDate", todayDate);
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="endDate"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {deal_coupon_status}
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="status"
                                component={Dropdown}
                                options={dealCouponStatus}
                                className={`form-select ${errors.status && touched.status
                                  ? "is-invalid"
                                  : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="status"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group ">
                              <label>{description}</label>
                              <Field
                                type="text"
                                name="descriptions"
                                className={`form-control ${
                                  errors.descriptions && touched.descriptions
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={description_placeholder}
                              />
                              <ErrorMessage
                                name="descriptions"
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
                                text={dealCouponCode ?  update : submit}
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
