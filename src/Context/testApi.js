import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from '../Common/Axios/axiosInstance'
export const testApi = async () => {
  const { data = {} } = await axiosInstance.get(API.test);
  return data;
};
