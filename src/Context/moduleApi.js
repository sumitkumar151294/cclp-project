import axiosInstance from '../Common/Axios/axiosInstance';
import API from "../Common/Endpoint/serviceConstrants";
export const callModuleApi = async () => {
  const { data = {} } = await axiosInstance.get(API.moduleApi);
  return data;
};
