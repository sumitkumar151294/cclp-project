import axiosInstanceClient from "../Common/Axios/axiosInstanceClient"; // Assuming Axios is imported here
import API from "../Common/Endpoint/serviceConstrants";

export const callLoginApi = async (payload) => {
  const {data={}}  = await axiosInstanceClient.post(API.login, payload);
  return data;
};