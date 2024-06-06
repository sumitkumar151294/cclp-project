import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import img from "../../Assets/img/image.png";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { onGetProductContent } from "../../Store/Slices/productContentSlice";

const ProductContentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");
  const dispatch=useDispatch();
  const productContentData=useSelector((state)=>state?.productContentReducer?.data);
  // to call onGProductionContent 
  useEffect(() => {
    dispatch(onGetProductContent());
  }, []);
  // options for status
  const statusOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non-Active" },
  ];
  // options for type of product
  const productTypesOptions = [
    { value: "Gift Cards", label: "Gift Cards" },
    { value: "Earbuds", label: "Earbuds" },
    { value: "Mobile", label: "Mobile" },
  ];
  // options for category
  const categoryOptions = [
    { value: "Electronics", label: "Electronics" },
    { value: "Grocery", label: "Grocery" },
    { value: "Hotels", label: "Hotels" },
  ];
   // filter the productContentList data based on the search query
   const filteredProductData = productContentData
    ?.filter((item) => 
      (!status || item.status === (status === "true")) &&
      (!productType || item.type === productType) &&
      (!category || item.category === category) &&
      (Object.values(item).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );
    const sortedProductData = filteredProductData?.sort((a, b) => {
      if (sortOption === "Price (High to Low)") {
        return b.price - a.price;
      } else if (sortOption === "Price (Low to High)") {
        return a.price - b.price;
      }
      return 0; // default is no sorting
    });
    const handleChange = (setter) => (event) => {
      setter(event.target.value);
    };
  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // to get icon dynamically
  const iconDynamic = (img) => {
    try {
      return require(`../../Assets/img/${img}.png`);
    } catch (err) {
      console.error(`Cannot find module './${img}.png'`);
    }
  };

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
                      <label htmlFor="name-f">Status Wise</label>
                      <Dropdown
                            value={status}
                            onChange={handleChange(setStatus)}
                            className="form-select"
                            options={statusOptions}
                        />
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label htmlFor="name-f">Type of Product</label>
                      <Dropdown
                            value={productType}
                            onChange={handleChange(setProductType)}
                            className="form-select"
                            options={productTypesOptions}
                        />
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label htmlFor="name-f">Category</label>
                      <Dropdown
                            value={category}
                            onChange={handleChange(setCategory)}
                            className="form-select"
                            options={categoryOptions}
                        />
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
                      <label htmlFor="name-f">sorted by </label>
                      <select
                        value={sortOption}
                        onChange={handleChange(setSortOption)}
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
                        {sortedProductData?.map((data,index) => (
                            <tr key={index}>
                            <td>{data.productName}</td>
                            <td>
                              {data.typeOfProduct}
                            </td>
                            <td>{data.category}</td>
                            <td>{data.id}</td>
                            <td>{data.dealUnlock} </td>
                            <td>{data.Points}</td>
                            <td>{data.Price}</td>
                            <td><a href="">{data.Link}</a></td>
                            <td>
                            <img
                               style={{width:"50px"}}
                               src={iconDynamic(data.image)}
                               alt={data.image}
                             />
                              <br />
                            </td>
                            <td>
                            <span className={`badge ${data.Status ? "badge-success" : "badge-danger"}`}>
                                  {data.Status ? "Active" : "Non-Active"}
                                </span>
                            </td>
                            <td>{data.date}</td>
                          </tr>
                          ))}
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
