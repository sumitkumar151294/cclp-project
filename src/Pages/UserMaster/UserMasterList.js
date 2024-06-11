import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetUser } from "../../Store/Slices/userMasterSlice";
import UserMasterForm from "./UserMasterForm";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import PageError from "../../Components/PageError/PageError";

const UserMasterList = () => {
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const [prefilledValues, setPrefilledValues] = useState();
  useEffect(() => {
    dispatch(onGetUser());
  }, [dispatch]);
  const UserList = GetTranslationData("UIAdmin", "User_list_label");
  const roleName = GetTranslationData("UIAdmin", "role_name_label");
  const email = GetTranslationData("UIAdmin", "email_label");
  const mobile = GetTranslationData("UIAdmin", "mobile_label");
  const username = GetTranslationData("UIAdmin", "usernamee_label");
  const clients = GetTranslationData("UIAdmin", "clients_name_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const userList = useSelector((state) => state.userMasterReducer);
  const client = useSelector((state) => state.clientMasterReducer.clientData);
  const loading = useSelector((state) => state.userMasterReducer.isLoading);
  const roleList = useSelector((state) => state.userRoleReducer?.userRoleData);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const handleEdit = (data) => {
    const prefilled = data;
    setPrefilledValues(prefilled);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // here get role name by match with id
  const getNameById = (id) => {
    const result =
      Array.isArray(roleList) && roleList?.find((item) => item?.id === id);
    return result ? result?.name : "";
  };

  // here get client name by matching with id
  function getClientByIndex(data, client) {
    const result = [];
    if (Array.isArray(data)) {
      client.forEach((index) => {
        const numericIndex = parseInt(index, 10);
        const item = data.find((entry) => entry && entry.id === numericIndex);
        if (item) {
          result.push(item.name);
        }
      });
    }
    return result;
  }
  const filteredUserList = Array.isArray(userList?.getData)
    ? userList?.getData.filter((vendor) =>
        Object.values(vendor).some(
          (value) => value && typeof value === "string"
        )
      )
    : [];
  return (
    <div>
      {getRoleAccess[0] === undefined && (
          <div style={{ height: "100px" }}>
          <Loader classType={"absoluteLoader"} />
        </div>
      )}
      <>
      {getRoleAccess[0] !== undefined ? (
        <>
          {getRoleAccess[0]?.addAccess && (
            <UserMasterForm
              prefilledValues={prefilledValues}
              setPrefilledValues={setPrefilledValues}
            />
          )}
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">{UserList}</h4>
                  </div>
                  {loading ? (
                    <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                  ) : Array.isArray(filteredUserList) &&
                    filteredUserList?.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>{roleName}</th>
                              <th>{email}</th>
                              <th>{mobile}</th>
                              <th>{username}</th>
                              <th>{clients}</th>
                              {getRoleAccess[0]?.editAccess && (
                                <th>{action}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {userList?.getData
                              ?.slice(startIndex, endIndex)
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    {item?.adminRoleId && (
                                      <span className="badge badge-success mr-10">
                                        {getNameById(item?.adminRoleId)}
                                      </span>
                                    )}

                                    {item?.clientRoleId && (
                                      <span className="badge badge-success mr-10">
                                        {getNameById(item?.clientRoleId)}
                                      </span>
                                    )}
                                  </td>
                                  <td>{item.email}</td>
                                  <td>{item.mobile}</td>
                                  <td>{`${item.firstName}${item.lastName}`}</td>
                                  <td>
                                    {item?.accessClientIds?.length > 0 && (
                                      <div className="d-flex">
                                        {item?.accessClientIds &&
                                          item?.accessClientIds
                                            ?.split(",")
                                            .map((clientId, index) => (
                                              <span
                                                key={index}
                                                className="badge badge-secondary mr-10"
                                              >
                                                {getClientByIndex(client, [
                                                  clientId,
                                                ])}
                                              </span>
                                            ))}
                                      </div>
                                    )}
                                  </td>
                                  {getRoleAccess[0]?.editAccess && (
                                    <td>
                                      <Button
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        onClick={() => handleEdit(item)}
                                        icon={"fas fa-pencil-alt"}
                                      />
                                    </td>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {filteredUserList.length > 5 && (
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
                    </div>
                  ) : (
                    <NoRecord />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />
      )}
      </>
    </div>
  );
};

export default UserMasterList;
