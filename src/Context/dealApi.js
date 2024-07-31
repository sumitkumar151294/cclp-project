import axiosInstance from '../Common/Axios/axiosInstance';
import API from '../Common/Endpoint/serviceConstrants';
export const callDealGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getdeal);
  return data;
};
export const callDealPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postdeal, payload);
  return data;
};
export const callDealUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updatedeal, payload);
  return data;
};