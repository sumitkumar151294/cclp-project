import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Select from "react-select";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import {
  onGetDealCouponFreq,
  onPostDealCouponFreq,
  onPostDealCouponFreqReset,
  onUpdateDealCouponFreq,
  onUpdateDealCouponFreqReset,
} from "../../Store/Slices/dealCouponFreqSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onGetDealCoupon } from "../../Store/Slices/dealCouponSlice";
//to get weekday's name
const weekDayNames = Array.from({ length: 7 }, (_, index) => ({
  value: index + 1,
  label: new Date(0, 0, index + 1).toLocaleString("default", {
    weekday: "long",
  }),
}));
// to get today's date
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DealCouponFrequencyForm = ({ dealCouponFreq, setDealCouponFreq }) => {
  const todayDate = getTodayDate();
  const dispatch = useDispatch();
  // to get column heading name from translation
  const deal_coupon_frequency = GetTranslationData(
    "UIMasterAdmin",
    "deal_coupon_frequency"
  );
  const deal_coupon = GetTranslationData("UIMasterAdmin", "deal_coupon");
  const valid_from = GetTranslationData("UIMasterAdmin", "valid_from");
  const valid_to = GetTranslationData("UIMasterAdmin", "valid_to");
  const select_week_days = GetTranslationData(
    "UIMasterAdmin",
    "select_week_days"
  );
  const status_label = GetTranslationData("UIMasterAdmin", "status_label");
  const status_required = GetTranslationData(
    "UIMasterAdmin",
    "status_required"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const deal_coupon_required = GetTranslationData(
    "UIMasterAdmin",
    "deal_coupon_required"
  );
  const start_date_required = GetTranslationData(
    "UIMasterAdmin",
    "start_date_required"
  );
  const end_date_required = GetTranslationData(
    "UIMasterAdmin",
    "end_date_required"
  );
  const Valid_to_date_must_after_or_on_valid_from_date = GetTranslationData(
    "UIMasterAdmin",
    "Valid_to_date_must_after_or_on_valid_from_date"
  );
  const week_required = GetTranslationData("UIMasterAdmin", "week_required");
  // to get module data from the Redux store
  const getDealCouponFeqData = useSelector(
    (state) => state.dealCouponFreqReducer
  );
  const getDealCouponData = useSelector(
    (state) => state?.dealCouponReducer?.getDealCouponData
  );
  // initial state for the input fields
  const [initialValue, setInitialValue] = useState({
    dealCoupounId: "",
    validFrom: "",
    validUpto: "",
    weekDayId: [],
    enabled: "",
  });
  const dealCoupons = getDealCouponData
    ? getDealCouponData
        ?.filter((data) => data.title)
        .map((data) => ({
          value: data.id, // ID for API
          label: data.title, // Title for display
        }))
    : [];
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    dealCoupounId: Yup.string().required(deal_coupon_required),
    validFrom: Yup.string().required(start_date_required),
    validUpto: Yup.string()
      .required(end_date_required)
      .test("validDate", end_date_required, function (value) {
        const { validFrom } = this.parent;
        if (validFrom && new Date(value) < new Date(validFrom)) {
          return this.createError({
            path: "validUpto",
            message: Valid_to_date_must_after_or_on_valid_from_date,
          });
        }
        return true;
      }),
    weekDayId: Yup.array()
      .of(Yup.object().shape({ value: Yup.number().required() }))
      .min(1, week_required),
    enabled: Yup.string().required(status_required),
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const dealFreqData = {
        ...values,
        deleted: false,
        enabled:
          typeof values?.enabled === "boolean"
            ? values.enabled
            : values?.enabled === "true",
        clientId: 4,
        dealCoupounId: values?.dealCoupounId,
        validFrom: values?.validFrom,
        validUpto: values?.validUpto,
        weekDayId: values?.weekDayId?.map((day) => day.value),
        ...(dealCouponFreq && { id: dealCouponFreq.id }),
      };
      dispatch(onPostDealCouponFreq(dealFreqData));
      setInitialValue({
        dealCoupounId: "",
        validFrom: "",
        validUpto: "",
        weekDayId: [],
        enabled: "",
      });
    }
  };
  // options for status
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Non Active" },
  ];
  // to get formatDate
  const formatDate = (datetime) => {
    if (!datetime) return todayDate;
    return datetime.split("T")[0];
  };
  // to prefilled form when we will click on edit icon in the list
  useEffect(() => {
    if (dealCouponFreq) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });      
      const weekDays = weekDayNames.filter((day) =>
        dealCouponFreq.weekDayId.includes(day.value)
      );
      const updatedValues = {
        ...dealCouponFreq,
        validFrom: formatDate(dealCouponFreq.validFrom),
        validUpto: formatDate(dealCouponFreq.validUpto),
        weekDayId: weekDays,
      };
      setInitialValue(updatedValues);
    }
  }, [dealCouponFreq]);
  // to handle navigation and toast notifications based on post and update status_code
  useEffect(() => {
    if (getDealCouponFeqData?.post_status_code === "200" || getDealCouponFeqData?.post_status_code === "205") {
      toast.success(getDealCouponFeqData.postMessage);
      setDealCouponFreq(null);
      dispatch(onPostDealCouponFreqReset());
      dispatch(onGetDealCouponFreq());
    } else if (getDealCouponFeqData?.post_status_code) {
      toast.error(getDealCouponFeqData?.postMessage);
      dispatch(onPostDealCouponFreqReset());
    }
  }, [getDealCouponFeqData]);
  // to fetch deal coupon data on mount
  useEffect(() => {
    dispatch(onGetDealCoupon());
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{deal_coupon_frequency}</h4>
              </div>
              <div className="card-body">
                {getDealCouponFeqData.isLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader />
                  </div>
                ) : (
                  <div className="containers-fluid">
                    <Formik
                      initialValues={initialValue}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {deal_coupon}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                name="dealCoupounId"
                                component={Dropdown}
                                options={dealCoupons}
                                className={`form-select ${
                                  errors.dealCoupounId && touched.dealCoupounId
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
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {valid_from}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="date"
                                name="validFrom"
                                min={todayDate}
                                className={`form-control ${
                                  errors.validFrom && touched.validFrom
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  setFieldValue("validFrom", e.target.value);
                                }}
                              />
                              <ErrorMessage
                                name="validFrom"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>
                                {valid_to}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="date"
                                name="validUpto"
                                min={todayDate}
                                className={`form-control ${
                                  errors.validUpto && touched.validUpto
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  const validUptoDate = e.target.value;
                                  setFieldValue("validUpto", validUptoDate);
                                  if (!values.validFrom) {
                                    setFieldValue("validFrom", todayDate);
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="validUpto"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {select_week_days}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                name="weekDayId"
                                options={weekDayNames}
                                value={values.weekDayId}
                                className={`form-select ${
                                  errors.weekDayId && touched.weekDayId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                classNamePrefix="react-select"
                                onChange={(selectedOptions) =>
                                  setFieldValue("weekDayId", selectedOptions)
                                }
                              />
                              <ErrorMessage
                                name="weekDayId"
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
                            <div className="col-sm-12 form-group mb-4">
                              <Button
                                text={dealCouponFreq ? update : submit}
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

export default DealCouponFrequencyForm;
