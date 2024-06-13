import React from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";

const AddCoupon = () => {

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
    { value: "No Coupon", label: "No Coupon" }
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Coupon</h4>
            </div>

            <div className="card-body ">
              <div className="container-fluid">
                <form>
                  <div className="row">
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="status">Deal & Offer</label>
                      <Dropdown
                          name="status"
                          // value=""
                          // onChange=""
                          className="form-select"
                          options={offerOptions}
                        />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="pass"> Coupon code</label>
                      <InputField
                        type="url"
                        name="code"
                        className="form-control"
                        id="code"
                        placeholder=""
                      />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="pass">Type of coupon</label>
                      <Dropdown
                          name="status"
                          // value={}
                          // onChange={}
                          className="form-select"
                          options={couponTypeOptions}
                        />
                    </div>
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="pass">Redemation link</label>
                      <InputField
                        type="url"
                        name="link"
                        className="form-control"
                        id="pass"
                        placeholder=""
                      />
                    </div>
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="pass">Image</label>
                      <InputField
                        type="file"
                        name="link"
                        className="form-control"
                        id="pass"
                        placeholder=""
                      />
                    </div>
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="pass">Validity Date</label>
                      <InputField
                        type="date"
                        name="link"
                        className="form-control"
                        id="pass"
                        placeholder=""
                      />
                    </div>
                    <div className="row col-lg-12">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Terms and condition</label>
                        <InputField
                          type="text"
                          name="link"
                          className="dis2"
                          id="pass"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="pass">Description</label>
                        <InputField
                          type="text"
                          name="link"
                          className="dis2"
                          id="pass"
                          placeholder=""
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
  );
};

export default AddCoupon;
