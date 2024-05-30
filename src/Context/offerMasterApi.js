import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from '../Common/Axios/axiosInstance'
export const offerMasterApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getOfferMaster);
  return data;
};
