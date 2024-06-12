import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { onGetProductContent } from "../../Store/Slices/productContentSlice";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";

const CommonProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState("");
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const productContentList = useSelector((state) => state?.productContentReducer);
  const productContentData = productContentList?.data;

  // fetch product content data on component mount
  useEffect(() => {
    dispatch(onGetProductContent());
  }, []);

  // options for status
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Non-Active" },
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
  // for date picker
  const onChangeHandler = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };
  
  //for date format
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();    
    //adding leading zeros if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 9 ? '0' + (month + 1) : (month + 1);  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
 // convert start date and end date as we need
  const formattedStartDate=formatDate(startDate);
  const formattedEndDate=formatDate(endDate);
  // Filter and sort the productContentList data
  const filteredProductData = productContentData?.filter((item) => {
    const matchesStatus = !status || item.Status.toString() === status;
    const matchesProductType = !productType || item.typeOfProduct === productType;
    const matchesCategory = !category || item.category === category;
    const matchesDate = !startDate || !endDate || (item.date >= formattedStartDate && item.date <= formattedEndDate);
    const matchesSearchQuery = !searchQuery || Object.values(item).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesStatus && matchesProductType && matchesCategory && matchesDate && matchesSearchQuery;
  });
 // sorting by price 
  const sortedProductData = filteredProductData?.sort((a, b) => {
    if (sortOption === "Price (High to Low)") {
      return b.Price - a.Price;
    } else if (sortOption === "Price (Low to High)") {
      return a.Price - b.Price;
    } 
    return 0; // default is no sorting
  });
  // to handle select option
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
      return "";
    }
  };
  const namesArray = sortedProductData.map((data) => ({
    productName: data.productName,
    typeOfProduct: data.typeOfProduct,
    category: data.category,
    id: data.id,
    dealUnlock: data.dealUnlock,
    Points: data.Points,
    Price: data.Price,
    Link: data.Link,
    image: data.image,
    Status: data.Status,
    date: data.date,
  }));
  
  const headers = [
    { label: "Product Name", key: "productName" },
    { label: "Type of Product", key: "typeOfProduct" },
    { label: "Category", key: "category" },
    { label: "Id", key: "id" },
    { label: "Deal Unlock", key: "dealUnlock" },
    { label: "Points", key: "Points" },
    { label: "Price", key: "Price" },
    { label: "Link", key: "Link" },
    { label: "Image", key: "image" },
    { label: "Status", key: "Status" },
    { label: "Date", key: "date" },
  ];
  // for Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // to handle page chnages
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
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
                    {productContentData && productContentData.length > 0 && (
                      <CSVLink
                        data={namesArray}
                        headers={headers}
                        filename={"ProductContent.csv"}
                      >
                        {sortedProductData.length > 0 && (
                          <Button
                            className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                            text="Export"
                            icons={"fa fa-file-excel"}
                          />
                        )}
                      </CSVLink>
                    )}
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
                         <DatePicker
                          id="dateStartEnd"
                          placeholderText="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={onChangeHandler}
                          dateFormat="dd MMM yyyy h:mm aa" // Date format including time
                          // showTimeSelect // Enable time selection
                          timeFormat="HH:mm"
                          className="form-control form-control-sm"
                          showDisabledMonthNavigation
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 form-group mb-2">
                      <label htmlFor="name-f">Sorted by</label>
                      <select
                        value={sortOption}
                        onChange={handleChange(setSortOption)}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="Relevance">Relevance</option>
                        <option value="Price (High to Low)">Price (High to Low)</option>
                        <option value="Price (Low to High)">Price (Low to High)</option>
                      </select>
                    </div>
                  </div>
                  {productContentList.isLoading ? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : Array.isArray(sortedProductData) && sortedProductData.length>0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Type Of Product</th>
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
                          {sortedProductData?.slice(startIndex, endIndex).map((data, index) => (
                            <tr key={index}>
                              <td>{data.productName}</td>
                              <td>{data.typeOfProduct}</td>
                              <td>{data.category}</td>
                              <td>{data.id}</td>
                              <td>{data.dealUnlock}</td>
                              <td>{data.Points}</td>
                              <td>{data.Price}</td>
                              <td><a href={data.Link}>{data.Link}</a></td>
                              <td>
                                <img
                                  style={{ width: "50px" }}
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
                      {sortedProductData.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                sortedProductData.length / rowsPerPage
                              )}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1} // Use initialPage instead of forcePage
                              previousClassName={
                                page === 1 ? "disabled_Text" : ""
                              }
                            />
                          </div>
                        )}
                    </div>
                  </div>
                   ):(
                    <NoRecord/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonProduct;
