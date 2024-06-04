import axiosInstance from "../Common/Axios/axiosInstance"; // Assuming Axios is imported here

import API from "../Common/Endpoint/serviceConstrants";

export const callLoginApi = async (payload) => {
  debugger
  const {data={}}  = await axiosInstance.post(API.login, payload);
  return data;
};