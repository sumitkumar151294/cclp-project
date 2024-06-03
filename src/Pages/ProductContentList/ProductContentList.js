import React from "react";
import InputField from "../../Components/InputField/InputField";
import img from "../../Assets/img/image.png";
import Button from "../../Components/Button/Button";

const ProductContentList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container-fluid pt-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="container-fluid ">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">Product Content List</h4>
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
                    <div className="d-flex align-items-center flex-wrap">
                    <Button
                      className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                      text="Export"
                      icons={"fa fa-file-excel"}
                    />
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="col-sm-2 form-group mb-2">
                      <label for="name-f">Status Wise</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="First Client">Active</option>
                        <option value="First Client">Non-Active</option>
                      </select>
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label for="name-f">Type of Product</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="First Client"> Gift Cards </option>
                        <option value="First Client">Earbuds</option>
                        <option value="Second Client">Mobile</option>
                      </select>
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label for="name-f">Category</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="First Client">electronics </option>
                        <option value="First Client">grocery</option>
                        <option value="Second Client">Hotels</option>
                      </select>
                    </div>
                    <div className="col-xl-2">
                      <div className="example">
                        <p className="mb-1">Date</p>
                        <InputField
                          type="text"
                          className="form-control input-daterange-timepicker"
                          name="daterange"
                          value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label for="name-f">sorted by </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Relevance </option>
                        <option value="First Client">
                          Price (High to Low){" "}
                        </option>
                        <option value="First Client">
                          Price (Low to High)
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th> Product Name</th>
                            <th> Type Of Product</th>
                            <th>Category</th>
                            <th>ID</th>
                            <th>Deal Unlock</th>
                            <th>Points</th>
                            <th>Price</th>
                            <th>Link</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Amazon</td>
                            <td>
                              Gift card<a href="javascript:void();"></a>
                            </td>
                            <td>Amazon</td>
                            <td>#5567</td>
                            <td>Yes </td>
                            <td>098</td>
                            <td>2300</td>
                            <td>
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={img}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>
                            <td>15/2/2024</td>
                          </tr>
                          <tr>
                            <td>Filpkart</td>
                            <td>
                              Ear buds<a href="javascript:void();"></a>
                            </td>
                            <td>Flipcart</td>
                            <td>#45677</td>
                            <td> NO</td>
                            <td>903</td>
                            <td>2345</td>
                            <td>
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                 src={img}
                                 style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>
                            <td>14/2/2024</td>
                          </tr>
                          <tr>
                            <td>Meesho</td>
                            <td>
                              Mobile<a href="javascript:void();"></a>
                            </td>
                            <td>Grocery</td>
                            <td>#4567</td>
                            <td>Yes </td>
                            <td>364</td>
                            <td>3400</td>
                            <td>
                              {" "}
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={img}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>
                            <td>13/2/2024</td>
                          </tr>
                          <tr>
                            <td>Snapdeal</td>
                            <td>
                              Smart watch<a href="javascript:void();"></a>
                            </td>
                            <td>Electronic</td>
                            <td>#4576</td>
                            <td>Yes</td>
                            <td>845</td>
                            <td>4589</td>
                            <td>
                              {" "}
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                 src={img}
                                 style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>
                            <td>12/2/2024</td>
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
  );
};

export default ProductContentList;
