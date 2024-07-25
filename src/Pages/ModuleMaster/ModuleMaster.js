import React from "react";
import Button from "../../Components/Button/Button";
import { ToastContainer } from "react-toastify";
import InputField from "../../Components/InputField/InputField";

const ModuleMaster = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Module Master</h4>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <form>
                    <div className="row">
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="name-f">
                          Module Name
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className="form-control"
                          name="name"
                          id="name-f"
                          // placeholder={roleName}
                          // value={values.name}
                          // onChange={handleChange}
                        />
                        {/* {errors.name && touched.name && (
                        <p className="text-danger">{errors.name}</p>
                      )} */}
                      </div>
                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="description">Module Route Path<span className="text-danger">*</span></label>
                        <InputField
                          type="text"
                          className="form-control"
                          name="routePath"
                          id="description"
                          // placeholder={description_place}
                          // value={values.description}
                          // onChange={handleChange}
                        />
                      </div>

                      <div className="col-sm-4 form-group mb-2">
                        <label htmlFor="description">Module Icon<span className="text-danger">*</span></label>
                        <InputField
                          className="form-control"
                          type="text"
                          name="image"
                          id="flexCheckDefault2"
                          //   onChange={handleSelectAll}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 mt-4 mb-4">
                      <Button
                        text="Submit"
                        icon="fa fa-arrow-right"
                        className="btn btn-primary btn-sm float-right p-btn mt-2"
                      />
                      <ToastContainer />
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

export default ModuleMaster;
