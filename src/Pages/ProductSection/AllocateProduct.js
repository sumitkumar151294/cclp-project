import React from "react";
import InputField from "../../Components/InputField/InputField";
import image from "../../Assets/img/image.png";

const AllocateProduct = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="container-fluid pt-0">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="container-fluid ">
                  <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div class="card-header">
                      <h4 class="card-title">Allocate Product</h4>
                    </div>
                    <div class="customer-search mb-sm-0 mb-3">
                      <div class="input-group search-area">
                      <InputField
                          type="text"
                          className="form-control only-high"
                          placeholder="Search here......"
                          value=""
                          onChange=""
                        />
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                      >
                        <i class="fa fa-file-excel me-2"></i>Export
                      </a>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div class="col-sm-2 form-group mb-2">
                      <label for="name-f">Status </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="First Client">Active</option>

                        <option value="First Client">Non-Active</option>
                      </select>
                    </div>

                    <div class="col-sm-2 form-group mb-2">
                      <label for="name-f">Category</label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Select</option>
                        <option value="First Client">electronics </option>

                        <option value="First Client">grocery</option>
                        <option value="Second Client">Hotels</option>
                      </select>
                    </div>

                    <div class="col-xl-2">
                      <div class="example">
                        <p class="mb-1">Date</p>
                        <InputField
                          type="text"
                          class="form-control input-daterange-timepicker"
                          name="daterange"
                          value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                        />
                      </div>
                    </div>

                    <div class="col-sm-2 form-group mb-2">
                      <label for="name-f">sorted by </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Relevance </option>
                        <option value="First Client">
                          Price (High to Low){" "}
                        </option>

                        <option value="First Client">
                          Price (Low to High)
                        </option>
                        <option value="Second Client">Rating</option>
                      </select>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th> Product Name</th>
                            <th> Type Of Product</th>

                            <th>Category</th>
                            <th>Deal Unlock</th>

                            <th>Points</th>
                            <th>Price</th>
                            <th>ID</th>
                            <th>Link</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Display</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>E-Commer</td>
                            <td>
                              Qucksilver<a href="javascript:void();"></a>
                            </td>
                            <td>Mobile</td>
                            <td>Amazon</td>
                            <td>60</td>
                            <td>4500</td>
                            <td>#4567</td>
                            <td>
                              {" "}
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={image}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>

                            <td>15/2/2024</td>
                            <td>
                              <div class="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="can-toggle">
                                <InputField id="b" type="checkbox" />
                                <label for="b">
                                  <div
                                    class="can-toggle__switch"
                                    data-checked="Yes"
                                    data-unchecked="No"
                                  ></div>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>E-Commerce</td>
                            <td>
                              Supplier 2<a href=""></a>
                            </td>
                            <td>Fashion</td>
                            <td>Amazon</td>
                            <td>30</td>
                            <td>8900</td>
                            <td>#6567</td>
                            <td>
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={image}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>

                            <td>14/2/2024</td>
                            <td>
                              <div class="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="can-toggle">
                                <InputField id="e" type="checkbox" />
                                <label for="e">
                                  <div
                                    class="can-toggle__switch"
                                    data-checked="Yes"
                                    data-unchecked="No"
                                  ></div>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Shopping</td>
                            <td>
                              Supplier 3<a href=""></a>
                            </td>
                            <td>groceries</td>
                            <td>Amazon</td>
                            <td>20</td>
                            <td>4500</td>
                            <td>#8767</td>
                            <td>
                              {" "}
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={image}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>

                            <td>13/2/2024</td>
                            <td>
                              <div class="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="can-toggle">
                                <InputField id="d" type="checkbox" />
                                <label for="d">
                                  <div
                                    class="can-toggle__switch"
                                    data-checked="Yes"
                                    data-unchecked="No"
                                  ></div>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Food</td>
                            <td>
                              Supplier 4<a href=""></a>
                            </td>
                            <td>electronics</td>
                            <td>Amazon</td>
                            <td>90</td>
                            <td>3400</td>
                            <td>#5675</td>
                            <td>
                              {" "}
                              <a href="index.html">Profile</a>
                            </td>
                            <td>
                              <img
                                src={image}
                                style={{width:"50px"}}
                              />
                              <br />
                            </td>
                            <td>
                              <span class="badge badge-danger">Non-Active</span>
                            </td>
                            <td>12/2/2024</td>
                            <td>
                              <div class="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div class="can-toggle">
                                <InputField id="c" type="checkbox" />
                                <label for="c">
                                  <div
                                    class="can-toggle__switch"
                                    data-checked="Yes"
                                    data-unchecked="No"
                                  ></div>
                                </label>
                              </div>
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
  );
};

export default AllocateProduct;
