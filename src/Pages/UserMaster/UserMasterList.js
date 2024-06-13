import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetUser } from "../../Store/Slices/userMasterSlice";
import UserMasterForm from "./UserMasterForm";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";

const UserMasterList = () => {
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5);
  const dispatch = useDispatch();
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
    <div>
      <UserMasterForm />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">User List</h4>
              </div>
              {userList?.isLoading && <Loader />}
              <div className="card-body">
                {userList?.getData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>Role Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Username</th>
                          <th>Clients</th>
                          <th>Action</th>
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
    </div>
  );
};

export default UserMasterList;
