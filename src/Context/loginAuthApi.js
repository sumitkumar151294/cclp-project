import axiosInstance from "../Common/Axios/axiosInstance";
import API from "../Common/Endpoint/serviceConstrants";
export const loginAuthApi = async (payload) => {
    const { data = {} } = await axiosInstance.post(API.loginAuth, payload);
  return data;
};
