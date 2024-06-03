import React from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";

const CustomerSegment = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid pt-0">
                <div className="d-flex justify-content-between align-items-center  flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Customer Segment</h4>
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
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>ID </th>
                        <th>Segment Name</th>

                        <th>Current Status </th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#7899</td>
                        <td>
                          non-banner<a href=""></a>
                        </td>
                        <td>
                          <span className="badge badge-danger">Non-Active</span>
                        </td>

                        <td>15/2/2024</td>
                      </tr>
                      <tr>
                        <td>#5677</td>
                        <td>
                          Header<a href=""></a>
                        </td>
                        <td>
                          <span className="badge badge-danger">Non-Active</span>
                        </td>

                        <td>14/2/2024</td>
                      </tr>
                      <tr>
                        <td>#5678</td>
                        <td>
                          Supplier 3<a href=""></a>
                        </td>
                        <td>
                          <span className="badge badge-danger">Non-Active</span>
                        </td>

                        <td>13/2/2024</td>
                      </tr>
                      <tr>
                        <td>#4567</td>
                        <td>
                          Top Banner<a href=""></a>
                        </td>
                        <td>
                          <span className="badge badge-danger">Non-Active</span>
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
  );
};

export default CustomerSegment;
