import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetUser } from "../../Store/Slices/userMasterSlice";
import UserMasterForm from "./UserMasterForm";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const UserMasterList = () => {
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
  //To get the labels from API
  const UserList = GetTranslationData("UIAdmin", "User_list_label");
  const roleName = GetTranslationData("UIAdmin", "role_name_label");
  const email = GetTranslationData("UIAdmin", "email_label");
  const mobile = GetTranslationData("UIAdmin", "mobile_label");
  const username = GetTranslationData("UIAdmin", "usernamee_label");
  const clients = GetTranslationData("UIAdmin", "clients_name_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  //to get user master data from redux store
  const userList = useSelector((state) => state.userMasterReducer);
  //fetch user master data on mount
  useEffect(() => {
    dispatch(onGetUser());
  }, [dispatch]);
  // for pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  //to handle page changes
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  return (
    <>
      <ScrollToTop />
      <UserMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{UserList}</h4>
              </div>
              {userList?.isLoading && <Loader />}
              <div className="card-body">
                {userList?.getData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{roleName}</th>
                          <th>{email}</th>
                          <th>{mobile}</th>
                          <th>{username}</th>
                          <th>{clients}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userList?.getData
                          ?.slice(startIndex, endIndex)
                          .map((item, index) => (
                            <tr key={index}>
                              <td>
                                <span className="badge badge-success mr-10">
                                  {item.roleName}
                                </span>
                              </td>
                              <td>{item.email}</td>
                              <td>{item.number}</td>
                              <td>{item.name}</td>
                              <td>
                                <span className="badge badge-secondary mr-10">
                                  {item.client}
                                </span>
                              </td>
                              <td>
                                <Button
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  icon={"fas fa-pencil-alt"}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {userList?.getData?.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            userList?.getData?.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <NoRecord />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMasterList;
