import React, { useState } from "react";
import InputField from "../../Components/InputField/InputField";
import image from "../../Assets/img/image.png";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const AllocateProduct = () => {
   // Translation labels
  const productContentList = GetTranslationData(
    "UIAdmin",
    "productContentList"
  );
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const productName = GetTranslationData("UIAdmin", "productName");
  const id = GetTranslationData("UIAdmin", "id");
  const typeOfProduct = GetTranslationData("UIAdmin", "typeOfProduct");
  const date_label = GetTranslationData("UIAdmin", "date");
  const category_label = GetTranslationData("UIAdmin", "category");
  const display = GetTranslationData("UIAdmin", "display");
  const sortedBy = GetTranslationData("UIAdmin", "sortedBy");
  const dealUnlock = GetTranslationData("UIAdmin", "dealUnlock");
  const points = GetTranslationData("UIAdmin", "points");
  const price = GetTranslationData("UIAdmin", "price");
  const link_label = GetTranslationData("UIAdmin", "link_label");
  const image = GetTranslationData("UIAdmin", "image");
  const status_label = GetTranslationData("UIAdmin", "status");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const [searchQuery, setSearchQuery] = useState("");
  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // options for status
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Non-Active" },
  ];
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
                      <h4 className="card-title">Allocate Product</h4>
                    </div>
                    <div className="customer-search mb-sm-0 mb-3">
                      <div className="input-group search-area">
                      <InputField
                            type="text"
                            className="form-control only-high"
                            placeholder="Search here......"
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
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
                      <label for="name-f">Status </label>
                      <Dropdown
                          name="status"
                          //value={values.status}
                          //onChange={handleChange}
                          className="form-select"
                          options={statusOptions}
                        />
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
                        <option value="Second Client">Rating</option>
                      </select>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                          <th>{productName}</th>
                                <th>{typeOfProduct}</th>
                                <th>{category_label}</th>
                                <th>{dealUnlock}</th>
                                <th>{points}</th>
                                <th>{price}</th>
                                <th>{id}</th>
                                <th>{link_label}</th>
                                <th>{image}</th>
                                <th>{status_label}</th>
                                <th>{date_label}</th>
                            <th>{display}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>E-Commer</td>
                            <td>
                              Qucksilver<a href=""></a>
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
                              <img src={image} style={{ width: "50px" }} />
                              <br />
                            </td>
                            <td>
                              <span className="badge badge-danger">
                                Non-Active
                              </span>
                            </td>

                            <td>15/2/2024</td>
                            <td>
                              <div className="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div className="can-toggle">
                                <InputField id="b" type="checkbox" />
                                <label for="b">
                                  <div
                                    className="can-toggle__switch"
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
                              <img src={image} style={{ width: "50px" }} />
                              <br />
                            </td>
                            <td>
                              <span className="badge badge-danger">
                                Non-Active
                              </span>
                            </td>

                            <td>14/2/2024</td>
                            <td>
                              <div className="col-sm-12 form-group mb-2">
                                <label for="status"></label>
                                <InputField
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="pass"
                                  placeholder="01"
                                  required
                                />
                              </div>
                            </td>
                            <td>
                              <div className="can-toggle">
                                <InputField id="e" type="checkbox" />
                                <label for="e">
                                  <div
                                    className="can-toggle__switch"
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
