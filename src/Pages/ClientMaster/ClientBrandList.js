// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
// import { CSVLink } from "react-csv";
// import { useDispatch, useSelector } from "react-redux";
// import { onGetSupplierBrandList } from "../../Store/Slices/supplierBrandListSlice";
// import NoRecord from "../../Components/NoRecord/NoRecord";
// import Dropdown from "../../Components/Dropdown/Dropdown";
// import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
// import ReactPaginate from "react-paginate";
// import InputField from "../../Components/InputField/InputField";
// import Button from "../../Components/Button/Button";
// import { ToastContainer, toast } from "react-toastify";
// import { useLocation } from "react-router-dom";
// import PageError from "../../Components/PageError/PageError";
// import {
//   onClientProductMappingSubmit,
//   onPostClientProductMappingReset,
//   onPostClientProductMappingSubmit,
//   onUpdateClientProductMappingReset,
//   onUpdateClientProductMappingSubmit,
// } from "../../Store/Slices/clientProductMappingSlice";
// import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
// import Loader from "../../Components/Loader/Loader";

// const ClientBrandList = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [selectedSupplierCode, setSelectedSupplierCode] = useState("Select");
//   const [supplierList, setSupplierList] = useState([]);
//   const [copySupplierBrandList, setCopySupplierBrandList] = useState([]);
//   const [copyClientMapping, setCopyClientMapping] = useState([]);
//   const SupplierBrandList = useSelector(
//     (state) => state.supplierBrandListReducer.data || []
//   );

//   const ClientProducts = useSelector(
//     (state) => state.clientProductMappingReducer || []
//   );

//   const suppliers = useSelector((state) => state.supplierMasterReducer);
//   const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
//   const export_label = GetTranslationData("UIAdmin", "export_label");
//   const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
//   const supplier_products = GetTranslationData("UIAdmin", "clientbrandlist");
//   const supplierName = GetTranslationData("UIAdmin", "supplierName");
//   const supplierBrandName = GetTranslationData(
//     "UIAdmin",
//     "clientbrandlistbrandname"
//   );
//   const supplierMargin = GetTranslationData("UIAdmin", "supplierMargin");
//   const clientbrandlistdiscount = GetTranslationData(
//     "UIAdmin",
//     "clientbrandlistdiscount"
//   );
//   const clientbrandlistcommission = GetTranslationData(
//     "UIAdmin",
//     "clientbrandlistcommission"
//   );
//   const status = GetTranslationData("UIAdmin", "Status_label");
//   const action = GetTranslationData("UIAdmin", "action_label");
//   const update = GetTranslationData("UIAdmin", "update_label");
//   const enabled_Text = GetTranslationData("UIAdmin", "enabled_Text");
//   const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
//   const active = GetTranslationData("UIClient", "active_option");
//   const non_active = GetTranslationData("UIClient", "non_active_option");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [rowsPerPageValue, setRowsPerPageValue] = useState("Page Size");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(onGetSupplierList());
//     dispatch(
//       onGetSupplierBrandList({
//         pageNumber: page,
//         pageSize: rowsPerPage,
//         enabled: 1,
//       })
//     );
//     dispatch(onClientProductMappingSubmit(location?.state?.id));
//   }, [page, rowsPerPage]);

//   useEffect(() => {
//     if (ClientProducts?.post_status_code === "201") {
//       toast.success(ClientProducts?.message, {
//         onClose: () => {
//           dispatch(onPostClientProductMappingReset());
//           dispatch(onClientProductMappingSubmit(location?.state?.id));
//         },
//       });
//     } else if (ClientProducts?.update_status_code === "201") {
//       toast.success(ClientProducts?.updateMessage, {
//         onClose: () => {
//           dispatch(onUpdateClientProductMappingReset());
//           dispatch(onClientProductMappingSubmit(location?.state?.id));
//         },
//       });
//     }
//   }, [
//     ClientProducts?.post_status_code,
//     ClientProducts?.update_status_code,
//     ClientProducts?.message,
//     ClientProducts?.updateMessage,
//     location?.state?.id,
//     dispatch,
//   ]);

//   const handlePageChange = (selected) => {
//     setPage(selected.selected + 1);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setPage(1);
//   };

//   const generateUniqueId = (index) => `toggleSwitch-${index}`;

//   useEffect(() => {
//     if (suppliers?.data?.length && !supplierList.length) {
//       let tempSupplier = suppliers.data
//         .filter((item) => item.enabled)
//         .map((item) => ({
//           label: item.name,
//           value: item.code,
//         }));

//       setSupplierList(tempSupplier);
//     }
//   }, [suppliers, supplierList.length]);

//   const handleChange = (e) => {
//     const filterData =
//       SupplierBrandList.length > 0
//         ? SupplierBrandList[0]?.products.filter((item) => item.enabled)
//         : [];

//     const selectedSupplierCode = e.target.value;
//     if (selectedSupplierCode === "Select") {
//       dispatch(
//         onGetSupplierBrandList({
//           pageNumber: page,
//           pageSize: rowsPerPage,
//           enabled: 1,
//         })
//       );
//     } else {
//       let filteredSupplierList =
//         Array.isArray(filterData) &&
//         filterData?.filter(
//           (vendor) =>
//             vendor?.supplierCode.toLowerCase() ===
//             selectedSupplierCode.toLowerCase()
//         );
//       setCopySupplierBrandList(filteredSupplierList);
//     }
//   };

//   const paginationValue = [
//     {
//       value: 5,
//       label: 5,
//     },
//     {
//       value: 10,
//       label: 10,
//     },
//     {
//       value: 20,
//       label: 20,
//     },
//     {
//       value: 50,
//       label: 50,
//     },
//     {
//       value: 100,
//       label: 100,
//     },
//   ];

//   useEffect(() => {
//     const filterData = SupplierBrandList?.[0]?.products?.map((item) => {
//       return item;
//     });
//     setCopySupplierBrandList(filterData);
//   }, [SupplierBrandList]);

//   useEffect(() => {
//     const copyData =
//       Array.isArray(ClientProducts.clientDataById) &&
//       ClientProducts.clientDataById.length > 0
//         ? [...ClientProducts.clientDataById[0]?.clientProductMapping]
//         : [];
//     setCopyClientMapping(copyData);
//   }, [ClientProducts?.clientDataById]);
//   const handleKeyPress = (e) => {
//     if (e.key === "e" || e.key === "+" || e.key === "-") {
//       e.preventDefault();
//     }
//   };

//   const handleInputChange = (e, ids, name) => {
//     const newValue = e.target.value < 0 ? 0 : e.target.value;
//     const mapping = [...copyClientMapping];
//     const isUpdate =
//       Array.isArray(copyClientMapping) &&
//       copyClientMapping?.find((item) => item.productId === ids);
//     if (!isUpdate) {
//       mapping.push({
//         productId: ids,
//         clientId: location?.state?.id,
//         customerDiscount: 0,
//         clientCommission: 0,
//         enabled: false,
//       });
//     }
//     const updatedClinetMapping = mapping?.map((item) => {
//       if (item.productId === ids) {
//         return { ...item, [name]: newValue };
//       } else {
//         return item;
//       }
//     });
//     setCopyClientMapping(updatedClinetMapping);
//   };

//   const handleUpdate = (data) => {
//     const isUpdate =
//       Array.isArray(copyClientMapping) &&
//       copyClientMapping?.find((item) => item.productId === data?.id);
//     if (isUpdate && isUpdate?.id) {
//       const updatedValues = {
//         clientCommission: isUpdate?.clientCommission,
//         customerDiscount: isUpdate?.customerDiscount,
//         clientId: location?.state?.id,
//         enabled: isUpdate?.enabled,
//         productId: data?.id,
//         id: isUpdate?.id,
//       };
//       dispatch(onUpdateClientProductMappingSubmit(updatedValues));
//     } else {
//       const updatedValues = {
//         clientCommission: isUpdate?.clientCommission,
//         customerDiscount: isUpdate?.customerDiscount,
//         clientId: location?.state?.id,
//         enabled: false,
//         productId: data?.id,
//       };
//       dispatch(onPostClientProductMappingSubmit(updatedValues));
//     }
//   };

//   const updateStatus = (data) => {
//     const isUpdate =
//       Array.isArray(copyClientMapping) &&
//       copyClientMapping?.find((item) => item.productId === data?.id);
//     if (isUpdate) {
//       const updatedValues = {
//         clientCommission: isUpdate?.clientCommission,
//         customerDiscount: isUpdate?.customerDiscount,
//         clientId: location?.state?.id,
//         enabled: !isUpdate?.enabled,
//         productId: data?.id,
//         id: isUpdate?.id,
//       };
//       dispatch(onUpdateClientProductMappingSubmit(updatedValues));
//     } else {
//       const updatedValues = {
//         clientCommission: 0,
//         customerDiscount: 0,
//         clientId: location?.state?.id,
//         enabled: true,
//         productId: data?.id,
//       };
//       dispatch(onPostClientProductMappingSubmit(updatedValues));
//     }
//   };

//   useEffect(() => {
//     const filterData = SupplierBrandList?.[0]?.products?.filter((item) => {
//       return item.enabled === true;
//     });
//     let filteredSupplierList =
//       Array.isArray(filterData) &&
//       SupplierBrandList?.[0]?.products?.filter(
//         (vendor) =>
//           vendor?.name.toLowerCase().includes(searchQuery?.toLowerCase()) &&
//           vendor?.enabled === true &&
//           (vendor?.supplierCode.toLowerCase() ===
//             selectedSupplierCode.toLowerCase() ||
//             selectedSupplierCode === "Select")
//       );
//     setCopySupplierBrandList(filteredSupplierList);
//   }, [searchQuery, selectedSupplierCode]);

//   const getSupplierName = (code) => {
//     const filterData =
//       Array.isArray(suppliers?.data) &&
//       suppliers?.data?.filter((item) => {
//         return item.code === code;
//       });
//     return filterData[0]?.name.length ? filterData[0]?.name : "";
//   };

//   const getValues = (id, name) => {
//     const data =
//       Array.isArray(copyClientMapping) &&
//       copyClientMapping?.find((item) => item.productId === id);
//     return data?.[name] ? data?.[name] : "";
//   };

//   const headers = [
//     { label: "Supplier Name", key: "supplierName" },
//     { label: "Supplier Brand Name", key: "supplierBrandName" },
//     { label: "Customer Discount%", key: "customerDiscount" },
//     { label: "Client Commission%", key: "clientCommission" },
//     { label: "Supplier Margin%", key: "supplierMargin" },
//     { label: "Status", key: "enabled" },
//   ];
//   let excelData = SupplierBrandList[0]?.products
//     ? SupplierBrandList[0]?.products.map((data) => ({
//         supplierName: getSupplierName(data.supplierCode),
//         supplierBrandName: data.name,
//         supplierMargin: data.supplierMargin,
//         customerDiscount: getValues(data.id, "customerDiscount"),
//         clientCommission: getValues(data.id, "clientCommission"),
//         supplierMargin: data.supplierMargin,
//         enabled: getValues(data.id, enabled_Text) ? active : non_active,
//       }))
//     : [];

//   return (
//     <>
//       <ScrollToTop />
//       {location.state ? (
//         <div>
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-xl-12 col-xxl-12">
//                 <div className="card d-flex justify-content-between ">
//                   <div className="container-fluid mt-2 mb-2 ">
//                     <div className="d-flex justify-content-between align-items-center mb-4 mt-7-supplier flex-wrap">
//                       <div className="card-header">
//                         <h4 className="card-title">{supplier_products}</h4>
//                       </div>
//                       <div className="customer-search mb-sm-0 mb-3">
//                         <div className="input-group search-area">
//                           <InputField
//                             type="text"
//                             value={searchQuery}
//                             onChange={handleSearch}
//                             className="form-control only-high"
//                             placeholder={search_here_label}
//                           />
//                           <span className="input-group-text">
//                             <i className="fa fa-search"></i>
//                           </span>
//                         </div>
//                       </div>
//                       <div className="d-flex align-items-center flex-wrap">
//                         {copySupplierBrandList &&
//                           copySupplierBrandList.length > 0 && (
//                             <CSVLink
//                               data={excelData}
//                               headers={headers}
//                               filename={"SupplierBrandList.csv"}
//                             >
//                               <Button
//                                 className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
//                                 icons={"fa fa-file-excel"}
//                                 text={export_label}
//                               />
//                             </CSVLink>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <form>
//                       <div className="row flex-column px-1">
//                         <div className="col-sm-3 form-group mb-2">
//                           <label htmlFor="name-f">{selectSuppliers}</label>
//                           <Dropdown
//                             className="form-select"
//                             aria-label="Default select example"
//                             onChange={(e) => {
//                               setSelectedSupplierCode(e.target.value);
//                               handleChange(e);
//                             }}
//                             options={supplierList}
//                           />
//                         </div>
//                       </div>
//                     </form>
//                     <div className="row px-1">
//                       {ClientProducts?.isLoading ||
//                       ClientProducts?.postClientLoading ||
//                       ClientProducts?.updateLoading ? (
//                         <div style={{ height: "200px" }}>
//                           <Loader classType={"absoluteLoader"} />
//                         </div>
//                       ) : (
//                         <div className="col-lg-12">
//                           <div>
//                             {Array.isArray(copySupplierBrandList) &&
//                             copySupplierBrandList.length > 0 ? (
//                               <div className="card-body">
//                                 <div className="table-responsive">
//                                   <table className="table header-border table-responsive-sm">
//                                     <thead>
//                                       <tr>
//                                         <th>{supplierName}</th>
//                                         <th>{supplierBrandName}</th>
//                                         <th>{clientbrandlistdiscount}</th>
//                                         <th>{clientbrandlistcommission}</th>
//                                         <th>{supplierMargin}</th>
//                                         <th>{status}</th>
//                                         <th>{action}</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {copySupplierBrandList.map(
//                                         (data, index) => (
//                                           <tr key={index}>
//                                             <td>
//                                               {getSupplierName(
//                                                 data.supplierCode
//                                               )}
//                                             </td>
//                                             <td>{data.name}</td>
//                                             <td>
//                                               <div className="input-group mb-2 w-11">
//                                                 <InputField
//                                                   type="number"
//                                                   className="form-control htt"
//                                                   placeholder={
//                                                     data.customerDiscount
//                                                   }
//                                                   pattern="/^-?\d+\.?\d*$/"
//                                                   value={getValues(
//                                                     data.id,
//                                                     "customerDiscount"
//                                                   )}
//                                                   onChange={(e) =>
//                                                     handleInputChange(
//                                                       e,
//                                                       data.id,
//                                                       "customerDiscount"
//                                                     )
//                                                   }
//                                                   onKeyPress={(e) =>
//                                                     handleKeyPress(e, index)
//                                                   }
//                                                 />
//                                                 <div className="input-group-append">
//                                                   <Button
//                                                     onClick={() =>
//                                                       handleUpdate(
//                                                         data,
//                                                         data.id
//                                                       )
//                                                     }
//                                                     className="btn btn-outline-primary btn-sm group-btn btn-pad"
//                                                     type="button"
//                                                     text={update}
//                                                   />
//                                                 </div>
//                                               </div>
//                                             </td>
//                                             <td>
//                                               <div className="input-group mb-2 w-11">
//                                                 <InputField
//                                                   type="number"
//                                                   className="form-control htt"
//                                                   placeholder={
//                                                     data.clientCommission
//                                                   }
//                                                   pattern="/^-?\d+\.?\d*$/"
//                                                   value={getValues(
//                                                     data.id,
//                                                     "clientCommission"
//                                                   )}
//                                                   onChange={(e) =>
//                                                     handleInputChange(
//                                                       e,
//                                                       data.id,
//                                                       "clientCommission"
//                                                     )
//                                                   }
//                                                   onKeyPress={(e) =>
//                                                     handleKeyPress(e, index)
//                                                   }
//                                                 />
//                                                 <div className="input-group-append">
//                                                   <Button
//                                                     onClick={() =>
//                                                       handleUpdate(
//                                                         data,
//                                                         data.id
//                                                       )
//                                                     }
//                                                     className="btn btn-outline-primary btn-sm group-btn btn-pad"
//                                                     type="button"
//                                                     text={update}
//                                                   />
//                                                 </div>
//                                               </div>
//                                             </td>
//                                             <td>{data.supplierMargin}</td>
//                                             <td>
//                                               <span
//                                                 className={
//                                                   getValues(
//                                                     data.id,
//                                                     enabled_Text
//                                                   ) === true
//                                                     ? "badge badge-success"
//                                                     : "badge badge-danger"
//                                                 }
//                                               >
//                                                 {getValues(
//                                                   data.id,
//                                                   enabled_Text
//                                                 ) === true
//                                                   ? active
//                                                   : non_active}
//                                               </span>
//                                             </td>
//                                             <td>
//                                               <div className="can-toggle">
//                                                 <input
//                                                   id={generateUniqueId(index)}
//                                                   type="checkbox"
//                                                   checked={getValues(
//                                                     data.id,
//                                                     enabled_Text
//                                                   )}
//                                                 ></input>
//                                                 <label
//                                                   htmlFor={generateUniqueId(
//                                                     index
//                                                   )}
//                                                 >
//                                                   <div
//                                                     className="can-toggle__switch"
//                                                     data-unchecked={"OFF"}
//                                                     data-checked={"ON"}
//                                                     onClick={() =>
//                                                       updateStatus(data, index)
//                                                     }
//                                                   ></div>
//                                                 </label>
//                                               </div>
//                                             </td>
//                                           </tr>
//                                         )
//                                       )}
//                                     </tbody>
//                                   </table>
//                                   {SupplierBrandList[0]?.totalCount > 5 && (
//                                     <div className="pagination-container">
//                                       <ReactPaginate
//                                         previousLabel={"<"}
//                                         nextLabel={" >"}
//                                         breakLabel={"..."}
//                                         pageCount={Math.ceil(
//                                           SupplierBrandList[0]?.totalCount /
//                                             rowsPerPage
//                                         )}
//                                         marginPagesDisplayed={2}
//                                         onPageChange={(e) =>
//                                           handlePageChange(e)
//                                         }
//                                         containerClassName={"pagination"}
//                                         activeClassName={"active"}
//                                         initialPage={
//                                           rowsPerPage !== 5
//                                             ? page === 0
//                                             : page - 1
//                                         } // Use initialPage instead of forcePage
//                                         previousClassName={
//                                           page === 0 ? disabled_Text : ""
//                                         }
//                                       />
//                                       <Dropdown
//                                         defaultSelected="Page Size"
//                                         className="paginationDropdown"
//                                         value={rowsPerPageValue || ""}
//                                         onChange={(e) => {
//                                           setRowsPerPageValue(e.target.value);
//                                           const newSize = parseInt(
//                                             e.target.value
//                                           );
//                                           if (!isNaN(newSize)) {
//                                             setRowsPerPage(e.target.value);
//                                             dispatch(
//                                               onGetSupplierBrandList({
//                                                 pageNumber: page,
//                                                 pageSize: newSize,
//                                               })
//                                             );
//                                           }
//                                         }}
//                                         options={paginationValue}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             ) : (
                           
//                                 <NoRecord />
                              
//                             )}
//                           </div>
//                           <ToastContainer />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <PageError
//           pageError={{
//             StatusCode: "401",
//             ErrorName: "Not Authorised",
//             ErrorDesription: "You are not authorised to view this page",
//             url: "/",
//             buttonText: "Back to home",
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default ClientBrandList;
// /* eslint-enable react-hooks/exhaustive-deps */
