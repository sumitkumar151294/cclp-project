import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from '../Common/Axios/axiosInstance'
export const faqMasterApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getFaqMaster);
  return data;
};
