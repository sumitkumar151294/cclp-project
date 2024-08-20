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
import { onGetDealCouponFreq, onPostDealCouponFreq, onPostDealCouponFreqReset } from "../../Store/Slices/dealCouponFreqSlice";

const typeOfCoupoun = [
  { value: "Static", label: "Static" },
  { value: "Dynamic", label: "Dynamic" },
  { value: "NoCode", label: "No Code" },
  { value: "Membership", label: "Membership" },
];
// to get today's date
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const DealCouponFrequencyForm = () => {
  const todayDate = getTodayDate();
  const dispatch = useDispatch();
  // to get data from redux store
  const getDealCouponFeqData = useSelector((state) => state.dealCouponFreqReducer);
  const dealCouponData = useSelector((state) => state.dealCouponReducer);
  console.log(dealCouponData);
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    dealCoupounId: "",
    validfrom: "",
    validUpto: "",
    weekDayId: [],
    enabled:"",
  });
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    dealCoupounId: Yup.string().required("Coupon Type is required"),
    validfrom: Yup.string().required("Start dateis required"),
    validUpto: Yup.string().required("End date is required"),
    weekDayId: Yup.array().of(Yup.object().shape({ value: Yup.string() })).min(1, "At least one week is required"),
    enabled: Yup.boolean().required("Status is required")
  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (values) {
      const dealFreqData = {
        ...values,
        deleted: false,
        enabled:  values?.enabled === "true",
        clientId: 4,
        dealCoupounId:1,
        validfrom:values?.validfrom,
        validUpto:values?.validUpto,
        weekDayId:values?.weekDayId?.map((day) => day.value),
        enabled:values?.enabled
      };
      dispatch(onPostDealCouponFreq(dealFreqData));
    }
  };
  // options for status
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
  //to get weekday's name
  const weekDayNames = Array.from({ length: 7 }, (_, index) => ({
    value: index + 1,
    label: new Date(0, 0, index + 1).toLocaleString("default", { weekday: "long" }),
  }));
  // to handle navigation and toast notifications based on deal coupon status
  useEffect(() => {
    if (getDealCouponFeqData?.post_status_code === "201") {
      toast.success(getDealCouponFeqData.postMessage);
      dispatch(onPostDealCouponFreqReset());
      dispatch(onGetDealCouponFreq());
    } else if (getDealCouponFeqData?.post_status_code) {
      toast.error(getDealCouponFeqData?.postMessage);
      dispatch(onPostDealCouponFreqReset());
    }
  }, [getDealCouponFeqData]);

  return (
    <>
    <ScrollToTop/>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{"Deal Coupon Frequency"}</h4>
              </div>
              <div className="card-body">
                {getDealCouponFeqData.isLoading ? (
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
                                {"Deal Coupon"}
                                <span className="text-danger">*</span>
                              </label>

                              <Field
                                name="dealCoupounId"
                                component={Dropdown}
                                options={typeOfCoupoun}
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
                              <label>{"Valid From"}
                              <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="date"
                                name="validfrom"
                                min={todayDate}
                                className={`form-control ${errors.validfrom && touched.validfrom
                                    ? "is-invalid"
                                    : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="validfrom"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2">
                              <label>{"Valid To"}
                              <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="date"
                                name="validUpto"
                                min={todayDate}
                                className={`form-control ${errors.validUpto && touched.validUpto
                                    ? "is-invalid"
                                    : ""
                                  }`}
                              />
                              <ErrorMessage
                                name="validUpto"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>{"Select Week Days"}
                              <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                name="weekDayId"
                                options={weekDayNames}
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
                             {"Status"}
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
                            <div className="col-sm-12 form-group mb-4">
                              <Button
                                text={"Submit"}
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

export default DealCouponFrequencyForm;
/* eslint-enable react-hooks/exhaustive-deps */
