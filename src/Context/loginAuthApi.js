import axiosInstanceClient from "../Common/Axios/axiosInstanceClient";
import API from "../Common/Endpoint/serviceConstrants";
export const loginAuthApi = async (payload) => {
    const { data = {} } = await axiosInstanceClient.post(API.loginAuth, payload);
  return data;
};
