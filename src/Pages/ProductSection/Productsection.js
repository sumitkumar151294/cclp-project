import React from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";

const ProductSection = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Product Section</h4>
            </div>

            <div className="card-body pb-0 ">
              <div className="container-fluid">
                <form>
                  <div className="row">
                    <div className="col-sm-4 form-group mb-2">
                      <label for="name-f">Section Name</label>
                      <InputField
                        type="text"
                        className="form-control"
                        name="fname"
                        id="fname"
                      />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label for="status">Status</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="Active">Active</option>
                        <option value="Non-Active">Non-Active</option>
                      </select>
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label for="pass">Date</label>
                      <InputField
                        type="date"
                        className="form-control"
                        name="date"
                      />
                    </div>

                    <div className="col-lg-3 ">
                      <br />
                      <button className="btn btn-primary float-right pad-aa">
                        Submit <i className="fa fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="container-fluid pt-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="container-fluid mt-2 pt-0">
                      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                        <div className="card-header">
                          <h4 className="card-title">Product Section List</h4>
                        </div>
                        <div className="customer-search mb-sm-0 mb-3">
                          <div className="input-group search-area">
                            <InputField
                              type="text"
                              className="form-control only-high"
                              placeholder="Search here......"
                            />
                            <span className="input-group-text">
                              <a href="">
                                <i className="flaticon-381-search-2"></i>
                              </a>
                            </span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                          <div className="col-lg-12 form-group mb-2">
                            <label for="name-f">Status </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Select</option>
                              <option value="First Client">Active</option>

                              <option value="First Client">Non-active</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table header-border table-responsive-sm">
                            <thead>
                              <tr>
                                <th>Section Name</th>

                                <th>Date</th>

                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  Bags, Wallets and Luggage
                                  <a href="javascript:void();"></a>
                                </td>

                                <td>23/3/2024</td>
                                <td>
                                  <span class="badge badge-success">
                                    Active
                                  </span>
                                </td>

                                <td>
                                  <div class="d-flex">
                                    <a
                                      href="#"
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>

                                <td>
                                  <a
                                    href="productallocation.html"
                                    className="btn btn-primary btn-sm float-right"
                                  >
                                    <i className="fa fa-eye"></i>Allocate
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Clothing & Accessories
                                  <a href="javascript:void();"></a>
                                </td>

                                <td>23/3/2024</td>

                                <td>
                                  <span className="badge badge-danger">
                                    Non-Active
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex">
                                    <a
                                      href="#"
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>

                                <td>
                                  <a
                                    href="productallocation.html"
                                    className="btn btn-primary btn-sm float-right"
                                  >
                                    <i className="fa fa-eye"></i>Allocate
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Beauty<a href="javascript:void();"></a>
                                </td>

                                <td>23/3/2024</td>

                                <td>
                                  <span className="badge badge-success">
                                    Active
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex">
                                    <a
                                      href="#"
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>

                                <td>
                                  <a
                                    href="productallocation.html"
                                    className="btn btn-primary btn-sm float-right"
                                  >
                                    <i className="fa fa-eye"></i>Allocate
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Electronics<a href="javascript:void();"></a>
                                </td>

                                <td>23/3/2024</td>

                                <td>
                                  <span className="badge badge-danger">
                                    Non-Active
                                  </span>
                                </td>

                                <td>
                                  <div className="d-flex">
                                    <a
                                      href="#"
                                      className="btn btn-primary shadow btn-xs sharp me-1"
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>

                                <td>
                                  <a
                                    href="productallocation.html"
                                    className="btn btn-primary btn-sm float-right"
                                  >
                                    <i className="fa fa-eye"></i>Allocate
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
