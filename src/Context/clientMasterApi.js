import axiosInstance from "../Common/Axios/axiosInstance";
import API from "../Common/Endpoint/serviceConstrants";

export const getClientMasterApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getclientMaster);
  return data;
};

export const postClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.clientMaster, payload);
  return data;
};
// export const updateClientMasterApi = async (payload) => {
//   const { data = {} } = await axiosInstance.put(API.client_master, payload);
//   return data;
// };
