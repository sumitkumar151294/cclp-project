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
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const typeOfCoupoun = [
  { value: "Static", label: "Static" },
  { value: "Dynamic", label: "Dynamic" },
  { value: "NoCode", label: "No Code" },
  { value: "Membership", label: "Membership" },
];

const DealCouponForm = ({dealCouponDatas}) => {
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  // to get labels and placeholders from translation
  const deal_coupoun = GetTranslationData("UIMasterAdmin", "deal_coupoun");
  const type_of_coupoun = GetTranslationData(
    "UIMasterAdmin",
    "type_of_coupoun"
  );
  const coupoun_code = GetTranslationData("UIMasterAdmin", "coupoun_code");
  const coupoun_code_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "coupoun_code_placeholder"
  );
  const deal_label = GetTranslationData("UIMasterAdmin", "deal_label");
  const title_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "title_placeholder"
  );
  const title_label = GetTranslationData("UIMasterAdmin", "title_label");
  const select_months = GetTranslationData("UIMasterAdmin", "select_months");
  const select_week_days = GetTranslationData(
    "UIMasterAdmin",
    "select_week_days"
  );
  const terms_and_condition = GetTranslationData(
    "UIMasterAdmin",
    "select_months"
  );
  const terms_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "terms_placeholder"
  );
  const call_to_action = GetTranslationData("UIMasterAdmin", "call_to_action");
  const call_to_action_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_placeholder"
  );
  const segment_label = GetTranslationData("UIMasterAdmin", "segment_label");
  const description = GetTranslationData("UIMasterAdmin", "description");
  const description_placeholder = GetTranslationData(
    "UIMasterAdmin",
    "description_placeholder"
  );
  const submit = GetTranslationData("UIMasterAdmin", "submit");
  const update = GetTranslationData("UIMasterAdmin", "update");
  const call_to_action_required = GetTranslationData(
    "UIMasterAdmin",
    "call_to_action_required"
  );
  const upload_image_for_phone = GetTranslationData(
    "UIMasterAdmin",
    "upload_image_for_phone"
  );
  // to get data from redux store
  const dealCouponData = useSelector((state) => state.dealCouponReducer);
  const getImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const getDealData = useSelector((state) => state.dealReducer?.getDealData);
  const dealOptions = getDealData
  ?.filter(deal => deal?.enabled)
  .map(dealData => ({
    value: dealData.id,
    label: dealData.name
  }));
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non Active" },
  ];
  const uploadImage = useSelector((state) => state.uploadReducer);
  // initial state for the input fields
  const [intialValue, setInitialValue] = useState({
    coupounCode: "",
    dealId: "",
    typeOfCoupoun: "",
    image: "",
    description: "",
    terms: "",
    offerType: "",
    segmentId: "",
    cta: "",
    title: "",
    source:"",
    dealId:"",
    offerSubType:"",
  });
  const offerTypeOptions = [
    { value: "Feature", label: "Feature" },
    { value: "NetworkCardType", label: "Networkd Card Type" },
    { value: "SpecialType", label: "SpecialType" },
    { value: "Generic", label: "Generic" },
  ];
  const offerTypeValue1 = [
    { value: "Visa", label: "Visa" },
    { value: "Master Card", label: "Master Card" },
  ];
  const offerTypeValue2 = [{ value: "First Wealth", label: "First Wealth" }];
  const oferSubTypeOptions = [{ value: "EMI", label: "EMI" }];
  // to validate the form using Yup schema
  const validations = Yup.object().shape({
    months: Yup.array()
      .of(Yup.object().shape({ value: Yup.string() }))
      .min(1, "At least one month is required"),
    weekDays: Yup.array()
      .of(Yup.object().shape({ value: Yup.string() }))
      .min(1, "At least one week is required"),
    typeOfCoupoun: Yup.string().required("Coupon Type is required"),
    image: Yup.string().required("Image is required"),
    cta: Yup.string().required(call_to_action_required),
    title: Yup.string().required("Title is required"),
    offerType: Yup.string().required("Offer Type is required"),
    offerSubType: Yup.string().required("Offer Sub Type is required"),
    dealId: Yup.string().required("Deal Id is required"),
    source: Yup.string().required("Souce is required"),
    enabled: Yup.string().required("Status is required"),

  });
  // to handle form submit
  const handleSubmit = (values) => {
    if (typeof values.image === "object") {
      dispatch(onPostuploadImage(values.image));
      setValues(values);
    }else{
      const dealCouponData = {
        ...values,
        enabled:
        typeof values?.enabled === "boolean"
          ? values.enabled
          : values?.enabled === "true",
        image: dealCouponDatas?.image || "",
        clientId: 6,
        deleted: false,
        segmentId: 10,
        cta: values?.cta,
        typeOfCoupoun: values?.typeOfCoupoun,
        dealid: values?.dealId,
        title: values?.title,
        ...(dealCouponDatas && { id: values.id }),
      };
      dispatch(onPostDealCoupon(dealCouponData));
    }
  };
  const handleImageChange = (setFieldValue, event) => {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFieldValue("image", formData);
  };

  useEffect(() => {
    if (uploadImage?.post_status_code == "201") {
      const dealCouponData = {
        ...values, enabled:
        typeof values?.enabled === "boolean"
          ? values.enabled
          : values?.enabled === "true",
        image: getImage,
        clientId: 6,
        deleted: false,
        segmentId: 10,
        cta: values?.cta,
        typeOfCoupoun: values?.typeOfCoupoun,
        dealid: values?.dealId,
        title: values?.title,
        ...(dealCouponDatas && { id: values.id }),
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
      <ScrollToTop />
      <ToastContainer />
      <div className="containers-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{deal_coupoun}</h4>
              </div>
              <div className="card-body">
                {(dealCouponData.isPostLoading ||  uploadImage?.isPostLoading)? (
             <div style={{ height: "200px" }}>
             <Loader classType={"absoluteLoader"} />
           </div>
                ) : (
                  <div className="containers-fluid">
                    <Formik
                      initialValues={intialValue}
                      validationSchema={validations}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                          <div className="row">
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {title_label}
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
                                placeholder={title_placeholder}
                              />
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {type_of_coupoun}
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
                              />
                              <ErrorMessage
                                name="typeOfCoupoun"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            {values.typeOfCoupoun === "Static" && (
                              <div className="col-sm-4 form-group mb-4">
                                <label> {coupoun_code}</label>
                                <Field
                                  type="text"
                                  name="coupounCode"
                                  className={`form-control ${
                                    errors.coupounCode && touched.coupounCode
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder={coupoun_code_placeholder}
                                />
                                <ErrorMessage
                                  name="coupounCode"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                            <div className="col-sm-4 form-group mb-4">
                              <label>{"Offer Type"}</label>

                              <Field
                                name="offerType"
                                options={offerTypeOptions}
                                component={Dropdown}
                                className={`form-select ${
                                  errors.offerType && touched.offerType
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="offerType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            {(values.offerType === "SpecialType" ||
                              values.offerType === "NetworkCardType") && (
                              <div className="col-sm-4 form-group mb-4">
                                <label>{"Offer Type Value"}</label>

                                <Field
                                  name="offerTypeValue"
                                  options={
                                    values.offerType === "NetworkCardType"
                                      ? offerTypeValue1
                                      : offerTypeValue2
                                  }
                                  component={Dropdown}
                                  className={`form-select ${
                                    errors.offerTypeValue &&
                                    touched.offerTypeValue
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name="offerTypeValue"
                                  component="div"
                                  className="error-message"
                                />
                              </div>
                            )}
                                    <div className="col-sm-4 form-group mb-4">
                              <label>{"Offer Sub Type"}</label>

                              <Field
                                name="offerSubType"
                                options={oferSubTypeOptions}
                                component={Dropdown}
                                className={`form-select ${
                                  errors.offerSubType && touched.offerSubType
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="offerSubType"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4">
                              <label>{segment_label}</label>
                              {values.offerType==="Feature" && <span className="text-danger">*</span>}
                              <Field
                                name="segmentId"
                                component={Dropdown}
                                options={offerTypeValue2}
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
                              <label>{"Deal Id"}</label>
                              <span className="text-danger">*</span>

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
                            <div className="col-sm-4 form-group mb-4 ">
                              <label>
                                {"Source"}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="source"
                                className={`form-control ${
                                  errors.source && touched.source ? "is-invalid" : ""
                                }`}
                                placeholder={"Enter Source"}
                              />
                              <ErrorMessage
                                name="source"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-4 ">
                              <label>
                                {"Offer Id"}

                              </label>
                              <Field
                                type="text"
                                name="offerId"
                                className={`form-control ${
                                  errors.offerId && touched.offerId ? "is-invalid" : ""
                                }`}
                                placeholder={"Enter Offer Id"}
                              />
                              <ErrorMessage
                                name="offerId"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="col-sm-4 form-group mb-2 ">
                              <label>
                                {call_to_action}
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                type="text"
                                name="cta"
                                className={`form-control ${
                                  errors.cta && touched.cta ? "is-invalid" : ""
                                }`}
                                placeholder={call_to_action_placeholder}
                              />
                              <ErrorMessage
                                name="cta"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-4">
                              <label>
                                {"Upload Image"}
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

                            <div className="col-sm-4 form-group ">
                              <label>{description}</label>
                              <Field
                                type="text"
                                name="description"
                                className={`form-control ${
                                  errors.description && touched.description
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={description_placeholder}
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-4 form-group mb-2 ">
                              <label>{"Status"}</label>
                              <span className="text-danger">*</span>

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
                              <label>{"Terms And Conditons"}</label>
                              <Field
                                component={HtmlEditor}
                                name="terms"
                                className={`form-control ${
                                  errors.terms && touched.terms
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder={terms_placeholder}
                              />
                              <ErrorMessage
                                name="terms"
                                component="div"
                                className="error-message"
                              />
                            </div>

                            <div className="col-sm-12 form-group mb-4">
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

export default DealCouponForm;
/* eslint-enable react-hooks/exhaustive-deps */
