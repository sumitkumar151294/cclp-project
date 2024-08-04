/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetDealCategory,
  onPostDealCategory,
  onPostDealCategoryReset,
} from "../../Store/Slices/dealCategorySlice";
import {
  onPostuploadImage,
  onPostuploadImageReset,
  onPostuploadMobileImage,
  onPostuploadMobileImageReset,
} from "../../Store/Slices/uploadSlice";

const SectionContentMasterForm = () => {
  const [values, setValues] = useState(null);
  const getwebImage = useSelector(
    (state) => state.uploadReducer?.postuploadImageData
  );
  const getmobImage = useSelector(
    (state) => state.uploadReducer?.postuploadMobileImageData
  );

  const uploadImage = useSelector((state) => state.uploadReducer);
  const dispatch = useDispatch();
  // to get deal category data from redux store
  const dealCategoryData = useSelector((state) => state.dealCategoryReducer);
  // initial values for the input fields
  const [intialValue, setInitialValue] = useState({
    webImage: "",
    mobImage: "",
    displayOrder: "",
    name: "",
  });
  // to validate form using Yup schema
  const validations = Yup.object().shape({
    webImage: Yup.string().required("Image is required"),
    mobImage: Yup.string().required("Image is required"),
    displayOrder: Yup.string().required("Display Order is required"),
    name: Yup.string().required("Category Name is required"),
  });
  //to handle submit
  const handleSubmit = (values) => {
    if (values) {

        dispatch(onPostuploadImage(values.webImage));
        dispatch(onPostuploadMobileImage(values.mobImage));
        setValues(values);

    }
  };
  // to handle image changes
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
  useEffect(() => {
    if (
      uploadImage?.postMobileStatusCode == "201" &&
      uploadImage?.post_status_code == "201"
    ) {
      const dealCategoryData = {
        webImage: getwebImage,
        mobImage: getmobImage,
        clientId: 4,
        deleted: false,
        name: values?.name,
        displayOrder: JSON.stringify(values?.displayOrder),
      };
      dispatch(onPostDealCategory(dealCategoryData));
    }
  }, [uploadImage, values]);
  // to handle navigation and toast notifications based on deal category status
  useEffect(() => {
    if (dealCategoryData?.post_status_code === "201") {
      toast.success(dealCategoryData.postMessage);
      dispatch(onPostuploadImageReset());
      dispatch(onPostuploadMobileImageReset());
      dispatch(onPostDealCategoryReset());
      dispatch(onGetDealCategory());
    } else if (dealCategoryData?.post_status_code) {
      toast.error(dealCategoryData.postMessage);
      dispatch(onPostDealCategoryReset());
    }
  }, [dealCategoryData]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Deal Category</h4>
              </div>
              <div className="card-body">
                       {dealCategoryData?.isPostLoading ? (
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
                              <label> Name</label>
                              <span className="text-danger">*</span>

                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Category Name"
                              />
                              <ErrorMessage
                                name="name"
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
                                className={`form-control ${
                                  errors.displayOrder && touched.displayOrder
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
                                className={`form-control ${
                                  errors.webImage && touched.webImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event, false)
                                }

                                // disabled={displayLimit}
                              />
                              <ErrorMessage
                                name="webImage"
                                component="div"
                                className="error-message"
                              />
                            </div>{" "}
                            <div className="col-sm-4 form-group mb-2 mt-2">
                              <label>
                                Upload Image For Phone
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                name="mobImage"
                                className={`form-control ${
                                  errors.mobImage && touched.mobImage
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(event) =>
                                  handleImageChange(setFieldValue, event, true)
                                }
                                // disabled={displayLimit}
                              />
                              <ErrorMessage
                                name="mobImage"
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

export default SectionContentMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
