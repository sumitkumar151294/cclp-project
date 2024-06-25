import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { onAddCouponSubmit } from "../../Store/Slices/addCouponSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const AddCoupon = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  // to get coupon data from redux store
  const addCouponData = useSelector((state) => state?.addCouponReducer);
  // initial values for the input fields
  const initialValues = {
    status: "",
    couponCode: "",
    typCoupon: "",
    link: "",
    image: "",
    date: "",
    terms: "",
    description: "",
  };
  // to validate login form using Yup schema
  const validateForm = yup.object({
    status: yup.string().required("Please select any option"),
    couponCode: yup.string().required("Coupon code is required"),
    typCoupon: yup.string().required("Please select any option"),
    link: yup.string().required("Link is required"),
    image: yup.string().required("Please add one image"),
    date: yup.string().required("Date is required"),
    terms: yup.string().required("This is required"),
    description: yup.string().required("Description is required"),
  });
  // to handle form using useFormik hook
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: (values, action) => {
      setIsSubmit(true);
      dispatch(onAddCouponSubmit({ values }));
      action.resetForm();
    },
  });
  // options for Deal and Offer
  const offerOptions = [
    { value: "Offers", label: "Offers" },
    { value: "Sales", label: "Sales" },
  ];
  // options for type of coupon
  const couponTypeOptions = [
    { value: "Static Coupon", label: "Static Coupon" },
    { value: "Dynamic Coupon", label: "Dynamic Coupon" },
    { value: "Membership Coupon", label: "Membership Coupon" },
    { value: "No Coupon", label: "No Coupon" },
  ];
  //to handle toast notifications based on add coupon form status
  useEffect(() => {
    if (isSubmit && addCouponData?.status_code === "201") {
      toast.success(addCouponData?.message);
    } else if (isSubmit && addCouponData?.status_code) {
      toast.error(addCouponData?.essage);
    }
  }, [addCouponData]);
  return (
    <>
    <ScrollToTop/>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Add Coupon</h4>
              </div>

              <div className="card-body ">
                {addCouponData?.isLoading && <Loader />}
                <div className="container-fluid">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="status">Deal & Offer</label>
                        <span className="text-danger">*</span>
                        <Dropdown
                          name="status"
                          className={` ${
                            errors.status ? "border-danger" : "form-select"
                          }`}
                          value={values.status}
                          onChange={handleChange}
                          options={offerOptions}
                        />
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass"> Coupon code</label>
                        <span className="text-danger">*</span>
                        <InputField
                          className={` ${
                            errors.couponCode ? "border-danger" : "form-control"
                          }`}
                          type="text"
                          name="couponCode"
                          onChange={handleChange}
                          value={values.couponCode}
                          placeholder="Coupon Code"
                        />
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Type of coupon</label>
                        <span className="text-danger">*</span>
                        <Dropdown
                          name="typCoupon"
                          className={` ${
                            errors.typCoupon ? "border-danger" : "form-select"
                          }`}
                          value={values.typCoupon}
                          onChange={handleChange}
                          options={couponTypeOptions}
                        />
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Redemation link</label>
                        <span className="text-danger">*</span>
                        <InputField
                          type="url"
                          name="link"
                          className={` ${
                            errors.link ? "border-danger" : "form-control"
                          }`}
                          value={values.link}
                          onChange={handleChange}
                          placeholder="Redemation link"
                        />
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Image</label>
                        <span className="text-danger">*</span>
                        <InputField
                          type="file"
                          name="image"
                          className={` ${
                            errors.image ? "border-danger" : "form-control"
                          }`}
                          value={values.image}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Validity Date</label>
                        <span className="text-danger">*</span>
                        <InputField
                          type="date"
                          name="date"
                          className={` ${
                            errors.date ? "border-danger" : "form-control"
                          }`}
                          value={values.date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="row col-lg-12">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pass">Terms and condition</label>
                          <span className="text-danger">*</span>
                          <InputField
                            type="text"
                            name="terms"
                            className={` ${
                              errors.terms ? "border-danger" : "dis2"
                            }`}
                            value={values.terms}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pass">Description</label>
                          <span className="text-danger">*</span>
                          <InputField
                            type="text"
                            name="description"
                            className={` ${
                              errors.description ? "border-danger" : "dis2"
                            }`}
                            value={values.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            className="btn btn-primary float-right pad-aa"
                            text="Submit"
                            icon="fa fa-arrow-right"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
